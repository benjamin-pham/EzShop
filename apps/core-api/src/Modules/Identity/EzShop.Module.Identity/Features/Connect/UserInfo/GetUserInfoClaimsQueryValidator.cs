using FluentValidation;

namespace EzShop.Module.Identity.Features.Connect.UserInfo;

public sealed class GetUserInfoClaimsQueryValidator : AbstractValidator<GetUserInfoClaimsQuery>
{
    public GetUserInfoClaimsQueryValidator()
    {
        RuleFor(x => x.User).NotNull();
    }
}
