using Microsoft.AspNetCore.Http;

namespace EzShop.Contract.Abstractions;

/// <summary>Maps a <see cref="Result"/>/<see cref="Result{TValue}"/> to a minimal API <see cref="IResult"/>.</summary>
public static class ResultHttpExtensions
{
    public static IResult ToHttpResult(this Result result, Func<IResult> onSuccess) =>
        result.IsSuccess ? onSuccess() : result.ToProblemResult();

    public static IResult ToHttpResult<TValue>(this Result<TValue> result, Func<TValue, IResult> onSuccess) =>
        result.IsSuccess ? onSuccess(result.Value) : result.ToProblemResult();

    private static IResult ToProblemResult(this Result result)
    {
        if (result.Errors.Any(error => error.Type == ErrorType.Validation))
        {
            var errors = result.Errors
                .GroupBy(error => error.Code)
                .ToDictionary(group => group.Key, group => group.Select(error => error.Description).ToArray());

            return Results.ValidationProblem(errors);
        }

        var statusCode = result.Error.Type switch
        {
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            ErrorType.Unauthorized => StatusCodes.Status401Unauthorized,
            _ => StatusCodes.Status400BadRequest,
        };

        return Results.Problem(detail: result.Error.Description, title: result.Error.Code, statusCode: statusCode);
    }
}
