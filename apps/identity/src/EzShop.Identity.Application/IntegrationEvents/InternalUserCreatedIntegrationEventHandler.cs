using EzShop.Identity.Domain;
using EzShop.Identity.Domain.Abstractions;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace EzShop.Identity.Application.IntegrationEvents;

public sealed class InternalUserCreatedIntegrationEventHandler(
    UserManager<ApplicationUser> userManager,
    RoleManager<ApplicationRole> roleManager,
    ILogger<InternalUserCreatedIntegrationEventHandler> logger)
{
    public async Task Handle(InternalUserCreatedIntegrationEvent message, CancellationToken cancellationToken)
    {
        var existingUser = await userManager.FindByEmailAsync(message.Email);
        if (existingUser is not null)
        {
            logger.LogWarning("Internal user with email {Email} already exists. Ignoring message.", message.Email);
            return;
        }

        var user = new ApplicationUser
        {
            UserName = string.IsNullOrWhiteSpace(message.UserName) ? message.Email : message.UserName,
            Email = message.Email,
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(user, message.Password);
        
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            logger.LogError("Failed to create internal user {Email}: {Errors}", message.Email, errors);
            return; // Depending on requirements, we might want to throw an exception so Wolverine moves it to dead-letter queue
        }

        if (message.Roles is not null && message.Roles.Length > 0)
        {
            foreach (var role in message.Roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new ApplicationRole { Name = role });
                }
            }
            
            await userManager.AddToRolesAsync(user, message.Roles);
        }

        logger.LogInformation("Successfully created internal user {Email}", message.Email);
    }
}

