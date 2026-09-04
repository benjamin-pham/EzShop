# EzShop AI Agent Customization

This document helps AI coding agents navigate the EzShop distributed e-commerce application and be immediately productive.

## Project Overview

**EzShop** is a modern distributed .NET 10 application using **Aspire 13.5.3** for cloud-native orchestration. It features a modular backend, React frontend, Redis caching, and PostgreSQL database.

### Technology Stack
- **Runtime**: .NET 10
- **Orchestration**: Aspire 13.5.3
- **Backend**: ASP.NET Core with modular architecture
- **ORM**: Entity Framework Core 9 + PostgreSQL
- **Auth**: OpenIddict 6.4
- **Patterns**: MediatR for CQRS
- **Logging**: Serilog with Elastic sink
- **Frontend**: React 19 + TypeScript + Vite
- **Testing**: xUnit + Coverlet

## Directory Structure

```
EzShop/
├── aspire/                    # Aspire AppHost orchestration
│   ├── EzShop.AppHost/       # Main orchestrator (Redis, API, Admin frontend)
│   ├── aspire.config.json    # Aspire configuration
│   └── EzShop.slnx           # Aspire solution
├── backend/                   # .NET backend services
│   ├── src/
│   │   ├── EzShop.Contract/  # Shared abstractions & module registration
│   │   ├── EzShop.WebHost/   # Main API service
│   │   └── Modules/          # Feature modules (empty - ready for expansion)
│   ├── Directory.Build.props # Project settings (net10.0, nullable, errors as warnings)
│   └── Directory.Packages.props # Centralized dependency versions
├── frontend/
│   ├── storefront-admin/     # Admin panel (React + Vite)
│   └── storefront/           # Customer storefront (placeholder)
└── .agents/                  # Custom agent skills for Aspire operations
```

## Architecture Patterns

### Modular Design
The backend uses a **modular architecture** with automatic module registration:
- **AggregateRoot**: Base class for domain-driven design entities
- **Entity**: Base class for domain objects with `TKey` type parameter
- **ReadModel**: Query model for read operations
- **ModuleManager**: Discovers and registers modules at runtime
- **IModule**: Interface that modules implement for registration
- **IEndpoint**: Extensible endpoint registration pattern

### CQRS Pattern
Uses **MediatR** for command/query separation:
- Commands for state changes
- Queries for read operations
- Handlers auto-registered during module loading

### Authentication & Authorization
- **OpenIddict 6.4**: OAuth2/OIDC provider
- **ASP.NET Identity**: User management via EntityFrameworkCore

### Database
- **PostgreSQL** via Npgsql EF Core provider (9.0.4)
- **EF Core 9**: Latest version with advanced features
- Migrations managed through EF tooling

## Startup & Development

### AppHost Configuration
Located in [aspire/EzShop.AppHost/AppHost.cs](aspire/EzShop.AppHost/AppHost.cs):
- Defines **Redis** resource for caching
- Defines **api** project (EzShop.WebHost) with health check at `/health`
- Defines **admin-app** (Vite + React frontend) with dependency on API
- All components wait for their dependencies before starting

### Running the Application
The Aspire AppHost orchestrates all services. Start via:
```bash
aspire start
```
This starts Redis, the API, and the admin frontend together. Use the Aspire dashboard to monitor all services.

### Key Endpoints
- **API Health**: `http://localhost:<port>/health`
- **OpenAPI/Swagger**: `http://localhost:<port>/swagger`
- **Admin App**: `http://localhost:<port>` (via Aspire)

## Backend Development

### Project Layout
- **EzShop.Contract**: Shared abstractions, module interfaces, startup helpers
  - `Abstractions/`: Domain entities (AggregateRoot, Entity, ReadModel)
  - `ModuleRegister/`: Module loading infrastructure
- **EzShop.WebHost**: Main API application
  - `Program.cs`: Calls `Startup.Run(args)` for centralized setup
  - `ModuleRegister.cs`: Module discovery and registration
- **Modules/**: Feature modules (currently empty, ready for expansion)

### Adding a New Feature Module
1. Create a new project in `backend/src/Modules/YourModule/`
2. Implement `IModule` from EzShop.Contract
3. Register endpoints via `IEndpoint` implementations
4. Module will be auto-discovered and loaded by ModuleManager
5. Add MediatR handlers for your business logic

### Startup Pattern
- **Centralized Startup**: [backend/src/EzShop.Contract/Startup.cs](backend/src/EzShop.Contract/Startup.cs) encapsulates service registration
- All middleware (logging, health checks) configured via ServiceCollectionExtensions
- LogContextTraceLoggingMiddleware for distributed tracing

### Logging
- Uses **Serilog.AspNetCore** with ElasticSearch sink
- Structured logging with trace context
- Configuration in [backend/src/EzShop.WebHost/appsettings.*.json](backend/src/EzShop.WebHost/appsettings.Development.json)

## Frontend Development

### Admin Application
Located in [frontend/storefront-admin/](frontend/storefront-admin/):
- **Build tool**: Vite (fast development + optimized builds)
- **Framework**: React 19.2 + TypeScript 6.0
- **Package manager**: npm
- **ESLint**: Configured with React rules and TypeScript support

### Development Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build (runs TypeScript check first)
npm run lint     # Check code quality
npm run preview  # Preview production build
```

### Integration with Backend
- Admin app is orchestrated by Aspire
- Configured in AppHost to reference the `api` service
- Will wait for API to be healthy before starting

### Storefront
Currently a placeholder in [frontend/storefront/](frontend/storefront/) for customer-facing UI.

## Code Quality & Standards

### C# Conventions
- **Nullable Reference Types**: Required (`<Nullable>enable</Nullable>`)
- **Implicit Usings**: Enabled (`<ImplicitUsings>enable</ImplicitUsings>`)
- **Warnings as Errors**: Strict mode enabled (`<TreatWarningsAsErrors>true</TreatWarningsAsErrors>`)
- Target: **.NET 10**

### TypeScript Conventions
- Strict TypeScript checking
- ESLint with React/hooks rules
- Vite bundler with React plugin

### Testing
- Framework: **xUnit**
- Coverage: **Coverlet**
- Convention: Test projects at `*.Tests` naming

## Common Development Tasks

### Run the Full App
```bash
aspire start
```

### Build Everything
```bash
# Backend
dotnet build backend/EzShop.slnx

# Frontend
cd frontend/storefront-admin && npm install && npm run build
```

### Add a Backend Dependency
Edit [backend/Directory.Packages.props](backend/Directory.Packages.props) to update centralized versions, then reference in .csproj:
```xml
<PackageReference Include="PackageName" />
```

### Debug Backend
- Backend projects support hot reload via `dotnet watch`
- Set breakpoints in Visual Studio / VS Code
- Aspire CLI provides `aspire logs` for service output

### Debug Frontend
- Vite provides HMR (hot module replacement)
- React DevTools browser extension
- TypeScript provides type checking during development

## Important Notes

### Aspire Integration
- Custom Aspire skills exist in [.agents/skills/aspire*](/.agents/skills/)
- Use the **aspire** skill for orchestration commands
- Dashboard available for real-time monitoring
- Health checks configured for automatic service startup ordering

### Module Registration
- Modules are discovered via reflection at startup
- ModuleManager collects all `IModule` implementations
- Each module can register its own endpoints, services, and handlers
- This enables true vertical-slice architecture

### Build Order
When adding new modules:
1. Add to `backend/src/Modules/`
2. Reference from EzShop.WebHost
3. Module auto-discovered during Startup
4. No manual registration needed beyond implementing IModule

## Related Skills & Documentation

For Aspire-specific operations, specialized skills exist:
- **aspire**: Top-level router for Aspire commands
- **aspire-orchestration**: Start/stop/wait operations
- **aspire-deployment**: Deploy to Docker, Kubernetes, Azure
- **aspire-monitoring**: Logs, traces, health, dashboard
- **aspireify**: Wire the AppHost after init
- **dotnet-inspect**: Find .NET packages and APIs

See [.agents/skills/](/.agents/skills/) for detailed documentation.

## Next Steps for AI Agents

When working in this codebase:
1. **Understand the orchestration**: Review [AppHost.cs](aspire/EzShop.AppHost/AppHost.cs) first
2. **Respect strict compiler settings**: Nullable types and warning-as-errors are intentional
3. **Follow modular patterns**: New features → new modules with IModule
4. **Use MediatR**: Business logic goes in command/query handlers
5. **Coordinate frontend/backend**: Remember admin app depends on API
6. **Check existing abstractions**: AggregateRoot, Entity, ReadModel patterns exist for a reason

This architecture supports:
- ✅ Independent module development
- ✅ Vertical slices (feature → API endpoint + models)
- ✅ Type safety (strict TypeScript + strict C#)
- ✅ Distributed tracing and monitoring
- ✅ Zero-downtime deployment via Aspire
