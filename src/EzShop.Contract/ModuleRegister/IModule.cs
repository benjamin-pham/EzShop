using Microsoft.AspNetCore.Builder;

namespace EzShop.Contract.ModuleRegister;

public interface IModule
{
    string Name { get; }
    string[] ModuleSettingFiles { get; }
    void ConfigureServices(WebApplicationBuilder builder);
}