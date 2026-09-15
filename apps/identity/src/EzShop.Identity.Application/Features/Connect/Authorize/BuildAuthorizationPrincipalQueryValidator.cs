using FluentValidation;

namespace EzShop.Identity.Application.Features.Connect.Authorize;

public sealed class BuildAuthorizationPrincipalQueryValidator : AbstractValidator<BuildAuthorizationPrincipalQuery>
{
    public BuildAuthorizationPrincipalQueryValidator()
    {
        RuleFor(x => x.UserId).NotEmpty();
    }
}
