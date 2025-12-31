using EzShop.Contract.Abstractions;
using EzShop.Contract.Abstractions.Data;
using Microsoft.EntityFrameworkCore;

namespace EzShop.Contract.Infrastructure.Database;

public abstract class EFRepository<TEntity, TKey, TDbContext>
	: IRepository<TEntity, TKey>
	where TEntity : AggregateRoot<TKey>
	where TKey : struct, IEquatable<TKey>
	where TDbContext : DbContext
{
	protected readonly TDbContext _dbContext;
	protected readonly DbSet<TEntity> _dbSet;

	public EFRepository(TDbContext dbContext)
	{
		_dbContext = dbContext;
		_dbSet = _dbContext.Set<TEntity>();
	}

	public async Task<TEntity?> GetByIdAsync(TKey id)
	{
		if (EqualityComparer<TKey>.Default.Equals(id, default))
		{
			return null;
		}
		var results = await GetByIdsAsync(id);

		if (results.Count() > 1)
		{
			throw new InvalidOperationException($"Multiple {typeof(TEntity).Name} entities found with the same id '{id}'.");
		}

		return results.FirstOrDefault();
	}

	public async Task<IEnumerable<TEntity>> GetByIdsAsync(params IEnumerable<TKey> ids)
	{
		return await _dbSet.Where(e => ids.Contains(e.Id)).ToListAsync();
	}

	public Task CreateAsync(params IEnumerable<TEntity> entities)
	{
		_dbSet.AddRange(entities);
		return Task.CompletedTask;
	}

	public Task UpdateAsync(params IEnumerable<TEntity> entities)
	{
		if (entities.Any(e => !_dbSet.Local.Contains(e)))
		{
			throw new InvalidOperationException("All entities must be loaded from the current DbContext to be updated.");
		}
		return Task.CompletedTask;
	}

	public Task DeleteAsync(params IEnumerable<TEntity> entities)
	{
		if (entities.Any(e => !_dbSet.Local.Contains(e)))
		{
			throw new InvalidOperationException("All entities must be loaded from the current DbContext to be removed.");
		}
		_dbSet.RemoveRange(entities);
		return Task.CompletedTask;
	}
}

public abstract class EFRepository<TEntity, TDbContext>
	: EFRepository<TEntity, Guid, TDbContext>, IRepository<TEntity>
	where TEntity : AggregateRoot
	where TDbContext : DbContext
{
	public EFRepository(TDbContext dbContext) : base(dbContext)
	{
	}
}
