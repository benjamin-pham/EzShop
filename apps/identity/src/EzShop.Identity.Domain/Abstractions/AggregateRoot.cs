namespace EzShop.Identity.Domain.Abstractions;

public class AggregateRoot<TKey> : Entity<TKey> where TKey : struct, IEquatable<TKey>
{
}
public class AggregateRoot : AggregateRoot<Guid>
{
}
