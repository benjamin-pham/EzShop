namespace EzShop.Contract.Abstractions.Data;

public interface IRepository<TEntity, TKey> where TEntity : Entity<TKey> where TKey : notnull
{
	IQueryable<TEntity> Queryable { get; }
	Task<TEntity?> GetByIdAsync(TKey id);
	void Add(TEntity entity);
	void Add(IEnumerable<TEntity> entities);
	void Update(TEntity entity);
	void Update(IEnumerable<TEntity> entities);
	void Remove(TEntity entity);
	void Remove(IEnumerable<TEntity> entities);
}
public interface IRepository<TEntity> : IRepository<TEntity, Guid> where TEntity : Entity
{

}