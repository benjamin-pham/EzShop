using EzShop.Contract.Abstractions;
using EzShop.Contract.Abstractions.Messaging;

namespace EzShop.Identity.Application.Features.Accounts.Register;

public sealed record RegisterAccountCommand(string Email, string Password, string? UserName) : ICommand<Result<RegisterAccountResult>>;
