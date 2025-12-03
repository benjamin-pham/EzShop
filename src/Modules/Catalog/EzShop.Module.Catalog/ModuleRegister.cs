using EzShop.Contract.Infrastructure.Database;
using EzShop.Contract.ModuleRegister;
using EzShop.Module.Catalog.Infrastructure.Database.Postgres;
using Microsoft.EntityFrameworkCore;

namespace EzShop.Module.Catalog;

public class ModuleRegister : IModule
{
	public string Name => "catalog";

	public string[] ModuleSettingFiles => [
		"appsettings.Catalog.json",
		"appsettings.Catalog.Development.json",
		"appsettings.Catalog.Production.json"
	];

	public void ConfigureServices(WebApplicationBuilder builder)
	{
		builder.Services.AddScoped(provider =>
		{
			var options = provider.GetRequiredService<DbContextOptions<CatalogDbContext>>();
			return new CatalogDbContext(options, Name);
		});
		builder.Services.AddDbContext<CatalogDbContext>(Postgres.StandardOptions(builder.Configuration));
	}
}
