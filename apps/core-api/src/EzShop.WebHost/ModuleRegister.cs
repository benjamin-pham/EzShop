using EzShop.Contract.ModuleRegister;

namespace EzShop.WebHost;

public class ModuleRegister : IModule
{
    public string Name => "";

    public string[] ModuleSettingFiles => ["appsettings.json"];

    public void ConfigureServices(WebApplicationBuilder builder)
    {

    }
}
