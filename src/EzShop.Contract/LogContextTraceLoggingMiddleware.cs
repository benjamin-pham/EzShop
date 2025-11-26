using Microsoft.AspNetCore.Http;
using Serilog.Context;
using System.Diagnostics;

namespace EzShop.Contract;

public class LogContextTraceLoggingMiddleware(RequestDelegate next)
{
	public Task Invoke(HttpContext context)
	{
		string? traceId = Activity.Current?.TraceId.ToString();

		using (LogContext.PushProperty("TraceId", traceId))
		{
			return next.Invoke(context);
		}
	}
}
