using FluentValidation;

namespace EzShop.Identity.Application.Features.Connect.UserInfo;

public sealed class GetUserInfoClaimsQueryValidator : AbstractValidator<GetUserInfoClaimsQuery>
{
    public GetUserInfoClaimsQueryValidator()
    {
        RuleFor(x => x.User).NotNull();
    }
}
