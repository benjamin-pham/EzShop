using EzShop.Contract.ModuleRegister;
using Microsoft.EntityFrameworkCore;

namespace EzShop.Contract.Infrastructure.Database;

public abstract class ApplicationDbContext<T>(DbContextOptions<T> options) : DbContext(options) where T : DbContext
{

}