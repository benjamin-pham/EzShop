using EzShop.Contract.Infrastructure.Database;
using EzShop.Contract.ModuleRegister;
using EzShop.Module.Identity.Infrastructure.Database.Postgres;
using Microsoft.EntityFrameworkCore;

namespace EzShop.Module.Identity;

public class ModuleRegister : IModule
{
	public string Name => "identity";

	public string[] ModuleSettingFiles => [
		"appsettings.Identity.json",
		"appsettings.Identity.Development.json",
		"appsettings.Identity.Production.json"
	];

	public void ConfigureServices(WebApplicationBuilder builder)
	{
		builder.Services.AddScoped(provider =>
		{
			var options = provider.GetRequiredService<DbContextOptions<IdentityDbContext>>();
			return new IdentityDbContext(options, Name);
		});
		builder.Services.AddDbContext<IdentityDbContext>(Postgres.StandardOptions(builder.Configuration));
	}
}