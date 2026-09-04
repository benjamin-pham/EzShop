namespace EzShop.Contract.Abstractions.Messaging;

// Wolverine discovers handlers by convention (a Handle/HandleAsync method), these interfaces are only for our own typing.
public interface ICommandHandler<in TCommand> where TCommand : ICommand
{
    Task HandleAsync(TCommand command, CancellationToken cancellationToken = default);
}

public interface ICommandHandler<in TCommand, TResponse> where TCommand : ICommand<TResponse>
{
    Task<TResponse> HandleAsync(TCommand command, CancellationToken cancellationToken = default);
}
