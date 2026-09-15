using EzShop.Testing.Shared;
using FluentAssertions;

namespace EzShop.Module.Identity.Tests;

public class SampleIdentityTests : TestBase
{
    [Fact]
    public void SampleTest_Should_Pass()
    {
        // Arrange
        var isTrue = true;

        // Act
        // (Call Identity module code here)

        // Assert
        isTrue.Should().BeTrue();
    }
}

