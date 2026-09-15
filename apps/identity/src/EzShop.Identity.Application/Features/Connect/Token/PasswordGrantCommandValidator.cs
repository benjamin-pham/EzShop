using FluentValidation;

namespace EzShop.Identity.Application.Features.Connect.Token;

public sealed class PasswordGrantCommandValidator : AbstractValidator<PasswordGrantCommand>
{
    public PasswordGrantCommandValidator()
    {
        RuleFor(x => x.Username).NotEmpty();
        RuleFor(x => x.Password).NotEmpty();
    }
}
