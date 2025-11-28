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

	public IQueryable<TEntity> Queryable => _dbSet.AsQueryable();

	public BaseRepository(TDbContext dbContext)
	{
		_dbContext = dbContext;
		_dbSet = _dbContext.Set<TEntity>();
	}

	public Task<TEntity?> GetByIdAsync(TKey id)
	{
		return _dbSet.SingleOrDefaultAsync(e => e.Id.Equals(id));
	}

	public void Add(TEntity entity)
	{
		_dbSet.Add(entity);
	}

	public void Update(TEntity entity)
	{
		_dbSet.Update(entity);
	}

	public void Remove(TEntity entity)
	{
		_dbSet.Remove(entity);
	}

	public void Add(IEnumerable<TEntity> entities)
	{
		_dbSet.AddRange(entities);
	}

	public void Update(IEnumerable<TEntity> entities)
	{
		_dbSet.UpdateRange(entities);
	}

	public void Remove(IEnumerable<TEntity> entities)
	{
		_dbSet.RemoveRange(entities);
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
