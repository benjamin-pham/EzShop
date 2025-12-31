using EzShop.Contract.Abstractions;

namespace EzShop.Module.Identity.Domain.Permissions;

public class Permission : AggregateRoot
{
	public string Name { get; set; } = null!;
}
