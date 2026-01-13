using EzShop.Contract.ModuleRegister;
using EzShop.Contract.Utilities.Attributes;

namespace EzShop.Module.Catalog.Features.GetProductDetail;

public class GetProductDetailEndpoint : IEndpoint
{
	[Trace]
	public void MapEndpoint(IEndpointRouteBuilder app)
	{
		
		app.MapPost("/get-product-detail", (ILogger<GetProductDetailEndpoint> logger) =>
		{
			return "product response";
		});
	}
}