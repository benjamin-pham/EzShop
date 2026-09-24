using EzShop.Identity.Application.Common;
using EzShop.Identity.Domain;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using OpenIddict.Validation.AspNetCore;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace EzShop.Identity.Application.Endpoints;

public class UserInfoGetEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/identity/connect").WithTags("OpenIddict");

        group.MapGet("/userinfo", HandleUserInfoAsync).RequireAuthorization(OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);
    }

    private static async Task<IResult> HandleUserInfoAsync(
        HttpContext context,
        UserManager<ApplicationUser> userManager)
    {
        var user = await userManager.FindByIdAsync(context.User.GetClaim(Claims.Subject)!);
        if (user == null)
        {
            return Results.Challenge(
                new AuthenticationProperties(new Dictionary<string, string?>
                {
                    [OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.InvalidToken,
                    [OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] =
                        "The specified access token is bound to an account that no longer exists."
                }),
                new[] { OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme });
        }

        var claims = new Dictionary<string, object>
        {
            // Note: the "sub" claim is a mandatory claim and must be included in the JSON response.
            [Claims.Subject] = await userManager.GetUserIdAsync(user)
        };

        if (context.User.HasScope(Scopes.Email))
        {
            var email = await userManager.GetEmailAsync(user);
            if (email != null)
            {
                claims[Claims.Email] = email;
                claims[Claims.EmailVerified] = await userManager.IsEmailConfirmedAsync(user);
            }
        }

        if (context.User.HasScope(Scopes.Phone))
        {
            var phone = await userManager.GetPhoneNumberAsync(user);
            if (phone != null)
            {
                claims[Claims.PhoneNumber] = phone;
                claims[Claims.PhoneNumberVerified] = await userManager.IsPhoneNumberConfirmedAsync(user);
            }
        }

        if (context.User.HasScope(Scopes.Roles))
        {
            claims[Claims.Role] = await userManager.GetRolesAsync(user);
        }

        // Note: the complete list of standard claims supported by the OpenID Connect specification
        // can be found here: http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims

        return Results.Ok(claims);
    }
}

