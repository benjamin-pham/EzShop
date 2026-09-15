using System.Security.Claims;
using EzShop.Contract.Abstractions;
using EzShop.Contract.Abstractions.Messaging;

namespace EzShop.Module.Identity.Features.Connect.Token;

public sealed record RefreshTokenGrantCommand(ClaimsPrincipal Principal) : ICommand<Result<ClaimsPrincipal>>;
