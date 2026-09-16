using EzShop.Identity.Domain.Abstractions;
using EzShop.Identity.Application.Messaging;

namespace EzShop.Identity.Application.Features.Accounts.Register;

public sealed record RegisterAccountCommand(string Email, string Password, string? UserName) : ICommand<Result<RegisterAccountResult>>;
