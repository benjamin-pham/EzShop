using EzShop.Contract.Abstractions.Messaging;
using EzShop.Testing.Shared.Architecture.Infrastructure;
using FluentAssertions;
using NetArchTest.Rules;
using Xunit;

namespace EzShop.Testing.Shared.Architecture.Application;

public class ApplicationTests : BaseTest
{
	[Fact]
	public void CommandHandler_Should_HaveNameEndingWith_CommandHandler()
	{
		TestResult result = Types.InCurrentDomain()
			.That()
			.ImplementInterface(typeof(ICommandHandler<>))
			.Should().HaveNameEndingWith("CommandHandler")
			.GetResult();

		result.IsSuccessful.Should().BeTrue();
	}

	[Fact]
	public void CommandHandler_Should_NotBePublic()
	{
		TestResult result = Types.InCurrentDomain()
			.That()
			.ImplementInterface(typeof(ICommandHandler<>))
			.Should()
			.NotBePublic()
			.GetResult();

		result.IsSuccessful.Should().BeTrue();
	}

	[Fact]
	public void QueryHandler_Should_HaveNameEndingWith_QueryHandler()
	{
		TestResult result = Types.InCurrentDomain()
			.That()
			.ImplementInterface(typeof(IQueryHandler<,>))
			.Should()
			.HaveNameEndingWith("QueryHandler")
			.GetResult();

		result.IsSuccessful.Should().BeTrue();
	}

	[Fact]
	public void QueryHandler_Should_NotBePublic()
	{
		TestResult result = Types.InCurrentDomain()
			.That()
			.ImplementInterface(typeof(IQueryHandler<,>))
			.Should()
			.NotBePublic()
			.GetResult();

		result.IsSuccessful.Should().BeTrue();
	}
}

