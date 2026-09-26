var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache")
    .WithDataVolume("ezshop-redis-data")
    .WithRedisCommander();

var postgres = builder.AddPostgres("postgres")
    .WithDataVolume("ezshop-pg-data")
    .WithPgAdmin();

var db = postgres.AddDatabase("Database", databaseName: "ezshop");

var elasticsearch = builder.AddElasticsearch("elasticsearch")
    .WithDataVolume("ezshop-elastic-data")
    .WithEndpoint(port: 9222, targetPort: 9200, name: "http");

var kibana = builder.AddContainer("kibana", "docker.elastic.co/kibana/kibana", "8.15.0") // Dùng chung version với Elasticsearch nếu cần
    .WithEnvironment("ELASTICSEARCH_HOSTS", elasticsearch.GetEndpoint("http"))
    .WithHttpEndpoint(port: 5601, targetPort: 5601, name: "ui");

var identity = builder.AddProject("identity", "../apps/identity/src/EzShop.Identity.WebHost/EzShop.Identity.WebHost.csproj")
    .WithReference(db)
    .WaitFor(db)
    .WithReference(cache)
    .WaitFor(cache)
    .WithReference(elasticsearch)
    .WaitFor(elasticsearch)
    .WithEnvironment("Serilog__WriteTo__1__Args__nodes__0", elasticsearch.GetEndpoint("http"))
    // .WithEnvironment("Serilog__WriteTo__1__Args__apiKey", builder.AddParameter("identity-elastic-api-key", secret: true))
    .WithEnvironment("Serilog__WriteTo__1__Args__dataStream", "logs-ezshop-identity")
    .WithEnvironment("Serilog__WriteTo__1__Args__bootstrapMethod", "Silent")
    .WithExternalHttpEndpoints();

var coreApi = builder.AddProject("core-api", "../apps/core-api/src/EzShop.WebHost/EzShop.WebHost.csproj")
    .WithReference(db)
    .WaitFor(db)
    .WithReference(cache)
    .WaitFor(cache)
    .WithReference(elasticsearch)
    .WaitFor(elasticsearch)
    .WithEnvironment("Serilog__WriteTo__1__Args__nodes__0", elasticsearch.GetEndpoint("http"))
    // .WithEnvironment("Serilog__WriteTo__1__Args__apiKey", builder.AddParameter("coreapi-elastic-api-key", secret: true))
    .WithEnvironment("Serilog__WriteTo__1__Args__dataStream", "logs-ezshop-coreapi")
    .WithEnvironment("Serilog__WriteTo__1__Args__bootstrapMethod", "Silent")
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
