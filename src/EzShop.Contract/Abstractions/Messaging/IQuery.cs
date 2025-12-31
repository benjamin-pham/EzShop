using MediatR;

namespace EzShop.Contract.Abstractions.Messaging;

public interface IQuery<TResponse> : IRequest<TResponse>
{
}
