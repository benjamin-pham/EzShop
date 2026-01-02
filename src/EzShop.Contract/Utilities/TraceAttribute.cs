using MethodBoundaryAspect.Fody.Attributes;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Reflection;

namespace EzShop.Contract.Utilities;

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class,
	AllowMultiple = false,
	Inherited = false)]
public class TraceAttribute : OnMethodBoundaryAspect
{
	private string _message;

	private static readonly ConcurrentDictionary<Type, MemberInfo?> LoggerMembersCache = new();

	public bool LogArguments { get; set; } = true;

	public bool LogReturnValue { get; set; } = true;

	public TraceAttribute(string message = "")
	{
		_message = message;
	}

	public override void OnEntry(MethodExecutionArgs arg)
	{
		var logger = GetLogger(arg.Instance);
		try
		{
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
			System.Diagnostics.Trace.TraceError(
				$"TraceAttribute critical error: {ex.Message}");
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
			System.Diagnostics.Trace.TraceError(
				$"TraceAttribute critical error: {ex.Message}");
		}
	}

	public override void OnException(MethodExecutionArgs arg)
	{
		arg.FlowBehavior = FlowBehavior.RethrowException;

		try
		{
			var (logger, stopwatch) = GetState(arg);

			stopwatch?.Stop();

			logger?.LogError(arg.Exception,
				FormatMessage("Exception in {Method} of {Type}. Execution time: {ElapsedMilliseconds}ms"),
				PrependMessage(arg.Method.Name, GetTypeName(arg), stopwatch?.ElapsedMilliseconds));			

			base.OnException(arg);
		}
		catch (Exception ex)
		{
			System.Diagnostics.Trace.TraceError(
				$"TraceAttribute critical error: {ex.Message}");
		}
	}
	private (ILogger?, Stopwatch?) GetState(MethodExecutionArgs arg)
	{
		var state = arg.MethodExecutionTag as (ILogger?, Stopwatch?)?;
		return state ?? (null, null);
	}

	private string FormatMessage(string baseMessage)
	{
		return string.IsNullOrEmpty(_message)
			? baseMessage
			: "{Message} - " + baseMessage;
	}

	private object?[] PrependMessage(params object?[] args)
	{
		return string.IsNullOrEmpty(_message)
			? args
			: new[] { (object)_message }.Concat(args).ToArray();
	}

	private string GetTypeName(MethodExecutionArgs arg)
	{
		return arg.Instance?.GetType().Name
			?? arg.Method.DeclaringType?.Name
			?? "Unknown";
	}

	private static ILogger? GetLogger(object instance)
	{
		if (instance == null) return null;
		try
		{
			var type = instance.GetType();

			// Lấy member từ cache hoặc tìm bằng reflection
			if (!LoggerMembersCache.TryGetValue(type, out var member))
			{
				// Tìm field nào có type ILogger hoặc ILogger<T>
				var field = type.GetFields(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic)
								.FirstOrDefault(f => typeof(ILogger).IsAssignableFrom(f.FieldType));
				if (field != null)
				{
					member = field;
				}
				else
				{
					// Tìm property nào có type ILogger hoặc ILogger<T>
					var prop = type.GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic)
								   .FirstOrDefault(p => typeof(ILogger).IsAssignableFrom(p.PropertyType));
					if (prop != null)
					{
						member = prop;
					}
				}

				LoggerMembersCache[type] = member;
			}

			// Lấy giá trị member nếu có
			if (member != null)
			{
				return member switch
				{
					FieldInfo f => f.GetValue(instance) as ILogger,
					PropertyInfo p => p.GetValue(instance) as ILogger,
					_ => null
				};
			}

			// Fallback LoggerFactory
			return LoggerProvider.LoggerFactory?.CreateLogger(instance.GetType());
		}
		catch
		{
			return null;
		}
	}
}