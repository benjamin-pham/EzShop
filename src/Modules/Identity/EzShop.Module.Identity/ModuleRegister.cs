using EzShop.Contract.ModuleRegister;

namespace EzShop.Module.Identity;

public class ModuleRegister : IModule
{
	public string Name => "identity";

	public string[] ModuleSettingFiles => ["appsettings.Identity.json"];

	public void ConfigureServices(WebApplicationBuilder builder)
	{

	}
}