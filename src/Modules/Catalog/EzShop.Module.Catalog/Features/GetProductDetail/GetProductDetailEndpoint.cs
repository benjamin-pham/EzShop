using EzShop.Contract.ModuleRegister;
using EzShop.Contract.Utilities;

namespace EzShop.Module.Catalog.Features.GetProductDetail;

public class GetProductDetailEndpoint : IEndpoint
{
	public void MapEndpoint(IEndpointRouteBuilder app)
	{
		app.MapPost("/get-product-detail", () =>
		{
			return "product response";
		});
	}
}