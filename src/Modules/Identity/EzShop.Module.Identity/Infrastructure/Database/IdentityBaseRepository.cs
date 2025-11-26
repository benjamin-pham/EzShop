using EzShop.Contract.Abstractions;
using EzShop.Contract.Infrastructure.Database;

namespace EzShop.Module.Identity.Infrastructure.Database;

public abstract class IdentityBaseRepository<TEntity, TKey>
	: BaseRepository<TEntity, TKey, IdentityDbContext>
	where TEntity : Entity<TKey>
	where TKey : notnull
{
	public IdentityBaseRepository(IdentityDbContext dbContext) : base(dbContext)
	{
	}
}
public abstract class IdentityBaseRepository<TEntity>
	: BaseRepository<TEntity, IdentityDbContext>
	where TEntity : Entity
{
	public IdentityBaseRepository(IdentityDbContext dbContext) : base(dbContext)
	{
	}
}
