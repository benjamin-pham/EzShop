using EzShop.Contract.Abstractions;
using EzShop.Contract.ModuleRegister;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Wolverine;

namespace EzShop.Module.Identity.Features.Accounts.Register;

/// <summary>
/// Self-service account registration endpoint.
/// Route: POST /api/identity/account/register
/// </summary>
public sealed class RegisterAccountEndpoint : IEndpoint
{
	public sealed record RegisterRequest(string Email, string Password, string? UserName);

	public void MapEndpoint(IEndpointRouteBuilder app)
	{
		// bus is bound per-request from DI, not captured at endpoint construction time (which is a singleton lifetime).
		app.MapPost("account/register", async (RegisterRequest request, IMessageBus bus) =>
		{
			var result = await bus.InvokeAsync<Result<RegisterAccountResult>>(
				new RegisterAccountCommand(request.Email, request.Password, request.UserName));

			return result.ToHttpResult(value => Results.Ok(value));
		});
	}
}
