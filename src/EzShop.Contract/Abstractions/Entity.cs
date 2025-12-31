namespace EzShop.Contract.Abstractions;

public abstract class Entity<TKey> where TKey : struct, IEquatable<TKey>
{
	public TKey Id { get; set; }
	public DateTime CreatedAt { get; set; }
	public DateTime? UpdatedAt { get; set; }
	public DateTime? DeletedAt { get; set; }
	public Guid? CreatedBy { get; set; }
	public Guid? UpdatedBy { get; set; }
	public Guid? DeletedBy { get; set; }
}
public abstract class Entity : Entity<Guid>
{

}
