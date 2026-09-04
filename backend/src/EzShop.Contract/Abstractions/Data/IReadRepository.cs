namespace EzShop.Contract.Abstractions.Data;

public interface IReadRepository<TReadModel, TKey> where TReadModel : ReadModel<TKey> where TKey : struct, IEquatable<TKey>
{
	Task<TReadModel?> GetByIdAsync(TKey id);
	Task<IEnumerable<TReadModel>> GetByIdsAsync(params IEnumerable<TKey> ids);
}
public interface IReadRepository<TReadModel> : IReadRepository<TReadModel, Guid> where TReadModel : ReadModel
{

}