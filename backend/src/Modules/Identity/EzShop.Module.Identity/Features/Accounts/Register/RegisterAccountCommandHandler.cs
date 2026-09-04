using EzShop.Contract.Abstractions;
using EzShop.Contract.Abstractions.Messaging;
using EzShop.Module.Identity.Domain;
using Microsoft.AspNetCore.Identity;

namespace EzShop.Module.Identity.Features.Accounts.Register;

public sealed class RegisterAccountCommandHandler(UserManager<ApplicationUser> userManager)
    : ICommandHandler<RegisterAccountCommand, Result<RegisterAccountResult>>
{
    public async Task<Result<RegisterAccountResult>> HandleAsync(RegisterAccountCommand command, CancellationToken cancellationToken = default)
    {
        var user = new ApplicationUser
        {
            UserName = string.IsNullOrWhiteSpace(command.UserName) ? command.Email : command.UserName,
            Email = command.Email
        };

        var result = await userManager.CreateAsync(user, command.Password);
        if (!result.Succeeded)
        {
            var errors = result.Errors
                .Select(error => Error.Validation(error.Code, error.Description))
                .ToArray();

            return Result.Failure<RegisterAccountResult>(errors);
        }

        return Result.Success(new RegisterAccountResult(user.Id, user.UserName, user.Email));
    }
}
