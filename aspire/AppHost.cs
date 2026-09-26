var builder = DistributedApplication.CreateBuilder(args);

var db = builder.AddConnectionString("Database");
var cache = builder.AddConnectionString("cache");

// Dummy resource để hiển thị link PgAdmin đang chạy trên Docker lên Aspire Dashboard
var pgadminUi = builder.AddExecutable("pgadmin", "sleep", ".", "infinity")
    .WithHttpEndpoint(port: 5050, name: "ui", isProxied: false);

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
