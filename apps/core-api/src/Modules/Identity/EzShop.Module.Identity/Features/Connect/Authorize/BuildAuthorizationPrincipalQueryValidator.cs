using FluentValidation;

namespace EzShop.Module.Identity.Features.Connect.Authorize;

public sealed class BuildAuthorizationPrincipalQueryValidator : AbstractValidator<BuildAuthorizationPrincipalQuery>
{
    public BuildAuthorizationPrincipalQueryValidator()
    {
        RuleFor(x => x.UserId).NotEmpty();
    }
}
