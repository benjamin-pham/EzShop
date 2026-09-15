namespace EzShop.Contract.Abstractions.Data;

public interface IRepository<TEntity, TKey>
	where TEntity : AggregateRoot<TKey>
	where TKey : struct, IEquatable<TKey>
{
	Task<TEntity?> GetByIdAsync(TKey id);
	Task<IEnumerable<TEntity>> GetByIdsAsync(params IEnumerable<TKey> ids);
	Task CreateAsync(params IEnumerable<TEntity> entities);
	Task UpdateAsync(params IEnumerable<TEntity> entities);
	Task DeleteAsync(params IEnumerable<TEntity> entities);
}
public interface IRepository<TEntity> : IRepository<TEntity, Guid> where TEntity : AggregateRoot
{

}