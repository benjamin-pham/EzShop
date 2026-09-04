namespace EzShop.Contract.Abstractions.Messaging;

public interface IBaseCommand;

public interface ICommand : IBaseCommand;

public interface ICommand<out TResponse> : IBaseCommand
{
    // phantom member so TResponse is considered used; never implemented or invoked by consumers.
    private TResponse? PhantomResponse => default;
}