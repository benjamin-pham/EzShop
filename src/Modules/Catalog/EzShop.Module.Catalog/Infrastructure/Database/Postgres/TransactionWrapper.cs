using EzShop.Contract.Infrastructure.Database;

namespace EzShop.Module.Catalog.Infrastructure.Database.Postgres;

public static class TransactionWrapper
{
	public static RouteHandlerBuilder UseTransaction(this RouteHandlerBuilder builder)
	{
		return builder.AddEndpointFilter<TransactionEndpointFilter<CatalogDbContext>>();
	}
}