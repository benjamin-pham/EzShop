using EzShop.Contract.Abstractions;

namespace EzShop.Module.Catalog.Domain.Products;

public class Product : AggregateRoot
{
	public ICollection<Category> Categories { get; set; } = [];
}
