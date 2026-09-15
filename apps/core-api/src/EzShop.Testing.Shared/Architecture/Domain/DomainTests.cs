using System.Reflection;
using EzShop.Contract.Abstractions;
using EzShop.Testing.Shared.Architecture.Infrastructure;
using FluentAssertions;
using NetArchTest.Rules;
using Xunit;

namespace EzShop.Testing.Shared.Architecture.Domain;

public class DomainTests : BaseTest
{
    [Fact]
    public void Entities_ShouldHave_PrivateParameterlessConstructor()
    {
        IEnumerable<Type> entityTypes = Types.InCurrentDomain()
            .That()
            .Inherit(typeof(Entity<>))
            .Or()
            .Inherit(typeof(Entity))
            .GetTypes();

        List<Type> failingTypes = new();

        foreach (Type entityType in entityTypes)
        {
            // Only care about concrete entities inside Modules, not those in Contract
            if (entityType.IsAbstract || entityType.Namespace?.StartsWith("EzShop.Contract") == true)
                continue;

            ConstructorInfo[] constructors = entityType.GetConstructors(BindingFlags.NonPublic | BindingFlags.Instance);

            if (!constructors.Any(c => c.IsPrivate && c.GetParameters().Length == 0))
            {
                failingTypes.Add(entityType);
            }
        }

        failingTypes.Should().BeEmpty();
    }
}
