using EzShop.Module.Identity.Domain;
using EzShop.Module.Identity.Infrastructure.Database.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace EzShop.Module.Identity.Infrastructure.Database.Services;

/// <summary>
/// Applies the identity schema and seeds OpenIddict scopes/clients plus the default
/// admin user from the "Identity" configuration section at startup.
/// </summary>
public sealed class IdentityDataSeeder(
    IServiceProvider serviceProvider,
    IConfiguration configuration,
    ILogger<IdentityDataSeeder> logger) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        var options = configuration.GetSection(IdentitySeedOptions.SectionName).Get<IdentitySeedOptions>()
            ?? new IdentitySeedOptions();

        await using var scope = serviceProvider.CreateAsyncScope();
        var provider = scope.ServiceProvider;

        var context = provider.GetRequiredService<IdentityDbContext>();
        // Dev-friendly bootstrap. Replace with context.Database.MigrateAsync()
        // once EF Core migrations are introduced for this module.
        await context.Database.EnsureCreatedAsync(cancellationToken);

        await SeedScopesAsync(provider, options, cancellationToken);
        await SeedClientsAsync(provider, options, cancellationToken);
        await SeedAdminUserAsync(provider, options);
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;

    private async Task SeedScopesAsync(
        IServiceProvider provider,
        IdentitySeedOptions options,
        CancellationToken cancellationToken)
    {
        var scopeManager = provider.GetRequiredService<IOpenIddictScopeManager>();

        foreach (var scopeSeed in options.Scopes)
        {
            if (string.IsNullOrWhiteSpace(scopeSeed.Name))
            {
                continue;
            }

            var descriptor = new OpenIddictScopeDescriptor
            {
                Name = scopeSeed.Name,
                DisplayName = scopeSeed.DisplayName
            };
            descriptor.Resources.UnionWith(scopeSeed.Resources);

            var existing = await scopeManager.FindByNameAsync(scopeSeed.Name, cancellationToken);
            if (existing is null)
            {
                await scopeManager.CreateAsync(descriptor, cancellationToken);
                logger.LogInformation("Seeded OpenIddict scope '{Scope}'.", scopeSeed.Name);
            }
            else
            {
                await scopeManager.UpdateAsync(existing, descriptor, cancellationToken);
            }
        }
    }

    private async Task SeedClientsAsync(
        IServiceProvider provider,
        IdentitySeedOptions options,
        CancellationToken cancellationToken)
    {
        var applicationManager = provider.GetRequiredService<IOpenIddictApplicationManager>();

        foreach (var client in options.Clients)
        {
            if (string.IsNullOrWhiteSpace(client.ClientId))
            {
                continue;
            }

            var descriptor = new OpenIddictApplicationDescriptor
            {
                ClientId = client.ClientId,
                DisplayName = client.DisplayName,
                ClientType = client.Type,
                ConsentType = client.ConsentType
            };

            if (string.Equals(client.Type, ClientTypes.Confidential, StringComparison.OrdinalIgnoreCase))
            {
                descriptor.ClientSecret = client.ClientSecret
                    ?? throw new InvalidOperationException(
                        $"Client '{client.ClientId}' is confidential but has no client secret configured.");
            }

            foreach (var redirectUri in client.RedirectUris)
            {
                descriptor.RedirectUris.Add(new Uri(redirectUri));
            }

            foreach (var postLogoutRedirectUri in client.PostLogoutRedirectUris)
            {
                descriptor.PostLogoutRedirectUris.Add(new Uri(postLogoutRedirectUri));
            }

            AddPermissions(descriptor, client);

            var existing = await applicationManager.FindByClientIdAsync(client.ClientId, cancellationToken);
            if (existing is null)
            {
                await applicationManager.CreateAsync(descriptor, cancellationToken);
                logger.LogInformation("Seeded OpenIddict client '{ClientId}'.", client.ClientId);
            }
            else
            {
                await applicationManager.UpdateAsync(existing, descriptor, cancellationToken);
            }
        }
    }

    private static void AddPermissions(OpenIddictApplicationDescriptor descriptor, IdentitySeedOptions.ClientSeed client)
    {
        var permissions = descriptor.Permissions;
        var grantTypes = new HashSet<string>(client.GrantTypes, StringComparer.OrdinalIgnoreCase);

        if (grantTypes.Contains(GrantTypes.AuthorizationCode))
        {
            permissions.Add(Permissions.Endpoints.Authorization);
            permissions.Add(Permissions.Endpoints.Token);
            permissions.Add(Permissions.GrantTypes.AuthorizationCode);
            permissions.Add(Permissions.ResponseTypes.Code);

            // PKCE is a client requirement, not a permission.
            descriptor.Requirements.Add(Requirements.Features.ProofKeyForCodeExchange);
        }

        if (grantTypes.Contains(GrantTypes.RefreshToken))
        {
            permissions.Add(Permissions.Endpoints.Token);
            permissions.Add(Permissions.GrantTypes.RefreshToken);
        }

        if (grantTypes.Contains(GrantTypes.Password))
        {
            permissions.Add(Permissions.Endpoints.Token);
            permissions.Add(Permissions.GrantTypes.Password);
        }

        if (grantTypes.Contains(GrantTypes.ClientCredentials))
        {
            permissions.Add(Permissions.Endpoints.Token);
            permissions.Add(Permissions.GrantTypes.ClientCredentials);
        }

        if (client.PostLogoutRedirectUris.Length > 0)
        {
            permissions.Add(Permissions.Endpoints.EndSession);
        }

        foreach (var scope in client.Scopes)
        {
            permissions.Add(Permissions.Prefixes.Scope + scope);
        }
    }

    private async Task SeedAdminUserAsync(
        IServiceProvider provider,
        IdentitySeedOptions options)
    {
        var userManager = provider.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = provider.GetRequiredService<RoleManager<ApplicationRole>>();

        foreach (var role in options.AdminUser.Roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new ApplicationRole { Name = role });
            }
        }

        if (await userManager.FindByEmailAsync(options.AdminUser.Email) is not null)
        {
            return;
        }

        var user = new ApplicationUser
        {
            UserName = options.AdminUser.UserName,
            Email = options.AdminUser.Email,
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(user, options.AdminUser.Password);
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new InvalidOperationException($"Unable to seed the admin user: {errors}");
        }

        if (options.AdminUser.Roles.Length > 0)
        {
            await userManager.AddToRolesAsync(user, options.AdminUser.Roles);
        }

        logger.LogInformation("Seeded the default admin user '{Email}'.", options.AdminUser.Email);
    }
}
