var builder = DistributedApplication.CreateBuilder(args);

var db = builder.AddConnectionString("Database");
var cache = builder.AddConnectionString("cache");

// Các Dummy resource để hiển thị các dịch vụ từ Docker Compose lên Aspire Dashboard
var pgadminUi = builder.AddExecutable("pgadmin", "sleep", ".", "infinity")
    .WithHttpEndpoint(port: 5050, name: "ui", isProxied: false);

var postgresUi = builder.AddExecutable("postgres", "sleep", ".", "infinity")
    .WithEndpoint(port: 5434, name: "tcp", scheme: "tcp", isProxied: false);

var redisUi = builder.AddExecutable("redis", "sleep", ".", "infinity")
    .WithEndpoint(port: 6379, name: "tcp", scheme: "tcp", isProxied: false);

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
