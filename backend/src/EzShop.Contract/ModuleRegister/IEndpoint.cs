using Microsoft.AspNetCore.Routing;

namespace EzShop.Contract.ModuleRegister;

public interface IEndpoint
{
    void MapEndpoint(IEndpointRouteBuilder app);
}
