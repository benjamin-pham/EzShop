using EzShop.Contract.ModuleRegister;
using EzShop.Module.Catalog.Domain.Products;

namespace EzShop.Module.Catalog.Features.GetProductDetail;

public class GetProductDetailEndpoint : IEndpoint
{
	public void MapEndpoint(IEndpointRouteBuilder app)
	{
		app.MapPost("/get-product-detail",
			(ILogger<GetProductDetailEndpoint> logger, IProductRepository product123) =>
		{
			var product = new Product();
			logger.WithCaller().LogInformation("hello");
			return "product response";
		});
	}
}