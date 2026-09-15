using System.Collections.Immutable;
using OpenIddict.Abstractions;

namespace EzShop.Module.Identity.Features.Connect.Shared;

/// <summary>Resolves the API resources associated with a set of granted scopes.</summary>
internal static class ScopeResources
{
    public static async Task<IEnumerable<string>> ListAsync(
        IOpenIddictScopeManager scopeManager,
        ImmutableArray<string> scopes,
        CancellationToken cancellationToken)
    {
        var resources = new List<string>();
        await foreach (var resource in scopeManager.ListResourcesAsync(scopes, cancellationToken))
        {
            resources.Add(resource);
        }

        return resources;
    }
}
