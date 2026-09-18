namespace EzShop.Identity.Application.IntegrationEvents;

public sealed record CustomerRegisteredIntegrationEvent(string Email, string Password, string? UserName);

public sealed record InternalUserCreatedIntegrationEvent(string Email, string Password, string? UserName, string[] Roles);

