namespace EzShop.Identity.Application.Features.Accounts.Register;

public sealed record RegisterAccountResult(Guid Id, string? UserName, string? Email);
