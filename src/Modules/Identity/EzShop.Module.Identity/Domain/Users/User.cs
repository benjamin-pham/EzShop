using EzShop.Contract.Abstractions;

namespace EzShop.Module.Identity.Domain.Users;

public class User : Entity
{
	public string FirstName { get; set; } = null!;
	public string LastName { get; set; } = null!;
}
