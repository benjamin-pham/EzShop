var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres")
    .WithPgAdmin()
    .WithDataVolume();
var db = postgres.AddDatabase("Database");

var cache = builder.AddRedis("cache");

var identity = builder.AddProject("identity", "../apps/identity/src/EzShop.Identity.WebHost/EzShop.Identity.WebHost.csproj")
    .WithReference(db)
    .WaitFor(db)
    .WithReference(cache)
    .WaitFor(cache)
    .WithExternalHttpEndpoints();

var coreApi = builder.AddProject("core-api", "../apps/core-api/src/EzShop.WebHost/EzShop.WebHost.csproj")
    .WithReference(db)
    .WaitFor(db)
    .WithReference(cache)
    .WaitFor(cache)
    .WithReference(identity)
    .WaitFor(identity)
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var storefrontAdmin = builder.AddViteApp("storefront-admin-web", "../apps/storefront-admin-web")
    .WithReference(coreApi)
    .WaitFor(coreApi)
    .WithReference(identity)
    .WaitFor(identity);

builder.Build().Run();
