using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace EzShop.Contract;

// converts a FluentValidation failure (thrown by Wolverine's UseFluentValidation middleware) into a 400 ValidationProblem.
public class ValidationExceptionMiddleware(RequestDelegate next)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            var errors = ex.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray());

            await Results.ValidationProblem(errors).ExecuteAsync(context);
        }
    }
}
