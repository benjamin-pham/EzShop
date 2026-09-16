using System.Collections.Immutable;
using System.Security.Claims;
using EzShop.Identity.Domain.Abstractions;
using EzShop.Identity.Application.Messaging;

namespace EzShop.Identity.Application.Features.Connect.Token;

public sealed record PasswordGrantCommand(string Username, string Password, ImmutableArray<string> Scopes) : ICommand<Result<ClaimsPrincipal>>;
