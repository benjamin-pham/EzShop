using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

namespace EzShop.Contract;

public static class LoggerExtensions
{
	private static readonly ConditionalWeakTable<ILogger, ConcurrentDictionary<CallerKey, ILogger>>
		_loggerCache = [];
	private static readonly ConditionalWeakTable<object, ConcurrentDictionary<CallerKey, object>>
		_genericLoggerCache = [];
	public static ILogger WithCaller(
		this ILogger logger,
		bool includeMessagePrefix = true,
		[CallerFilePath] string file = "",
		[CallerLineNumber] int line = 0,
		[CallerMemberName] string member = "")
	{
		ArgumentNullException.ThrowIfNull(logger);

		if (logger is CallerInfoLogger)
			return logger;

		var cache = _loggerCache.GetOrCreateValue(logger);
		var key = new CallerKey(file, line, member);

		return cache.GetOrAdd(key, k =>
			new CallerInfoLogger(logger, k.File, k.Line, k.Member, includeMessagePrefix));
	}

	public static ILogger<T> WithCaller<T>(
	this ILogger<T> logger,
	bool includeMessagePrefix = true,
	[CallerFilePath] string file = "",
	[CallerLineNumber] int line = 0,
	[CallerMemberName] string member = "")
	{
		ArgumentNullException.ThrowIfNull(logger);

		if (logger is CallerInfoLogger<T>)
			return logger;

		var cache = _genericLoggerCache.GetOrCreateValue(logger);
		var key = new CallerKey(file, line, member);

		return (ILogger<T>)cache.GetOrAdd(key, k =>
			(object)new CallerInfoLogger<T>(logger, k.File, k.Line, k.Member, includeMessagePrefix));
	}

	private readonly struct CallerKey(string file, int line, string member) : IEquatable<CallerKey>
	{
		public readonly string File = file ?? string.Empty;
		public readonly int Line = line;
		public readonly string Member = member ?? string.Empty;

		public bool Equals(CallerKey other) =>
			Line == other.Line &&
			string.Equals(File, other.File, StringComparison.Ordinal) &&
			string.Equals(Member, other.Member, StringComparison.Ordinal);

		public override bool Equals(object? obj) =>
			obj is CallerKey other && Equals(other);

		public override int GetHashCode() =>
			HashCode.Combine(File, Line, Member);
	}

	private readonly struct CallerInfoLogger(ILogger inner, string file, int line, string member, bool includeMessagePrefix) : ILogger
	{
		private readonly ILogger _inner = inner ?? throw new ArgumentNullException(nameof(inner));
		private readonly string _file = TruncateFilePath(file);
		private readonly int _line = line;
		private readonly string _member = member;
		private readonly bool _includeMessagePrefix = includeMessagePrefix;

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

			var enrichedState = new EnrichedLogState<TState>(
				state, _file, _line, _member, _includeMessagePrefix);

			_inner.Log(
				logLevel,
				eventId,
				enrichedState,
				exception,
				EnrichedLogState<TState>.CreateFormatter(formatter));
		}

		private static string TruncateFilePath(string file)
		{
			if (string.IsNullOrEmpty(file))
				return string.Empty;

			var patterns = new[] { "\\src\\", "/src/" };
			foreach (var pattern in patterns)
			{
				var idx = file.IndexOf(pattern, StringComparison.OrdinalIgnoreCase);
				if (idx >= 0)
					return file[idx..];
			}

			return Path.GetFileName(file);
		}
	}

	private readonly struct CallerInfoLogger<T>(ILogger<T> inner, string file, int line, string member, bool includeMessagePrefix) : ILogger<T>
	{
		private readonly ILogger<T> _inner = inner ?? throw new ArgumentNullException(nameof(inner));
		private readonly string _file = TruncateFilePath(file);
		private readonly int _line = line;
		private readonly string _member = member;
		private readonly bool _includeMessagePrefix = includeMessagePrefix;

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

			var enrichedState = new EnrichedLogState<TState>(
				state, _file, _line, _member, _includeMessagePrefix);

			_inner.Log(
				logLevel,
				eventId,
				enrichedState,
				exception,
				EnrichedLogState<TState>.CreateFormatter(formatter));
		}

		private static string TruncateFilePath(string file)
		{
			if (string.IsNullOrEmpty(file))
				return string.Empty;

			var patterns = new[] { "\\src\\", "/src/" };
			foreach (var pattern in patterns)
			{
				var idx = file.IndexOf(pattern, StringComparison.OrdinalIgnoreCase);
				if (idx >= 0)
					return file[idx..];
			}

			return Path.GetFileName(file);
		}
	}

	private readonly struct EnrichedLogState<TState> : IReadOnlyList<KeyValuePair<string, object?>>
	{
		private const string CallerFileKey = "CallerFile";
		private const string CallerLineKey = "CallerLine";
		private const string CallerMemberKey = "CallerMember";
		private const string OriginalFormatKey = "{OriginalFormat}";

		private static readonly string CallerFormatPrefix =
			$"at {{CallerFile}}:{{CallerLine}}{Environment.NewLine}";

		public TState OriginalState { get; }

		private readonly string _file;
		private readonly int _line;
		private readonly string _member;

		private readonly IReadOnlyList<KeyValuePair<string, object?>>? _originalList;
		private readonly int _originalCount;
		private readonly string? _enhancedFormat;
		private readonly bool _includeMessagePrefix;
		public EnrichedLogState(TState state, string file, int line, string member, bool inclueMessagePrefix)
		{
			OriginalState = state;
			_file = file;
			_line = line;
			_member = member;
			_includeMessagePrefix = inclueMessagePrefix;
			if (state is IReadOnlyList<KeyValuePair<string, object?>> list)
			{
				_originalList = list;
				_originalCount = list.Count;

				_enhancedFormat = null;
				for (int i = 0; i < list.Count; i++)
				{
					if (list[i].Key == OriginalFormatKey)
					{
						var format = list[i].Value?.ToString();
						if (_includeMessagePrefix && !string.IsNullOrEmpty(format))
						{
							_enhancedFormat = CallerFormatPrefix + format;
						}
						break;
					}
				}
			}
			else if (state is IEnumerable<KeyValuePair<string, object?>> enumerable)
			{
				var snapshot = enumerable.ToList();
				_originalList = snapshot;
				_originalCount = snapshot.Count;

				_enhancedFormat = null;
				foreach (var kvp in snapshot)
				{
					if (kvp.Key == OriginalFormatKey)
					{
						var format = kvp.Value?.ToString();
						if (_includeMessagePrefix && !string.IsNullOrEmpty(format))
						{
							_enhancedFormat = CallerFormatPrefix + format;
						}
						break;
					}
				}
			}
			else
			{
				_originalList = null;
				_originalCount = 0;
				_enhancedFormat = null;
			}
		}

		public int Count => _originalCount + 3;

		public KeyValuePair<string, object?> this[int index]
		{
			get
			{
				if (index < 0 || index >= Count)
					throw new ArgumentOutOfRangeException(nameof(index));

				if (index < _originalCount)
				{
					if (_originalList == null)
						throw new InvalidOperationException("Original state is not indexable");

					var item = _originalList[index];

					if (item.Key == OriginalFormatKey && _enhancedFormat != null)
					{
						return new KeyValuePair<string, object?>(OriginalFormatKey, _enhancedFormat);
					}

					return item;
				}

				int callerIndex = index - _originalCount;
				return callerIndex switch
				{
					0 => new KeyValuePair<string, object?>(CallerFileKey, _file),
					1 => new KeyValuePair<string, object?>(CallerLineKey, _line),
					2 => new KeyValuePair<string, object?>(CallerMemberKey, _member),
					_ => throw new ArgumentOutOfRangeException(nameof(index))
				};
			}
		}

		public IEnumerator<KeyValuePair<string, object?>> GetEnumerator()
		{
			if (_originalList != null)
			{
				for (int i = 0; i < _originalList.Count; i++)
				{
					var item = _originalList[i];

					if (item.Key == OriginalFormatKey && _enhancedFormat != null)
					{
						yield return new KeyValuePair<string, object?>(OriginalFormatKey, _enhancedFormat);
					}
					else
					{
						yield return item;
					}
				}
			}

			yield return new KeyValuePair<string, object?>(CallerFileKey, _file);
			yield return new KeyValuePair<string, object?>(CallerLineKey, _line);
			yield return new KeyValuePair<string, object?>(CallerMemberKey, _member);
		}

		System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => GetEnumerator();

		public override string ToString()
		{
			return OriginalState?.ToString() ?? string.Empty;
		}

		public static Func<EnrichedLogState<TState>, Exception?, string> CreateFormatter(
			Func<TState, Exception?, string> originalFormatter)
		{
			ArgumentNullException.ThrowIfNull(originalFormatter);

			return FormatterCache.GetOrCreate(originalFormatter);
		}

		private static class FormatterCache
		{
			private static readonly ConditionalWeakTable<Func<TState, Exception?, string>,
				Func<EnrichedLogState<TState>, Exception?, string>> _cache = [];

			public static Func<EnrichedLogState<TState>, Exception?, string> GetOrCreate(
				Func<TState, Exception?, string> originalFormatter)
			{
				return _cache.GetValue(originalFormatter, f =>
				{
					return (enrichedState, ex) =>
					{
						var originalMessage = f(enrichedState.OriginalState, ex);

						if (!enrichedState._includeMessagePrefix)
						{
							return originalMessage;
						}

						if (string.IsNullOrEmpty(originalMessage))
						{
							return $"at {enrichedState._file}:{enrichedState._line}";
						}

						if (enrichedState._enhancedFormat != null)
						{
							return originalMessage;
						}

						return $"at {enrichedState._file}:{enrichedState._line}{Environment.NewLine}{originalMessage}";
					};
				});
			}
		}
	}
}
