var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache");

var webhost = builder.AddProject<Projects.EzShop_WebHost>("api")
    .WithReference(cache)
    .WaitFor(cache)
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var storefrontAdmin = builder.AddViteApp("storefront-admin-ui", "../../apps/storefront-admin-ui")
    .WithReference(webhost)
    .WaitFor(webhost);

builder.Build().Run();
