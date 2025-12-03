namespace EzShop.Module.Catalog.Infrastructure.Database.Postgres;

public static class TransactionEndpointFilterExtensions
{
	public static RouteHandlerBuilder UseTransaction(this RouteHandlerBuilder builder)
	{
		return builder.AddEndpointFilter<TransactionEndpointFilter>();
	}
}