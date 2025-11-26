using EzShop.Contract.ModuleRegister;

namespace EzShop.Module.Catalog;

public class ModuleRegister : IModule
{
    public string Name => "catalog";

    public string[] ModuleSettingFiles => ["appsettings.Catalog.json"];

    public void ConfigureServices(WebApplicationBuilder builder)
    {

    }
}
