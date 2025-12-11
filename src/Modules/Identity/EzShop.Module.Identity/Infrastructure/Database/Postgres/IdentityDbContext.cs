using EzShop.Contract.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace EzShop.Module.Identity.Infrastructure.Database.Postgres;

public class IdentityDbContext(DbContextOptions<IdentityDbContext> options, string schema)
	: ApplicationDbContext<IdentityDbContext>(options, schema)
{
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.HasDefaultSchema(Schema);
		base.OnModelCreating(modelBuilder);
	}
}