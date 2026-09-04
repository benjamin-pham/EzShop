using System.Reflection;
using EzShop.Contract.Abstractions;

namespace EzShop.Testing.Shared.Architecture.Infrastructure;

public abstract class BaseTest
{
    // The base abstractions live in EzShop.Contract.
    protected static Assembly ContractAssembly => typeof(Entity).Assembly;

    // The WebHost assembly
    protected static Assembly WebHostAssembly => typeof(Program).Assembly;

    protected const string ContractNamespace = "EzShop.Contract";
    protected const string WebHostNamespace = "EzShop.WebHost";
    protected const string ModulesNamespace = "EzShop.Module";
}
