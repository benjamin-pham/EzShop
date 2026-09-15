using System.Security.Claims;
using EzShop.Contract.Abstractions;
using EzShop.Contract.Abstractions.Messaging;

namespace EzShop.Identity.Application.Features.Connect.Token;

public sealed record RefreshTokenGrantCommand(ClaimsPrincipal Principal) : ICommand<Result<ClaimsPrincipal>>;
