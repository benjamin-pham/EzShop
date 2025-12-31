using Microsoft.Extensions.Logging;

namespace EzShop.Contract.Utilities;

public static class LoggerProvider
{
	private static ILoggerFactory? _loggerFactory;
	public static ILoggerFactory? LoggerFactory
	{
		get => _loggerFactory;
		set
		{
			if (_loggerFactory == null)
			{
				_loggerFactory = value;
			}
		}
	}
}
