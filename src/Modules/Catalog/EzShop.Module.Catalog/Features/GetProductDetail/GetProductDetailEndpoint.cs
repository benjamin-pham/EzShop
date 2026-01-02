using EzShop.Contract.ModuleRegister;
using EzShop.Contract.Utilities;

namespace EzShop.Module.Catalog.Features.GetProductDetail;

public class GetProductDetailEndpoint : IEndpoint
{
	private string _name = "GetProductDetailEndpoint123124213";
	public string Name {  get => _name; [Trace] set { _name = value; } }
	public void MapEndpoint(IEndpointRouteBuilder app)
	{
		app.MapPost("/get-product-detail", () =>
		{
			return "product response";
		});
	}
}