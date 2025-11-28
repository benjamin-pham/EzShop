using EzShop.Contract.ModuleRegister;

namespace EzShop.Module.Catalog.Endpoints;

public class GetProductDetailEndpoint : IEndpoint
{
	public void MapEndpoint(IEndpointRouteBuilder app)
	{
		app.MapPost("/get-product-detail", (ILogger<GetProductDetailEndpoint> logger) =>
		{
			logger.WithCaller().LogInformation("hello");
			return "product response";
		});
	}
}