using EzShop.Identity.Application;
using EzShop.Identity.Application.Common;
using EzShop.Identity.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi;
using OpenTelemetry;
using OpenTelemetry.Metrics;
using OpenTelemetry.Trace;
using Scalar.AspNetCore;
using Serilog;
using Wolverine;
using Wolverine.FluentValidation;
using JasperFx.CodeGeneration.Model;
using EzShop.Identity.WebHost;
using Wolverine.EntityFrameworkCore;
using Wolverine.Postgresql;

var builder = WebApplication.CreateBuilder(args);

// Load identity specific appsettings
builder.Configuration.AddJsonFile("appsettings.identity.json", optional: false, reloadOnChange: true);

builder.Host.UseSerilog((context, loggerConfig) =>
{
    loggerConfig.ReadFrom.Configuration(context.Configuration).Enrich.FromLogContext();
}, preserveStaticLogger: false, writeToProviders: true);

builder.Services.AddOpenApi();
builder.AddServiceDefaults();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
var mvcBuilder = builder.Services.AddControllers();
var razorBuilder = builder.Services.AddRazorPages();

// Add Infrastructure which contains our DbContext and Identity settings
builder.AddInfrastructure();

builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
});

builder.Host.UseWolverine(opts =>
{
    var connectionString = builder.Configuration.GetConnectionString("Database") 
        ?? throw new InvalidOperationException("Database connection string not found.");
        
    opts.PersistMessagesWithPostgresql(connectionString, "identity_bus");
    opts.UseEntityFrameworkCoreTransactions();

    opts.ServiceLocationPolicy = ServiceLocationPolicy.AllowedButWarn;
    
    // Discover handlers from the Application assembly
    opts.Discovery.IncludeAssembly(typeof(EzShop.Identity.Application.IntegrationEvents.CustomerRegisteredIntegrationEventHandler).Assembly);
    
    opts.UseFluentValidation();
});

builder.Services.AddOpenApi("v1", options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        document.Components ??= new OpenApiComponents();
        document.Components.SecuritySchemes ??= new Dictionary<string, IOpenApiSecurityScheme>();

        document.Components.SecuritySchemes["BearerAuth"] =
            new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                Description = "JWT Bearer authentication"
            };

        return Task.CompletedTask;
    });
});

var app = builder.Build();

app.UseMiddleware<ValidationExceptionMiddleware>();
app.UseMiddleware<LogContextTraceLoggingMiddleware>();
app.UseSerilogRequestLogging();
app.UseHttpsRedirection();
app.MapOpenApi("/api-spec/{documentName}/openapi.json");
app.MapScalarApiReference("api-docs", options =>
{
    options.WithTitle("EzShop API")
        .WithTheme(ScalarTheme.Moon)
        .ShowOperationId()
        .ExpandAllTags()
        .SortTagsAlphabetically()
        .SortOperationsByMethod()
        .PreserveSchemaPropertyOrder()
        .AddDocument("v1", "API v1", routePattern: "api-spec/{documentName}/openapi.json", isDefault: true)
        .AddDocument("v2", "API v2", routePattern: "api-spec/{documentName}/openapi.json")
        .DisableAgent()
        .AddPreferredSecuritySchemes("BearerAuth")
        .AddHttpAuthentication("BearerAuth", auth =>
        {
            auth.Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
        });
});

app.UseStaticFiles();
app.UseCors();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapRazorPages();

// Map all endpoints discovered in the assembly
var apiGroup = app.MapGroup("/api/Identity").WithTags("Identity");
var endpoints = new[] { typeof(Program).Assembly, typeof(EzShop.Identity.Application.Common.IEndpoint).Assembly }
    .SelectMany(a => a.GetTypes())
    .Where(t => typeof(IEndpoint).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
    .Select(t => (IEndpoint)ActivatorUtilities.CreateInstance(app.Services, t))
    .ToList();

foreach (var endpoint in endpoints)
{
    endpoint.MapEndpoint(apiGroup);
}

// Default endpoints
if (app.Environment.IsDevelopment())
{
    app.MapHealthChecks("/health");
    app.MapHealthChecks("/alive", new Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions
    {
        Predicate = r => r.Tags.Contains("live")
    });
}
else
{
    app.MapHealthChecks("/health");
    app.MapHealthChecks("/alive", new Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions
    {
        Predicate = r => r.Tags.Contains("live")
    });
}

app.MapGet("ping", () => "pong!");
app.MapFallback(async context =>
{
    context.Response.StatusCode = StatusCodes.Status404NotFound;
    await context.Response.WriteAsync("Resource not found");
});

app.Run();

namespace EzShop.Identity.WebHost
{
    public partial class Program { }
    
    internal static class HostingExtensions
    {
        public static IHostApplicationBuilder AddServiceDefaults(this IHostApplicationBuilder builder)
        {
            builder.ConfigureOpenTelemetry();
            builder.AddDefaultHealthChecks();
            builder.Services.AddServiceDiscovery();
            builder.Services.ConfigureHttpClientDefaults(http =>
            {
                http.AddStandardResilienceHandler();
                http.AddServiceDiscovery();
            });

            return builder;
        }

        private static IHostApplicationBuilder ConfigureOpenTelemetry(this IHostApplicationBuilder builder)
        {
            builder.Logging.AddOpenTelemetry(logging =>
            {
                logging.IncludeFormattedMessage = true;
                logging.IncludeScopes = true;
            });

            builder.Services.AddOpenTelemetry()
                .WithMetrics(metrics =>
                {
                    metrics.AddAspNetCoreInstrumentation()
                           .AddHttpClientInstrumentation()
                           .AddRuntimeInstrumentation();
                })
                .WithTracing(tracing =>
                {
                    tracing.AddAspNetCoreInstrumentation()
                           .AddHttpClientInstrumentation()
                           .AddSource("Npgsql")
                           .AddSource("Wolverine");
                });

            builder.AddOpenTelemetryExporters();

            return builder;
        }

        private static IHostApplicationBuilder AddOpenTelemetryExporters(this IHostApplicationBuilder builder)
        {
            var useOtlpExporter = !string.IsNullOrWhiteSpace(builder.Configuration["OTEL_EXPORTER_OTLP_ENDPOINT"]);

            if (useOtlpExporter)
            {
                builder.Services.AddOpenTelemetry().UseOtlpExporter();
            }

            return builder;
        }

        private static IHostApplicationBuilder AddDefaultHealthChecks(this IHostApplicationBuilder builder)
        {
            builder.Services.AddHealthChecks()
                .AddCheck("self", () => Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult.Healthy(), ["live"]);

            return builder;
        }
    }
}
