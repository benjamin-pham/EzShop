using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Scalar.AspNetCore;
using Serilog;
using System.Reflection;
using System.Runtime.Loader;
using Microsoft.OpenApi;
using Wolverine;
using Wolverine.FluentValidation;
using JasperFx.CodeGeneration.Model;

namespace EzShop.Contract.ModuleRegister;

public static class ModuleLoader
{
	public static void AddHostConfigureServices(this WebApplicationBuilder builder)
	{
		builder.Host.UseSerilog((context, loggerConfig) =>
		{
			loggerConfig.ReadFrom.Configuration(context.Configuration).Enrich.FromLogContext();
		});

		builder.Services.AddOpenApi();
		builder.Services.AddHealthChecks();

		var moduleManager = FindModules();

		builder.Services.AddSingleton(moduleManager);

		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddCors();
		builder.Services.AddAuthentication();
		builder.Services.AddAuthorization();
		var mvcBuilder = builder.Services.AddControllers();
		var razorBuilder = builder.Services.AddRazorPages();

		foreach (var module in moduleManager.AppModules)
		{
			mvcBuilder.AddApplicationPart(module.Assembly);
			razorBuilder.AddApplicationPart(module.Assembly);
		}
		builder.Services.Configure<RouteOptions>(options =>
		{
			options.LowercaseUrls = true;
		});

		builder.AddModuleServices(moduleManager);

		builder.Host.UseWolverine(opts =>
		{
			// pure in-process mediator usage: no queues, no persistence, MediatR-like request/handler dispatch only.
			opts.Durability.Mode = DurabilityMode.MediatorOnly;
			opts.ServiceLocationPolicy = ServiceLocationPolicy.AllowedButWarn;
			foreach (var module in moduleManager.AppModules)
			{
				opts.Discovery.IncludeAssembly(module.Assembly);
			}

			// discovers IValidator<T> per module assembly and runs it as "before" middleware for any command/query with a matching validator.
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
	}

	public static void UseHostConfigure(this WebApplication app)
	{
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
		app.MapModuleEndpoints();
		app.MapGet("ping", () => "pong!");
		app.MapFallback(async context =>
		{
			context.Response.StatusCode = StatusCodes.Status404NotFound;
			await context.Response.WriteAsync("Resource not found");
		});
	}

	private static void AddModuleServices(this WebApplicationBuilder builder, ModuleManager moduleManager)
	{
		ConfigureModuleServices(builder, moduleManager);
	}

	private static void MapModuleEndpoints(this WebApplication app)
	{
		var moduleManager = app.Services.GetRequiredService<ModuleManager>();
		foreach (var module in moduleManager.AppModules)
		{
			var url = $"/api";
			if (!string.IsNullOrEmpty(module.Instance.Name))
			{
				url += $"/{module.Instance.Name}";
			}
			var group = app.MapGroup(url).WithTags(module.Instance.Name);

			var endpoints = module.AssemblyTypes
				.Where(t => typeof(IEndpoint).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
				.Select(t => (IEndpoint)ActivatorUtilities.CreateInstance(app.Services, t))
				.ToList();

			foreach (var endpointType in endpoints)
			{
				endpointType.MapEndpoint(group);
			}
		}
	}

	private static List<Assembly> LoadAssemblies()
	{
		var assemblies = new List<Assembly>(AppDomain.CurrentDomain.GetAssemblies());

		foreach (var dll in Directory.EnumerateFiles(AppContext.BaseDirectory, "*.dll"))
		{
			try
			{
				var asm = AssemblyLoadContext.Default.LoadFromAssemblyPath(Path.GetFullPath(dll));
				assemblies.Add(asm);
			}
			catch { /* ignore load errors */ }
		}

		return [.. assemblies.Distinct()];
	}

	private static ModuleManager FindModules()
	{
		var assemblies = LoadAssemblies();

		var modules = assemblies
			.SelectMany(a =>
			{
				try { return a.GetTypes(); }
				catch { return []; }
			})
			.Where(t => typeof(IModule).IsAssignableFrom(t) && !t.IsAbstract && !t.IsInterface)
			.Select(t =>
			{
				var instance = (IModule)Activator.CreateInstance(t)!;
				return new ModuleManager.AppModule(t.Assembly, instance);
			})
			.ToList();

		return new(modules);
	}

	private static void ConfigureModuleServices(WebApplicationBuilder builder, ModuleManager moduleManager)
	{
		foreach (var module in moduleManager.AppModules)
		{
			var modulePath = Path.GetDirectoryName(module.Assembly.Location)!;

			foreach (var moduleSettingFile in module.Instance.ModuleSettingFiles)
			{
				var jsonPath = Path.Combine(modulePath, moduleSettingFile);
				builder.Configuration.AddJsonFile(jsonPath, optional: false, reloadOnChange: true);
			}

			module.Instance.ConfigureServices(builder);
		}
	}
}
