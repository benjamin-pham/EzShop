using EzShop.Contract.Utilities.Attributes;
using EzShop.Module.Identity.Domain.Users;

namespace EzShop.Module.Identity.Infrastructure.Database.Repository;

[ServiceRegister(ServiceLifetime.Scoped)]
public sealed class UserRepository(IdentityDbContext dbContext) : IdentityBaseRepository<User>(dbContext), IUserRepository
{
	
}
