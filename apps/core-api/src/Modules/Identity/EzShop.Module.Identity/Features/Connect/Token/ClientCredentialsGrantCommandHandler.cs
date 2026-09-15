using System.Security.Claims;
using EzShop.Contract.Abstractions;
using EzShop.Contract.Abstractions.Messaging;
using EzShop.Module.Identity.Features.Connect.Shared;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace EzShop.Module.Identity.Features.Connect.Token;

public sealed class ClientCredentialsGrantCommandHandler(IOpenIddictScopeManager scopeManager)
    : ICommandHandler<ClientCredentialsGrantCommand, Result<ClaimsPrincipal>>
{
    public async Task<Result<ClaimsPrincipal>> HandleAsync(ClientCredentialsGrantCommand command, CancellationToken cancellationToken = default)
    {
        // The client credentials have already been validated by the OpenIddict server pipeline.
        var identity = new ClaimsIdentity(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

        identity.AddClaim(Claims.Subject, command.ClientId, Destinations.AccessToken);

        var principal = new ClaimsPrincipal(identity);
        principal.SetScopes(command.Scopes);
        principal.SetResources(await ScopeResources.ListAsync(scopeManager, principal.GetScopes(), cancellationToken));

        return Result.Success(principal);
    }
}
