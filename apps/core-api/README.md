# EzShop Core API

The backend for the **EzShop** distributed e-commerce application. Built with **.NET 10** and **ASP.NET Core**, this service uses a highly modular, vertical-slice architecture designed for scalability and maintainability.

## Technology Stack

- **Framework**: .NET 10 / ASP.NET Core
- **Database**: PostgreSQL (via Npgsql)
- **ORM**: Entity Framework Core 9
- **Authentication**: OpenIddict 6.4 (OAuth2/OIDC) & ASP.NET Identity
- **Architecture Patterns**: 
  - Modular Design & Vertical Slices
  - CQRS with MediatR
  - Domain-Driven Design (DDD) principles
- **Logging & Tracing**: Serilog (Elastic sink) + LogContextTraceLoggingMiddleware
- **Testing**: xUnit + Coverlet

## Project Structure

The solution (`EzShop.slnx`) is organized into the following layers:

```
src/
├── EzShop.Contract/  # Shared abstractions, DDD base classes, and ModuleRegister
├── EzShop.WebHost/   # Main API entry point, App startup, OpenIddict setup
└── Modules/          # Feature modules (vertical slices)
```

### Key Components

- **`EzShop.Contract`**: Contains shared abstractions such as `AggregateRoot`, `Entity`, `ReadModel`, and the module registration infrastructure (`IModule`, `IEndpoint`, `ModuleManager`).
- **`EzShop.WebHost`**: The main host for the API. It leverages a centralized `Startup.Run(args)` pattern from the Contract project to bootstrap the application, configure middleware, and auto-discover modules.
- **`Modules/*`**: The home for new feature implementations. Modules are discovered and registered automatically at runtime.

## Development

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Aspire Workload](https://learn.microsoft.com/en-us/dotnet/aspire/) (for orchestration)

### Running the Application

This API is orchestrated via **.NET Aspire**. While you can run the `EzShop.WebHost` directly, it is recommended to run the full application from the Aspire AppHost to ensure all dependencies (like Redis and PostgreSQL) are available:

```bash
cd ../../aspire
aspire start
```

### Adding a New Feature Module

The system relies on automatic module discovery to encourage a decoupled, vertical-slice architecture. To add a new feature:

1. Create a new .NET class library in `src/Modules/YourFeatureName/`.
2. Implement the `IModule` interface (from `EzShop.Contract`) to register your services.
3. Implement `IEndpoint` for your REST endpoints to have them automatically mapped.
4. Add your MediatR commands, queries, and handlers for business logic.
5. Add a project reference to your new module in `EzShop.WebHost`.
6. **No manual registration needed** – the `ModuleManager` will automatically discover and load your module during startup!

### Coding Conventions & Strict Mode

- **Nullable Reference Types** are enabled and strictly enforced.
- **Warnings as Errors** (`<TreatWarningsAsErrors>true</TreatWarningsAsErrors>`) is enabled to maintain high code quality.
- **Implicit Usings** are active.

### Managing Dependencies

Dependencies are managed centrally via `Directory.Packages.props`. To add or update a NuGet package, modify the version in this file, and reference it in your `.csproj` without a version number:

```xml
<PackageReference Include="PackageName" />
```

## Testing

Test projects follow the `*.Tests` naming convention. To run the tests:

```bash
dotnet test
```

