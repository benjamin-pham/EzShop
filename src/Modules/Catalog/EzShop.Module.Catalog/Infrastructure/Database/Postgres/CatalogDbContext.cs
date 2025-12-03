using EzShop.Contract.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace EzShop.Module.Catalog.Infrastructure.Database.Postgres;

public class CatalogDbContext(DbContextOptions<CatalogDbContext> options, string schema)
	: ApplicationDbContext<CatalogDbContext>(options, schema)
{
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.HasDefaultSchema(_schema);
		base.OnModelCreating(modelBuilder);
	}
}