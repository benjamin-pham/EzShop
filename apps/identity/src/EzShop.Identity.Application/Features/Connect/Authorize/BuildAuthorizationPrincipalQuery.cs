using System.Collections.Immutable;
using System.Security.Claims;
using EzShop.Identity.Application.Messaging;

namespace EzShop.Identity.Application.Features.Connect.Authorize;

public sealed record BuildAuthorizationPrincipalQuery(string UserId, ImmutableArray<string> Scopes) : IQuery<ClaimsPrincipal?>;
