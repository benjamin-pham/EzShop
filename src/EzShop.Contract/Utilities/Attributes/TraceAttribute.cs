using MethodBoundaryAspect.Fody.Attributes;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Reflection;

namespace EzShop.Contract.Utilities.Attributes;
#pragma warning disable CA2254 // Template should be a static expression
#pragma warning disable CA1873 // Avoid potentially expensive logging
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class,
	AllowMultiple = false,
	Inherited = false)]
public class TraceAttribute : OnMethodBoundaryAspect
{
	public string Message { get; init; } = "";

	public bool LogArguments { get; init; } = true;

	public bool LogReturnValue { get; init; } = true;

	private static readonly ConcurrentDictionary<Type, MemberInfo?> LoggerMembersCache = new();

	public override void OnEntry(MethodExecutionArgs arg)
	{
		try
		{
			var logger = GetLogger(arg.Instance);

			var stopwatch = Stopwatch.StartNew();

			arg.MethodExecutionTag = (Logger: logger, Stopwatch: stopwatch);

			if (LogArguments)
			{
				logger?.LogInformation(
					FormatMessage("Entering {Method} of {Type} with arguments {@Arguments}"),
					PrependMessage(arg.Method.Name, GetTypeName(arg), arg.Arguments.ToArray()));
			}
			else
			{
				logger?.LogInformation(
					 FormatMessage("Entering {Method} of {Type}"),
					 PrependMessage(arg.Method.Name, GetTypeName(arg)));
			}

			base.OnEntry(arg);
		}
		catch (Exception ex)
		{
			Trace.TraceError(
				$"TraceAttribute OnEntry critical error: {ex.Message}");
		}
	}

	public override void OnExit(MethodExecutionArgs arg)
	{
		try
		{
			var (logger, stopwatch) = GetState(arg);

			stopwatch?.Stop();

			if (LogReturnValue)
			{
				logger?.LogInformation(
					FormatMessage("Exiting {Method} of {Type} with return value {@ReturnValue}. Execution time: {ElapsedMilliseconds}ms"),
					PrependMessage(arg.Method.Name, GetTypeName(arg), arg.ReturnValue, stopwatch?.ElapsedMilliseconds));
			}
			else
			{
				logger?.LogInformation(
					FormatMessage("Exiting {Method} of {Type}. Execution time: {ElapsedMilliseconds}ms"),
					PrependMessage(arg.Method.Name, GetTypeName(arg), stopwatch?.ElapsedMilliseconds));
			}

			base.OnExit(arg);
		}
		catch (Exception ex)
		{
			Trace.TraceError(
				$"TraceAttribute OnExit critical error: {ex.Message}");
		}
	}

	public override void OnException(MethodExecutionArgs arg)
	{
		try
		{
			arg.FlowBehavior = FlowBehavior.RethrowException;

			var (logger, stopwatch) = GetState(arg);

			stopwatch?.Stop();

			logger?.LogError(arg.Exception,
				FormatMessage("Exception in {Method} of {Type}. Execution time: {ElapsedMilliseconds}ms"),
				PrependMessage(arg.Method.Name, GetTypeName(arg), stopwatch?.ElapsedMilliseconds));

			base.OnException(arg);
		}
		catch (Exception ex)
		{
			Trace.TraceError(
				$"TraceAttribute OnException critical error: {ex.Message}");
		}
	}

	private static (ILogger?, Stopwatch?) GetState(MethodExecutionArgs arg)
	{
		var state = arg.MethodExecutionTag as (ILogger?, Stopwatch?)?;
		return state ?? (null, null);
	}

	private string FormatMessage(string baseMessage)
	{
		return string.IsNullOrEmpty(Message)
			? baseMessage
			: "{Message} - " + baseMessage;
	}

	private object?[] PrependMessage(params object?[] args)
	{
		return string.IsNullOrEmpty(Message)
			? args
			: [(object)Message, .. args];
	}

	private static string GetTypeName(MethodExecutionArgs arg)
	{
		return arg.Instance?.GetType().Name
			?? arg.Method.DeclaringType?.Name
			?? "Unknown";
	}

	private static readonly BindingFlags flags = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic;

	private static ILogger? GetLogger(object instance)
	{
		if (instance == null) return null;
		try
		{
			var type = instance.GetType();

			if (!LoggerMembersCache.TryGetValue(type, out var member))
			{
				var field = type.GetFields(flags)
								.FirstOrDefault(f => typeof(ILogger).IsAssignableFrom(f.FieldType));
				if (field != null)
				{
					member = field;
				}
				else
				{
					var prop = type.GetProperties(flags)
								   .FirstOrDefault(p => typeof(ILogger).IsAssignableFrom(p.PropertyType));
					if (prop != null)
					{
						member = prop;
					}
				}

				LoggerMembersCache[type] = member;
			}

			if (member != null)
			{
				return member switch
				{
					FieldInfo f => f.GetValue(instance) as ILogger,
					PropertyInfo p => p.GetValue(instance) as ILogger,
					_ => null
				};
			}

			return LoggerProvider.LoggerFactory?.CreateLogger(instance.GetType());
		}
		catch (Exception ex)
		{
			Trace.TraceError(
				$"TraceAttribute GetLogger critical error: {ex.Message}");
			return null;
		}
	}
}
#pragma warning restore CA1873 // Avoid potentially expensive logging
#pragma warning restore CA2254 // Template should be a static expression
