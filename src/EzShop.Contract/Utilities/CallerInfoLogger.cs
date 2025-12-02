using Microsoft.Extensions.Logging;

namespace EzShop.Contract.Utilities;

public readonly struct CallerInfoLogger(ILogger inner, string file, int line, string member) : ILogger
{
	private readonly ILogger _inner = inner;
	private readonly string _file = TruncateFilePath(file);
	private readonly int _line = line;
	private readonly string _member = member;

	public IDisposable? BeginScope<TState>(TState state) where TState : notnull
		=> _inner.BeginScope(state);

	public bool IsEnabled(LogLevel logLevel)
		=> _inner.IsEnabled(logLevel);

	public void Log<TState>(
		LogLevel logLevel,
		EventId eventId,
		TState state,
		Exception? exception,
		Func<TState, Exception?, string> formatter)
	{
		if (!_inner.IsEnabled(logLevel))
			return;

		var wrapped = new CallerInfoState<TState>(state, _file, _line, _member);

		using (_inner.BeginScope(wrapped))
		{
			_inner.Log(logLevel, eventId, state, exception, formatter);
		}
	}

	private static string TruncateFilePath(string file)
	{
		var idx = file.IndexOf("\\src\\", StringComparison.OrdinalIgnoreCase);
		return idx >= 0 ? file[idx..] : file;
	}
}

public readonly struct CallerInfoState<TState>(TState state, string file, int line, string member) : IReadOnlyList<KeyValuePair<string, object>>
{
	public readonly TState State = state;
	public readonly string File = file;
	public readonly int Line = line;
	public readonly string Member = member;

	public override string ToString()
		=> State?.ToString() ?? "";

	public int Count => 4;

	public KeyValuePair<string, object> this[int i] => i switch
	{
		0 => new("callerFile", File),
		1 => new("callerLine", Line),
		2 => new("callerMember", Member),
		3 => new("callerInfo", $"at {File}:{Line} {Member}\n"),
		_ => throw new IndexOutOfRangeException()
	};

	public IEnumerator<KeyValuePair<string, object>> GetEnumerator()
	{
		yield return this[0];
		yield return this[1];
		yield return this[2];
		yield return this[3];
	}

	System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
	{
		return GetEnumerator();
	}
}