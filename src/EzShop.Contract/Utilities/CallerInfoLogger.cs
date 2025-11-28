using Microsoft.Extensions.Logging;
using Serilog.Formatting.Json;

namespace EzShop.Contract.Utilities;

public class CallerInfoLogger(ILogger inner, string file, int line, string member) : ILogger
{
	private readonly ILogger _inner = inner;
	private readonly string _file = file;
	private readonly int _line = line;
	private readonly string _member = member;
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
		var displayFile = _file;
		var idx = _file.IndexOf("\\src\\", StringComparison.OrdinalIgnoreCase);
		if (idx >= 0)
		{
			displayFile = _file[idx..];
		}
		var originalMessage = formatter(state, exception);
		string callerInfo = $" at {displayFile}:{_line} {_member}\n";
		var dic = new Dictionary<string, object>
		{
			["callerFile"] = displayFile,
			["callerLine"] = _line,
			["callerMember"] = _member,
			["callerInfo"] = callerInfo
		};
		
		using (_inner.BeginScope(dic))
		{
			_inner.Log(logLevel, eventId, state, exception, formatter);
		}
	}
}