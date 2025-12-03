using EzShop.Contract.ModuleRegister;

namespace EzShop.AppHost;

public class ModuleRegister : IModule
{
	public string Name => "";

    public string[] ModuleSettingFiles => ["appsettings.json"];

	public void ConfigureServices(WebApplicationBuilder builder)
    {

	}
}
