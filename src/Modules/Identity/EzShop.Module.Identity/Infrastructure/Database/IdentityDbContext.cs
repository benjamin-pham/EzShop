using EzShop.Contract.Infrastructure.Database;
using EzShop.Contract.ModuleRegister;
using Microsoft.EntityFrameworkCore;

namespace EzShop.Module.Identity.Infrastructure.Database;

public class IdentityDbContext(DbContextOptions<IdentityDbContext> options)
	: ApplicationDbContext<IdentityDbContext>(options)
{
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.HasDefaultSchema("identity");
		base.OnModelCreating(modelBuilder);
	}
}