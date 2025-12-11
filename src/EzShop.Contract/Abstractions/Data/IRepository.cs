namespace EzShop.Contract.Abstractions.Data;

public interface IRepository<TEntity, TKey> where TEntity : Entity<TKey> where TKey : notnull
{
	Task<TEntity?> GetByIdAsync(TKey id);
	Task CreateAsync(params IEnumerable<TEntity> entities);
	Task UpdateAsync(params IEnumerable<TEntity> entities);
	Task DeleteAsync(params IEnumerable<TEntity> entities);
}
public interface IRepository<TEntity> : IRepository<TEntity, Guid> where TEntity : Entity
{

}