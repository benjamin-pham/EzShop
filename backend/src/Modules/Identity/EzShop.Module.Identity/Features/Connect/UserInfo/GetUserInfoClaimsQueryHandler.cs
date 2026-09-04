using EzShop.Contract.Abstractions.Messaging;
using EzShop.Module.Identity.Domain;
using Microsoft.AspNetCore.Identity;
using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace EzShop.Module.Identity.Features.Connect.UserInfo;

public sealed class GetUserInfoClaimsQueryHandler(UserManager<ApplicationUser> userManager)
    : IQueryHandler<GetUserInfoClaimsQuery, IReadOnlyDictionary<string, object>?>
{
    public async Task<IReadOnlyDictionary<string, object>?> HandleAsync(GetUserInfoClaimsQuery query, CancellationToken cancellationToken = default)
    {
        var user = await userManager.GetUserAsync(query.User);
        if (user is null)
        {
            return null;
        }

        var claims = new Dictionary<string, object>(StringComparer.Ordinal)
        {
            [Claims.Subject] = user.Id.ToString()
        };

        if (query.User.HasScope(Scopes.Profile))
        {
            claims[Claims.Name] = user.UserName ?? string.Empty;
            claims[Claims.PreferredUsername] = user.UserName ?? string.Empty;
        }

        if (query.User.HasScope(Scopes.Email) && !string.IsNullOrEmpty(user.Email))
        {
            claims[Claims.Email] = user.Email;
            claims[Claims.EmailVerified] = user.EmailConfirmed;
        }

        if (query.User.HasScope(Scopes.Roles))
        {
            claims[Claims.Role] = await userManager.GetRolesAsync(user);
        }

        return claims;
    }
}
