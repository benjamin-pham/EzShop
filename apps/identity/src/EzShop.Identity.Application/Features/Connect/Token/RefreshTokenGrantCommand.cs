using System.Security.Claims;
using EzShop.Identity.Domain.Abstractions;
using EzShop.Identity.Application.Messaging;

namespace EzShop.Identity.Application.Features.Connect.Token;

public sealed record RefreshTokenGrantCommand(ClaimsPrincipal Principal) : ICommand<Result<ClaimsPrincipal>>;
