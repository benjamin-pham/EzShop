using FluentValidation;

namespace EzShop.Module.Identity.Features.Connect.Token;

public sealed class ClientCredentialsGrantCommandValidator : AbstractValidator<ClientCredentialsGrantCommand>
{
    public ClientCredentialsGrantCommandValidator()
    {
        RuleFor(x => x.ClientId).NotEmpty();
    }
}
