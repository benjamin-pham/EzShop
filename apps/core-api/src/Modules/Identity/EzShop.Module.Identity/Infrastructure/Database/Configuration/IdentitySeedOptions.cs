using static OpenIddict.Abstractions.OpenIddictConstants;

namespace EzShop.Module.Identity.Infrastructure.Database.Configuration;

public sealed class IdentitySeedOptions
{
    public const string SectionName = "Identity";

    public AdminUserSeed AdminUser { get; set; } = new();

    public ScopeSeed[] Scopes { get; set; } = [];

    public ClientSeed[] Clients { get; set; } = [];

    public sealed class AdminUserSeed
    {
        public string UserName { get; set; } = "admin";
        public string Email { get; set; } = "admin@ezshop.local";
        public string Password { get; set; } = "Admin@123";
        public string[] Roles { get; set; } = [];
    }

    public sealed class ScopeSeed
    {
        public string Name { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string[] Resources { get; set; } = [];
    }

    public sealed class ClientSeed
    {
        public string ClientId { get; set; } = string.Empty;
        public string? ClientSecret { get; set; }
        public string DisplayName { get; set; } = string.Empty;
        public string Type { get; set; } = ClientTypes.Public;
        public string ConsentType { get; set; } = ConsentTypes.Implicit;
        public string[] GrantTypes { get; set; } = [];
        public string[] Scopes { get; set; } = [];
        public string[] RedirectUris { get; set; } = [];
        public string[] PostLogoutRedirectUris { get; set; } = [];
    }
}
