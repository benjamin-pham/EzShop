using EzShop.Identity.Application.Common;
using EzShop.Identity.Domain;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;

namespace EzShop.Identity.Application.Endpoints;

public class AuthorizePostEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/identity/connect").WithTags("OpenIddict");

        group.MapPost("/authorize", HandleAuthorizeAsync);
    }

    private static async Task<IResult> HandleAuthorizeAsync(
        HttpContext context,
        SignInManager<ApplicationUser> signInManager)
    {
        var request = context.GetOpenIddictServerRequest() ??
            throw new InvalidOperationException("The OpenID Connect request cannot be retrieved.");

        // Retrieve the user principal stored in the authentication cookie.
        var result = await context.AuthenticateAsync(IdentityConstants.ApplicationScheme);

        // If the user principal can't be extracted, redirect the user to the login page.
        if (!result.Succeeded)
        {
            return Results.Challenge(
                new AuthenticationProperties
                {
                    RedirectUri = context.Request.PathBase + context.Request.Path + QueryString.Create(
                        context.Request.HasFormContentType ? context.Request.Form.ToList() : context.Request.Query.ToList())
                },
                new[] { IdentityConstants.ApplicationScheme });
        }

        // Auto-grant for first party application.
        // Create a new ClaimsPrincipal
        var user = await signInManager.UserManager.GetUserAsync(result.Principal);
        if (user == null)
        {
            return Results.Challenge(
                new AuthenticationProperties
                {
                    RedirectUri = context.Request.PathBase + context.Request.Path + QueryString.Create(
                        context.Request.HasFormContentType ? context.Request.Form.ToList() : context.Request.Query.ToList())
                },
                new[] { IdentityConstants.ApplicationScheme });
        }

        var principal = await signInManager.CreateUserPrincipalAsync(user);

        // Note: in this sample, the granted scopes match the requested scope
        // but you may want to allow the user to uncheck specific scopes.
        principal.SetScopes(request.GetScopes());
        principal.SetResources(await OpenIddictHelpers.GetResourcesAsync(request.GetScopes()));

        foreach (var claim in principal.Claims)
        {
            claim.SetDestinations(OpenIddictHelpers.GetDestinations(claim, principal));
        }

        return Results.SignIn(principal, properties: null, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
    }
}

