using FluentValidation;

namespace EzShop.Identity.Application.Features.Connect.Token;

public sealed class RefreshTokenGrantCommandValidator : AbstractValidator<RefreshTokenGrantCommand>
{
    public RefreshTokenGrantCommandValidator()
    {
        RuleFor(x => x.Principal).NotNull();
    }
}
