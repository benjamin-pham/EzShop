using EzShop.Contract.Abstractions;

namespace EzShop.Module.Identity.Domain.Roles;

public class Role : AggregateRoot
{
	public string Name { get; set; } = string.Empty;
}
