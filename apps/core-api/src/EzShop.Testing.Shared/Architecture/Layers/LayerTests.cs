using EzShop.Contract.ModuleRegister;
using EzShop.Testing.Shared.Architecture.Infrastructure;
using FluentAssertions;
using NetArchTest.Rules;
using Xunit;

namespace EzShop.Testing.Shared.Architecture.Layers;

public class LayerTests : BaseTest
{
    [Fact]
    public void Contract_Should_NotHaveDependencyOn_Modules()
    {
        var result = Types.InCurrentDomain()
            .That()
            .ResideInNamespace(ContractNamespace)
            .ShouldNot()
            .HaveDependencyOn(ModulesNamespace)
            .GetResult();

        result.IsSuccessful.Should().BeTrue();
    }

    [Fact]
    public void Contract_Should_NotHaveDependencyOn_WebHost()
    {
        var result = Types.InCurrentDomain()
            .That()
            .ResideInNamespace(ContractNamespace)
            .ShouldNot()
            .HaveDependencyOn(WebHostNamespace)
            .GetResult();

        result.IsSuccessful.Should().BeTrue();
    }

    [Fact]
    public void Modules_Should_Not_DependOn_Other_Modules()
    {
        var modules = new[]
        {
            "EzShop.Module.Identity",
            "EzShop.Module.Catalog",
            // Add other modules here
        };

        foreach (var module in modules)
        {
            var otherModules = modules.Where(m => m != module).ToArray();

            var result = Types.InCurrentDomain()
                .That()
                .ResideInNamespace(module)
                .ShouldNot()
                .HaveDependencyOnAny(otherModules)
                .GetResult();

            result.IsSuccessful.Should().BeTrue();
        }
    }

    [Fact]
    public void Modules_Should_Implement_IModule()
    {
        var result = Types.InCurrentDomain()
            .That()
            .ResideInNamespace(ModulesNamespace)
            .And()
            .AreClasses()
            .And()
            .HaveNameEndingWith("Module")
            .Should()
            .ImplementInterface(typeof(IModule))
            .GetResult();

        result.IsSuccessful.Should().BeTrue();
    }
}

