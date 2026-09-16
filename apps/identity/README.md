# EzShop Identity Service

The central authentication and authorization service for the **EzShop** distributed e-commerce application. Built with **.NET 10**, this service acts as an OAuth2/OpenID Connect (OIDC) provider using **OpenIddict** and **ASP.NET Identity**.

## Technology Stack

- **Framework**: .NET 10 / ASP.NET Core
- **Database**: PostgreSQL (via Npgsql)
- **ORM**: Entity Framework Core 9
- **Identity Provider**: OpenIddict 6.4 (OAuth2/OIDC) & ASP.NET Identity
- **Architecture Patterns**: 
  - Clean Architecture (Domain, Application, Infrastructure, WebHost)
  - CQRS with WolverineFx
- **Logging & Tracing**: Serilog + OpenTelemetry
- **Testing**: xUnit + Coverlet

## Project Structure

The solution (`EzShop.Identity.slnx`) follows a Clean Architecture approach:

```text
src/
├── EzShop.Identity.Domain/         # Core domain entities, exceptions, and abstractions
├── EzShop.Identity.Application/    # Use cases, CQRS commands/queries (WolverineFx), validators
├── EzShop.Identity.Infrastructure/ # EF Core DbContext, ASP.NET Identity, and OpenIddict integration
└── EzShop.Identity.WebHost/        # API entry point, endpoint routing, and startup configurations
```

### Key Components

- **`EzShop.Identity.Domain`**: Contains the core business entities. It references its own `EzShop.Identity.Contract` to share base abstractions.
- **`EzShop.Identity.Application`**: Business logic using **WolverineFx** for message routing (Commands/Queries) and `FluentValidation` for validation.
- **`EzShop.Identity.Infrastructure`**: Implements the persistence layer with EF Core, and wires up ASP.NET Core Identity stores alongside OpenIddict stores.
- **`EzShop.Identity.WebHost`**: Uses a centralized `Startup.Run(args)` pattern (via `EzShop.Contract`). It exposes the standard OAuth2/OIDC endpoints (Authorize, Token, Logout, UserInfo) and custom account management endpoints.

## Development

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Aspire Workload](https://learn.microsoft.com/en-us/dotnet/aspire/) (for orchestration)

### Running the Application

This service is orchestrated via **.NET Aspire**. Run the full application from the Aspire AppHost to ensure all dependencies (PostgreSQL, Redis) are available:

```bash
cd ../../aspire
aspire start
```

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

