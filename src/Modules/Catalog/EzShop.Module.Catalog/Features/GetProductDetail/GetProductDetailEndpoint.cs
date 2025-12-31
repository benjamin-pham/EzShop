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

			Name = "changed name";
			var x = Name;

			Display(1, 2, [3, 4, new XYZ()]);
			return "product response";
		});
	}

	[Trace]
	public object Display(int a, int b, object[] x)
	{
		throw new Exception("ok");
		//return x;
	}

	public class XYZ
	{
		public string Name { get; set; } = "ok 123";
	}
}