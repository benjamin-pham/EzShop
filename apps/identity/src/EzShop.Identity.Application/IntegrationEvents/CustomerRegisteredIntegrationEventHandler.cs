using EzShop.Identity.Domain;
using EzShop.Identity.Domain.Abstractions;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace EzShop.Identity.Application.IntegrationEvents;

public sealed class CustomerRegisteredIntegrationEventHandler(
    UserManager<ApplicationUser> userManager,
    RoleManager<ApplicationRole> roleManager,
    ILogger<CustomerRegisteredIntegrationEventHandler> logger)
{
    private const string CustomerRole = "Customer";

    public async Task Handle(CustomerRegisteredIntegrationEvent message, CancellationToken cancellationToken)
    {
        var existingUser = await userManager.FindByEmailAsync(message.Email);
        if (existingUser is not null)
        {
            logger.LogWarning("Customer user with email {Email} already exists. Ignoring message.", message.Email);
            return;
        }

        var user = new ApplicationUser
        {
            UserName = string.IsNullOrWhiteSpace(message.UserName) ? message.Email : message.UserName,
            Email = message.Email,
            EmailConfirmed = false
        };

        var result = await userManager.CreateAsync(user, message.Password);
        
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            logger.LogError("Failed to create customer user {Email}: {Errors}", message.Email, errors);
            return;
        }

        if (!await roleManager.RoleExistsAsync(CustomerRole))
        {
            await roleManager.CreateAsync(new ApplicationRole { Name = CustomerRole });
        }
        
        await userManager.AddToRoleAsync(user, CustomerRole);
        logger.LogInformation("Successfully created customer user {Email}", message.Email);
    }
}

