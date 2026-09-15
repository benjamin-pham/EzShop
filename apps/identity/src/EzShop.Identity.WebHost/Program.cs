using EzShop.Contract;
using EzShop.Contract.ModuleRegister;
using EzShop.Identity.Infrastructure;
using Microsoft.AspNetCore.Builder;

Startup.Run(args);

namespace EzShop.Identity.WebHost
{
    public partial class Program { }

    public class IdentityAppSetup : IModule
    {
        public string Name => "Identity";

        public string[] ModuleSettingFiles => ["appsettings.identity.json"];

        public void ConfigureServices(WebApplicationBuilder builder)
        {
            builder.AddInfrastructure();
        }
    }
}
