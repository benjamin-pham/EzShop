using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace EzShop.Testing.Shared;

public abstract class IntegrationTestBase : IClassFixture<IntegrationTestFactory>
{
	protected readonly IntegrationTestFactory Factory;
	protected readonly HttpClient Client;
	protected readonly IServiceScope Scope;

	protected IntegrationTestBase(IntegrationTestFactory factory)
	{
		Factory = factory;
		Client = factory.CreateClient();
		Scope = factory.Services.CreateScope();
	}
}

