using System.Security.Claims;
using EzShop.Contract.Abstractions;
using EzShop.Contract.ModuleRegister;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using Wolverine;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace EzShop.Module.Identity.Features.Connect.Token;

/// <summary>
/// OAuth2/OIDC token endpoint: handles password, client credentials,
/// authorization code and refresh token grants.
/// Route: POST /api/identity/connect/token
/// </summary>
public sealed class TokenEndpoint : IEndpoint
{
	public void MapEndpoint(IEndpointRouteBuilder app)
	{
		// bus is bound per-request from DI, not captured at endpoint construction time (which is a singleton lifetime).
		app.MapPost("connect/token", async (HttpContext context, IMessageBus bus) =>
		{
			var request = context.GetOpenIddictServerRequest()
				?? throw new InvalidOperationException("The OpenID Connect request cannot be retrieved.");

			if (request.IsPasswordGrantType())
			{
				if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
				{
					return InvalidGrant("The username or the password is missing.");
				}

				var outcome = await bus.InvokeAsync<Result<ClaimsPrincipal>>(
					new PasswordGrantCommand(request.Username, request.Password, request.GetScopes()));

				return ToResult(outcome, properties: null);
			}

			if (request.IsClientCredentialsGrantType())
			{
				var clientId = request.ClientId
					?? throw new InvalidOperationException("The client identifier cannot be retrieved.");

				var outcome = await bus.InvokeAsync<Result<ClaimsPrincipal>>(new ClientCredentialsGrantCommand(clientId, request.GetScopes()));

				return ToResult(outcome, properties: null);
			}

			if (request.IsAuthorizationCodeGrantType() || request.IsRefreshTokenGrantType())
			{
				// Retrieve the principal stored in the authorization code or the refresh token.
				var authenticateResult = await context.AuthenticateAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
				var principal = authenticateResult.Principal
					?? throw new InvalidOperationException("The user details cannot be retrieved.");

				var outcome = await bus.InvokeAsync<Result<ClaimsPrincipal>>(new RefreshTokenGrantCommand(principal));

				return ToResult(outcome, authenticateResult.Properties);
			}

			return InvalidGrant($"The grant type '{request.GrantType}' is not supported.");
		});
	}

	private static IResult ToResult(Result<ClaimsPrincipal> outcome, AuthenticationProperties? properties) =>
		outcome.IsSuccess
			? Results.SignIn(outcome.Value, properties, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme)
			: InvalidGrant(outcome.Error.Description, outcome.Error.Code);

	private static IResult InvalidGrant(string description, string error = Errors.InvalidGrant) =>
		Results.Forbid(
			properties: new AuthenticationProperties(new Dictionary<string, string?>
			{
				[OpenIddictServerAspNetCoreConstants.Properties.Error] = error,
				[OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] = description
			}),
			authenticationSchemes: [OpenIddictServerAspNetCoreDefaults.AuthenticationScheme]);
}
