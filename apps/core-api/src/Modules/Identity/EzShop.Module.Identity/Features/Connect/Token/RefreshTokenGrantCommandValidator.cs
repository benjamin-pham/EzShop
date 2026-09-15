using FluentValidation;

namespace EzShop.Module.Identity.Features.Connect.Token;

public sealed class RefreshTokenGrantCommandValidator : AbstractValidator<RefreshTokenGrantCommand>
{
    public RefreshTokenGrantCommandValidator()
    {
        RuleFor(x => x.Principal).NotNull();
    }
}
