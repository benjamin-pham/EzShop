using EzShop.Contract.ModuleRegister;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using OpenIddict.Server.AspNetCore;

namespace EzShop.Module.Identity.Features.Connect.Logout;

/// <summary>
/// OIDC end session endpoint: signs the user out and redirects the user agent
/// to the post_logout_redirect_uri registered by the client.
/// Route: POST /api/identity/connect/logout
/// </summary>
public sealed class LogoutEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("connect/logout", () =>
            Results.SignOut(
                properties: null,
                authenticationSchemes: [OpenIddictServerAspNetCoreDefaults.AuthenticationScheme]));
    }
}
