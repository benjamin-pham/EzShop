using System.Collections.Immutable;
using System.Security.Claims;
using EzShop.Contract.Abstractions.Messaging;

namespace EzShop.Module.Identity.Features.Connect.Authorize;

public sealed record BuildAuthorizationPrincipalQuery(string UserId, ImmutableArray<string> Scopes) : IQuery<ClaimsPrincipal?>;
