namespace EzShop.Contract.Abstractions.Messaging;

public interface IQuery<out TResponse>
{
    // phantom member so TResponse is considered used; never implemented or invoked by consumers.
    private TResponse? PhantomResponse => default;
}
