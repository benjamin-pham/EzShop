using System.Security.Claims;
using EzShop.Identity.Domain.Abstractions;
using EzShop.Identity.Application.Messaging;
using EzShop.Identity.Domain;
using EzShop.Identity.Application.Features.Connect.Shared;
using Microsoft.AspNetCore.Identity;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace EzShop.Identity.Application.Features.Connect.Token;

public sealed class PasswordGrantCommandHandler(
    UserManager<ApplicationUser> userManager,
    SignInManager<ApplicationUser> signInManager,
    IOpenIddictScopeManager scopeManager) : ICommandHandler<PasswordGrantCommand, Result<ClaimsPrincipal>>
{
    public async Task<Result<ClaimsPrincipal>> HandleAsync(PasswordGrantCommand command, CancellationToken cancellationToken = default)
    {
        var user = await userManager.FindByNameAsync(command.Username)
            ?? await userManager.FindByEmailAsync(command.Username);

        if (user is null)
        {
            return Result.Failure<ClaimsPrincipal>(Error.Unauthorized(Errors.InvalidGrant, "The username or the password is invalid."));
        }

        var result = await signInManager.CheckPasswordSignInAsync(user, command.Password, lockoutOnFailure: true);
        if (!result.Succeeded)
        {
            return Result.Failure<ClaimsPrincipal>(Error.Unauthorized(Errors.InvalidGrant, "The username or the password is invalid."));
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
        principal.SetScopes(command.Scopes);
        principal.SetResources(await ScopeResources.ListAsync(scopeManager, principal.GetScopes(), cancellationToken));

        foreach (var claim in principal.Claims)
        {
            claim.SetDestinations(ClaimsDestinations.For(claim));
        }

        return Result.Success(principal);
    }
}
