using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace EzShop.Contract.Infrastructure.Database;

public class TransactionEndpointFilter<TDbContext> : IEndpointFilter where TDbContext: DbContext
{
	public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
	{
		var db = context.HttpContext.RequestServices.GetRequiredService<TDbContext>();

		await using var transaction = await db.Database.BeginTransactionAsync();

		try
		{
			var result = await next(context);
			await db.SaveChangesAsync();
			await transaction.CommitAsync();
			return result;
		}
		catch
		{
			await transaction.RollbackAsync();
			throw;
		}
	}
}
