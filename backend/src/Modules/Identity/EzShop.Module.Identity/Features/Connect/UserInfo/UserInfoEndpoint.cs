using EzShop.Contract.ModuleRegister;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using OpenIddict.Server.AspNetCore;
using Wolverine;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace EzShop.Module.Identity.Features.Connect.UserInfo;

/// <summary>
/// OIDC userinfo endpoint: returns claims about the authenticated user.
/// Requires a valid access token containing the "openid" scope.
/// Routes: GET|POST /api/identity/connect/userinfo
/// </summary>
public sealed class UserInfoEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        // Cast to Delegate to force the minimal API overload: binding to the
        // RequestDelegate overload would discard the returned IResult.
        // bus is bound per-request from DI, not captured at endpoint construction time (which is a singleton lifetime).
        Delegate handler = async (HttpContext context, IMessageBus bus) =>
        {
            var claims = await bus.InvokeAsync<IReadOnlyDictionary<string, object>?>(new GetUserInfoClaimsQuery(context.User));
            if (claims is null)
            {
                return Results.Forbid(
                    properties: new AuthenticationProperties(new Dictionary<string, string?>
                    {
                        [OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.InvalidToken,
                        [OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] =
                            "The specified access token is bound to an account that no longer exists."
                    }),
                    authenticationSchemes: [OpenIddictServerAspNetCoreDefaults.AuthenticationScheme]);
            }

            return Results.Ok(claims);
        };

        app.MapGet("connect/userinfo", handler).RequireAuthorization();
        app.MapPost("connect/userinfo", handler).RequireAuthorization();
    }
}
