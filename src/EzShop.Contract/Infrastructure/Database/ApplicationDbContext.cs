using Microsoft.EntityFrameworkCore;

namespace EzShop.Contract.Infrastructure.Database;

public abstract class ApplicationDbContext<T>(DbContextOptions<T> options, string schema) : DbContext(options) where T : DbContext
{
	protected string _schema { get; } = schema;
}
