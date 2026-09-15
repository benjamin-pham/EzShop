using System.Collections.Immutable;
using System.Security.Claims;
using EzShop.Contract.Abstractions;
using EzShop.Contract.Abstractions.Messaging;

namespace EzShop.Module.Identity.Features.Connect.Token;

public sealed record PasswordGrantCommand(string Username, string Password, ImmutableArray<string> Scopes) : ICommand<Result<ClaimsPrincipal>>;
