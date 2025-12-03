using EzShop.Contract.Infrastructure.Database;
using EzShop.Contract.ModuleRegister;
using EzShop.Contract.Utilities.Attributes;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace EzShop.Contract;

internal static class ServiceCollectionExtensions
{
	public static IServiceCollection AddWithAttributes(this IServiceCollection services, ModuleManager moduleManager)
	{
		var types = moduleManager.AppModules.SelectMany(m => m.AssemblyTypes)
			.Where(t => t.IsClass
					 && !t.IsAbstract
					 && t.GetCustomAttribute<ServiceRegisterAttribute>() != null);

		foreach (var type in types)
		{
			var attr = type.GetCustomAttribute<ServiceRegisterAttribute>();

			var allInterfaces = type.GetInterfaces();

			var serviceTypes = allInterfaces
				.Where(i => !allInterfaces.Any(other => other != i && other.GetInterfaces().Contains(i)))
				.ToArray();

			if (serviceTypes.Length == 0)
			{
				serviceTypes = [type];
			}

			foreach (var serviceType in serviceTypes)
			{
				services.Add(new ServiceDescriptor(serviceType, type, attr!.Lifetime));
			}
		}

		return services;
	}
	public static IServiceCollection AddApplicationDbContexts(
	this IServiceCollection services,
	IConfiguration configuration,
	ModuleManager moduleManager)
	{
		var allDbContextTypes = moduleManager.AppModules
			.SelectMany(m => m.AssemblyTypes)
			.Where(t => !t.IsAbstract && !t.IsGenericTypeDefinition)
			.Where(t => t.BaseType is { IsGenericType: true } &&
						t.BaseType.GetGenericTypeDefinition() == typeof(ApplicationDbContext<>))
			.ToList();

		foreach (var module in moduleManager.AppModules)
		{
			var dbContextTypes = allDbContextTypes.Where(t => t.Assembly == module.Assembly)
				.ToList();

			foreach (var dbContextType in dbContextTypes)
			{
				var addDbContextMethod = typeof(EntityFrameworkServiceCollectionExtensions)
					.GetMethods(BindingFlags.Public | BindingFlags.Static)
					.First(m => m.Name == nameof(EntityFrameworkServiceCollectionExtensions.AddDbContext)
								&& m.IsGenericMethodDefinition
								&& m.GetParameters().Any(p =>
									p.ParameterType == typeof(Action<IServiceProvider, DbContextOptionsBuilder>)));

				var genericMethod = addDbContextMethod.MakeGenericMethod(dbContextType);

				genericMethod.Invoke(null, [services, Postgres.StandardOptions(configuration), null, null]);

				services.AddScoped(dbContextType, sp =>
				{
					var options = sp.GetRequiredService(
						typeof(DbContextOptions<>).MakeGenericType(dbContextType));

					return Activator.CreateInstance(dbContextType, options, module.Instance.Name)!;
				});
			}
		}

		return services;
	}
}
