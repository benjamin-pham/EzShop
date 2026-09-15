using System.Collections.Immutable;
using System.Security.Claims;
using EzShop.Contract.Abstractions;
using EzShop.Contract.Abstractions.Messaging;

namespace EzShop.Module.Identity.Features.Connect.Token;

public sealed record ClientCredentialsGrantCommand(string ClientId, ImmutableArray<string> Scopes) : ICommand<Result<ClaimsPrincipal>>;
