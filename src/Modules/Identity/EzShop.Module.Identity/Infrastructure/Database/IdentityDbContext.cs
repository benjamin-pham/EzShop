using EzShop.Contract.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace EzShop.Module.Identity.Infrastructure.Database;

public class IdentityDbContext(DbContextOptions<IdentityDbContext> options, string schema) : ApplicationDbContext<IdentityDbContext>(options, schema)
{
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.HasDefaultSchema(_schema);
		base.OnModelCreating(modelBuilder);
	}
}