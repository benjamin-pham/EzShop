using System.Security.Claims;
using EzShop.Contract.Abstractions.Messaging;

namespace EzShop.Identity.Application.Features.Connect.UserInfo;

public sealed record GetUserInfoClaimsQuery(ClaimsPrincipal User) : IQuery<IReadOnlyDictionary<string, object>?>;
