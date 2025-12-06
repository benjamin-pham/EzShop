using Microsoft.Extensions.DependencyInjection;

namespace EzShop.Contract.Utilities.Attributes;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
public class ServiceRegisterAttribute(ServiceLifetime lifetime) : Attribute
{
	public ServiceLifetime Lifetime { get; } = lifetime;
}
