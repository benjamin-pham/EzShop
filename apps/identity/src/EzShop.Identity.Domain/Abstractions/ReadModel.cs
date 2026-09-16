namespace EzShop.Identity.Domain.Abstractions;

public abstract class ReadModel<TKey> where TKey : struct, IEquatable<TKey>
{
	public TKey Id { get; set; } = default!;
}
public abstract class ReadModel : ReadModel<Guid>
{
}