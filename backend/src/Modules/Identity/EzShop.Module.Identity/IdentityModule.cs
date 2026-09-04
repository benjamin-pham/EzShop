using EzShop.Contract.ModuleRegister;
using EzShop.Module.Identity.Domain;
using EzShop.Module.Identity.Infrastructure.Database;
using EzShop.Module.Identity.Infrastructure.Database.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace EzShop.Module.Identity;

public class IdentityModule : IModule
{
	public string Name => "identity";

	public string[] ModuleSettingFiles => ["appsettings.identity.json"];

	public void ConfigureServices(WebApplicationBuilder builder)
	{
		var connectionString = builder.Configuration.GetConnectionString("Database")
			?? throw new InvalidOperationException("Connection string 'Database' is not configured.");

		builder.Services.AddDbContext<IdentityDbContext>(options =>
		{
			options.UseNpgsql(connectionString);
			options.UseOpenIddict();
		});

		builder.Services.AddIdentityCore<ApplicationUser>(options =>
		{
			options.ClaimsIdentity.UserIdClaimType = Claims.Subject;
			options.ClaimsIdentity.UserNameClaimType = Claims.Name;
			options.ClaimsIdentity.RoleClaimType = Claims.Role;

			options.User.RequireUniqueEmail = true;
			options.Password.RequiredLength = 8;
			options.Password.RequireNonAlphanumeric = false;
		})
		.AddRoles<ApplicationRole>()
		.AddSignInManager()
		.AddEntityFrameworkStores<IdentityDbContext>()
		.AddDefaultTokenProviders();

		builder.Services.AddAuthentication(IdentityConstants.ApplicationScheme)
			.AddCookie(IdentityConstants.ApplicationScheme, options =>
			{
				options.LoginPath = "/Identity/Account/Login";
			})
			.AddCookie(IdentityConstants.ExternalScheme)
			.AddCookie(IdentityConstants.TwoFactorUserIdScheme);

		builder.Services.AddOpenIddict()
			.AddCore(options =>
			{
				options.UseEntityFrameworkCore()
					.UseDbContext<IdentityDbContext>();
			})
			.AddServer(options =>
			{
				options.SetAuthorizationEndpointUris("/api/identity/connect/authorize")
					.SetTokenEndpointUris("/api/identity/connect/token")
					.SetUserInfoEndpointUris("/api/identity/connect/userinfo")
					.SetEndSessionEndpointUris("/api/identity/connect/logout");

				options.AllowAuthorizationCodeFlow()
					.AllowClientCredentialsFlow()
					.AllowPasswordFlow()
					.AllowRefreshTokenFlow();

				options.RequireProofKeyForCodeExchange();

				options.RegisterScopes(Scopes.OpenId, Scopes.Profile, Scopes.Email, Scopes.Roles, "api");

				options.AddDevelopmentEncryptionCertificate()
					.AddDevelopmentSigningCertificate()
					.DisableAccessTokenEncryption();

				options.SetAccessTokenLifetime(TimeSpan.FromHours(1))
					.SetAuthorizationCodeLifetime(TimeSpan.FromMinutes(5))
					.SetRefreshTokenLifetime(TimeSpan.FromDays(14));

				options.UseAspNetCore()
					.EnableAuthorizationEndpointPassthrough()
					.EnableTokenEndpointPassthrough()
					.EnableUserInfoEndpointPassthrough()
					.EnableEndSessionEndpointPassthrough();
			})
			.AddValidation(options =>
			{
				options.UseLocalServer();
				options.UseAspNetCore();
			});

		builder.Services.AddHostedService<IdentityDataSeeder>();
	}
}
