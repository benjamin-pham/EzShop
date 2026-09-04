using System.Security.Claims;
using EzShop.Contract.ModuleRegister;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using OpenIddict.Validation.AspNetCore;
using Wolverine;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace EzShop.Module.Identity.Features.Connect.Authorize;

/// <summary>
/// OIDC authorization endpoint (authorization code flow with PKCE).
/// Headless mode: the caller authenticates with a valid access token instead of an
/// interactive cookie session; consent is skipped for first-party clients
/// (consent type "implicit"). A consent/login UI can replace this later.
/// Routes: GET|POST /api/identity/connect/authorize
/// </summary>
public sealed class AuthorizeEndpoint : IEndpoint
{
	public void MapEndpoint(IEndpointRouteBuilder app)
	{
		// Cast to Delegate to force the minimal API overload: binding to the
		// RequestDelegate overload would discard the returned IResult.
		// bus is bound per-request from DI, not captured at endpoint construction time (which is a singleton lifetime).
		Delegate handler = async (HttpContext context, IMessageBus bus) =>
		{
			var request = context.GetOpenIddictServerRequest()
				?? throw new InvalidOperationException("The OpenID Connect request cannot be retrieved.");

			// Headless authentication: require a valid access token issued by this server.
			var authenticateResult = await context.AuthenticateAsync(
				OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);

			var userId = authenticateResult.Succeeded
				? authenticateResult.Principal?.GetClaim(Claims.Subject)
				: null;

			if (userId is null)
			{
				return Challenge();
			}

			var principal = await bus.InvokeAsync<ClaimsPrincipal?>(
				new BuildAuthorizationPrincipalQuery(userId, request.GetScopes()));

			if (principal is null)
			{
				return Challenge();
			}

			// Returning SignIn asks OpenIddict to issue an authorization code
			// and redirect the user agent to the client redirect URI.
			return Results.SignIn(principal, properties: null, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
		};

		app.MapGet("connect/authorize", handler);
		app.MapPost("connect/authorize", handler);
	}

	private static IResult Challenge() =>
		Results.Challenge(
			properties: null,
			authenticationSchemes: [OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme]);
}
