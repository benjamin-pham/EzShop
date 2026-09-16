using System.Security.Claims;
using EzShop.Identity.Application.Messaging;

namespace EzShop.Identity.Application.Features.Connect.UserInfo;

public sealed record GetUserInfoClaimsQuery(ClaimsPrincipal User) : IQuery<IReadOnlyDictionary<string, object>?>;
