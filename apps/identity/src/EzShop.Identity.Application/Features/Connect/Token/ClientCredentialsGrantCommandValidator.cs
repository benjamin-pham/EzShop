using FluentValidation;

namespace EzShop.Identity.Application.Features.Connect.Token;

public sealed class ClientCredentialsGrantCommandValidator : AbstractValidator<ClientCredentialsGrantCommand>
{
    public ClientCredentialsGrantCommandValidator()
    {
        RuleFor(x => x.ClientId).NotEmpty();
    }
}
