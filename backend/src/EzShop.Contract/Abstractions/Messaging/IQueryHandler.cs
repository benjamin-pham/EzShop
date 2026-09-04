namespace EzShop.Contract.Abstractions.Messaging;

// Wolverine discovers handlers by convention (a Handle/HandleAsync method), this interface is only for our own typing.
public interface IQueryHandler<in TQuery, TResponse> where TQuery : IQuery<TResponse>
{
    Task<TResponse> HandleAsync(TQuery query, CancellationToken cancellationToken = default);
}
