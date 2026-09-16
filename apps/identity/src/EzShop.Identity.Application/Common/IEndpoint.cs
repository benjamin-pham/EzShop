using Microsoft.AspNetCore.Routing;

namespace EzShop.Identity.Application.Common;

public interface IEndpoint
{
    void MapEndpoint(IEndpointRouteBuilder app);
}
