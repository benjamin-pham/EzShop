var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache");

var webhost = builder.AddProject("core-api", "../apps/core-api/src/EzShop.WebHost/EzShop.WebHost.csproj")
    .WithReference(cache)
    .WaitFor(cache)
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var identity = builder.AddProject("identity", "../apps/identity/src/EzShop.Identity.WebHost/EzShop.Identity.WebHost.csproj")
    .WithReference(cache)
    .WaitFor(cache)
    .WithExternalHttpEndpoints();

var storefrontAdmin = builder.AddViteApp("storefront-admin-web", "../apps/storefront-admin-web")
    .WithReference(webhost)
    .WaitFor(webhost);

builder.Build().Run();
