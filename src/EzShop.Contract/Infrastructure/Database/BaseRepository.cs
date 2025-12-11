using EzShop.Contract.Abstractions;
using EzShop.Contract.Abstractions.Data;
using Microsoft.EntityFrameworkCore;

namespace EzShop.Contract.Infrastructure.Database;

public abstract class BaseRepository<TEntity, TKey, TDbContext>
	: IRepository<TEntity, TKey>
	where TEntity : Entity<TKey>
	where TDbContext : DbContext where TKey : notnull
{
	protected readonly TDbContext _dbContext;
	protected readonly DbSet<TEntity> _dbSet;

	public BaseRepository(TDbContext dbContext)
	{
		_dbContext = dbContext;
		_dbSet = _dbContext.Set<TEntity>();
	}

	public Task<TEntity?> GetByIdAsync(TKey id)
	{
		return _dbSet.SingleOrDefaultAsync(e => Equals(e.Id, id));
	}

	public Task CreateAsync(params IEnumerable<TEntity> entities)
	{
		_dbSet.AddRange(entities);
		return Task.CompletedTask;
	}

	public Task UpdateAsync(params IEnumerable<TEntity> entities)
	{
		return Task.CompletedTask;
	}

	public Task DeleteAsync(params IEnumerable<TEntity> entities)
	{
		if (entities.Any(e => _dbContext.ChangeTracker.Entries<TEntity>().Any(x => !ReferenceEquals(x.Entity, e))))
		{
			throw new InvalidOperationException("All entities must be loaded from the current DbContext to be removed.");
		}
		_dbSet.RemoveRange(entities);
		return Task.CompletedTask;
	}
}

public abstract class BaseRepository<TEntity, TDbContext>
	: BaseRepository<TEntity, Guid, TDbContext>, IRepository<TEntity>
	where TEntity : Entity
	where TDbContext : DbContext
{
	public BaseRepository(TDbContext dbContext) : base(dbContext)
	{
	}
}
