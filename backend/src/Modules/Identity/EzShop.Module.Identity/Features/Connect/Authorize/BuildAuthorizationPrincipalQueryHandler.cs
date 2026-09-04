using System.Security.Claims;
using EzShop.Contract.Abstractions.Messaging;
using EzShop.Module.Identity.Domain;
using EzShop.Module.Identity.Features.Connect.Shared;
using Microsoft.AspNetCore.Identity;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace EzShop.Module.Identity.Features.Connect.Authorize;

public sealed class BuildAuthorizationPrincipalQueryHandler(
    UserManager<ApplicationUser> userManager,
    IOpenIddictScopeManager scopeManager) : IQueryHandler<BuildAuthorizationPrincipalQuery, ClaimsPrincipal?>
{
    public async Task<ClaimsPrincipal?> HandleAsync(BuildAuthorizationPrincipalQuery query, CancellationToken cancellationToken = default)
    {
        var user = await userManager.FindByIdAsync(query.UserId);
        if (user is null)
        {
            return null;
        }

        var identity = new ClaimsIdentity(
            OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
            Claims.Name,
            Claims.Role);

        identity.AddClaim(Claims.Subject, user.Id.ToString());
        identity.AddClaim(Claims.Name, user.UserName ?? string.Empty);

        if (!string.IsNullOrEmpty(user.Email))
        {
            identity.AddClaim(Claims.Email, user.Email);
        }

        foreach (var role in await userManager.GetRolesAsync(user))
        {
            identity.AddClaim(Claims.Role, role);
        }

        var principal = new ClaimsPrincipal(identity);
        principal.SetScopes(query.Scopes);
        principal.SetResources(await ScopeResources.ListAsync(scopeManager, principal.GetScopes(), cancellationToken));

        foreach (var claim in principal.Claims)
        {
            claim.SetDestinations(ClaimsDestinations.For(claim));
        }

        return principal;
    }
}
