using EzShop.Contract.Abstractions;

namespace EzShop.Module.Catalog.Domain.Products;

public class Product : Entity
{
	public ICollection<Category> Categories { get; set; } = new List<Category>();
}
