using EzShop.Contract.Abstractions;
using EzShop.Contract.Abstractions.Data;
using Microsoft.EntityFrameworkCore;

namespace EzShop.Contract.Infrastructure.Database;

public class EFReadRepository<TReadModel, TKey, TDbContext> : IReadRepository<TReadModel, TKey>
	where TReadModel : ReadModel<TKey>
	where TDbContext : DbContext where TKey : struct, IEquatable<TKey>
{
	protected readonly TDbContext _dbContext;
	public EFReadRepository(TDbContext dbContext)
	{
		_dbContext = dbContext;
	}
	public async Task<TReadModel?> GetByIdAsync(TKey id)
	{
		if (EqualityComparer<TKey>.Default.Equals(id, default))
			return null;

		var results = await GetByIdsAsync(id);

		if (results.Count() > 1)
		{
			throw new InvalidOperationException($"Multiple {typeof(TReadModel).Name} entities found with the same id '{id}'.");
		}

		return results.FirstOrDefault();
	}

	public async Task<IEnumerable<TReadModel>> GetByIdsAsync(params IEnumerable<TKey> ids)
	{
		return await _dbContext.Set<TReadModel>().AsNoTracking().Where(e => ids.Contains(e.Id)).ToListAsync();
	}
}
public abstract class EFReadRepository<TReadModel, TDbContext>
	: EFReadRepository<TReadModel, Guid, TDbContext>, IReadRepository<TReadModel>
	where TReadModel : ReadModel
	where TDbContext : DbContext
{
	public EFReadRepository(TDbContext dbContext) : base(dbContext)
	{
	}
}