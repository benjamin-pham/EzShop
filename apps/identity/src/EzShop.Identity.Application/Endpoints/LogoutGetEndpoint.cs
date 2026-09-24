using EzShop.Identity.Application.Common;
using EzShop.Identity.Domain;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using OpenIddict.Server.AspNetCore;

namespace EzShop.Identity.Application.Endpoints;

public class LogoutGetEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/identity/connect").WithTags("OpenIddict");

        group.MapGet("/logout", HandleLogoutAsync);
    }

    private static async Task<IResult> HandleLogoutAsync(
        HttpContext context,
        SignInManager<ApplicationUser> signInManager)
    {
        // Ask ASP.NET Core Identity to delete the local and external cookies created
        // when the user agent is redirected from the external identity provider
        // after a successful authentication flow (e.g Google or Facebook).
        await signInManager.SignOutAsync();

        // Returning a SignOutResult will ask OpenIddict to redirect the user agent
        // to the post_logout_redirect_uri specified by the client application or to
        // the RedirectUri specified in the authentication properties if none was set.
        return Results.SignOut(
            properties: null,
            new[] { OpenIddictServerAspNetCoreDefaults.AuthenticationScheme });
    }
}

