using Microsoft.Extensions.Logging;

namespace EzShop.Contract.Utilities;

public class CallerInfoLogger : ILogger
{
	private readonly ILogger _inner;
	private readonly IReadOnlyList<KeyValuePair<string, object>> _scopeState;
	public CallerInfoLogger(ILogger inner, string file, int line, string member)
	{
		_inner = inner;

		var displayFile = TruncateFilePath(file);

		_scopeState = [
			new KeyValuePair<string, object>("callerFile", displayFile),
			new KeyValuePair<string, object>("callerLine", line),
			new KeyValuePair<string, object>("callerMember", member),
			new KeyValuePair<string, object>("callerInfo", $" at {displayFile}:{line} {member}\n")
		];
	}
	public IDisposable? BeginScope<TState>(TState state) where TState : notnull
	{
		return _inner.BeginScope(state);
	}

	public bool IsEnabled(LogLevel logLevel)
	{
		return _inner.IsEnabled(logLevel);
	}

	public void Log<TState>(
	LogLevel logLevel,
	EventId eventId,
	TState state,
	Exception? exception,
	Func<TState, Exception?, string> formatter)
	{
		if (!_inner.IsEnabled(logLevel))
		{
			return;
		}

		using (_inner.BeginScope(_scopeState))
		{
			_inner.Log(logLevel, eventId, state, exception, formatter);
		}
	}

	private static string TruncateFilePath(string file)
	{
		var idx = file.IndexOf("\\src\\", StringComparison.OrdinalIgnoreCase);
		if (idx >= 0)
		{
			return file[idx..];
		}
		return file;
	}
}