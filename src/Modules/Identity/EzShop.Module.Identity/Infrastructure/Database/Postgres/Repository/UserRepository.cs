using EzShop.Contract.Infrastructure.Database;
using EzShop.Contract.Utilities.Attributes;
using EzShop.Module.Identity.Domain.Users;

namespace EzShop.Module.Identity.Infrastructure.Database.Postgres.Repository;

[ServiceRegister(ServiceLifetime.Scoped)]
public sealed class UserRepository(IdentityDbContext dbContext)
	: EFRepository<User, IdentityDbContext>(dbContext),
	IUserRepository
{

}
