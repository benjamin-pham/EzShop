using System.Security.Claims;
using EzShop.Contract.Abstractions;
using EzShop.Contract.Abstractions.Messaging;
using EzShop.Module.Identity.Domain;
using EzShop.Module.Identity.Features.Connect.Shared;
using Microsoft.AspNetCore.Identity;
using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace EzShop.Module.Identity.Features.Connect.Token;

public sealed class RefreshTokenGrantCommandHandler(UserManager<ApplicationUser> userManager)
	: ICommandHandler<RefreshTokenGrantCommand, Result<ClaimsPrincipal>>
{
	public async Task<Result<ClaimsPrincipal>> HandleAsync(RefreshTokenGrantCommand command, CancellationToken cancellationToken = default)
	{
		// Ensure the user account still exists before issuing new tokens.
		var userId = command.Principal.GetClaim(Claims.Subject);
		if (userId is null || await userManager.FindByIdAsync(userId) is null)
		{
			return Result.Failure<ClaimsPrincipal>(Error.Unauthorized(Errors.InvalidGrant, "The token is no longer valid because the user account does not exist anymore."));
		}

		foreach (var claim in command.Principal.Claims)
		{
			claim.SetDestinations(ClaimsDestinations.For(claim));
		}

		return Result.Success(command.Principal);
	}
}
