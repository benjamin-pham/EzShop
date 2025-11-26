using EzShop.Contract.Abstractions;

namespace EzShop.Module.Identity.Domain.Permissions;

public class Permission : Entity
{
	public string Name { get; set; } = null!;
}
