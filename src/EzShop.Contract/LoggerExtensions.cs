using EzShop.Contract.Utilities;
using Microsoft.Extensions.Logging;
using System.Runtime.CompilerServices;

namespace EzShop.Contract;

public static partial class LoggerExtensions
{
	public static ILogger WithCaller(
		this ILogger logger,
		[CallerFilePath] string file = "",
		[CallerLineNumber] int line = 0,
		[CallerMemberName] string member = "")
	{
		return new CallerInfoLogger(logger, file, line, member);
	}
}