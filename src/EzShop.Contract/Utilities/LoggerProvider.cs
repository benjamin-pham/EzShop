using Microsoft.Extensions.Logging;

namespace EzShop.Contract.Utilities;

public static class LoggerProvider
{
	private static ILoggerFactory _loggerFactory = default!;
	public static ILoggerFactory LoggerFactory => _loggerFactory;

	internal static bool Initialize(ILoggerFactory loggerFactory)
	{
		return Interlocked.CompareExchange(ref _loggerFactory, loggerFactory, null) == null;
	}
}
