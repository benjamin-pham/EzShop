using FluentValidation;

namespace EzShop.Module.Identity.Features.Connect.Token;

public sealed class PasswordGrantCommandValidator : AbstractValidator<PasswordGrantCommand>
{
    public PasswordGrantCommandValidator()
    {
        RuleFor(x => x.Username).NotEmpty();
        RuleFor(x => x.Password).NotEmpty();
    }
}
