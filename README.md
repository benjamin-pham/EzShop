# EzShop

A modern distributed e-commerce application built with **.NET 10** and **Aspire 13.5.3** for cloud-native orchestration.

## 🎯 Overview

EzShop is a modular e-commerce platform featuring:
- **Distributed Architecture**: Microservices-ready with Aspire orchestration
- **Modular Backend**: Vertical-slice architecture with automatic module discovery
- **React Frontend**: Modern admin panel and storefront with TypeScript
- **Cloud-Native**: Built on .NET Aspire for seamless deployment to Docker, Kubernetes, and Azure
- **Type-Safe**: Strict C# and TypeScript configurations ensure code quality

## 🚀 Quick Start

### Prerequisites
- **.NET 10 SDK**
- **Node.js 18+** (for frontend development)
- **Docker** (optional, for containerized deployment)

### Running the Application

```bash
# Start the full Aspire application (Redis, API, Admin Frontend)
aspire start
```

This will:
1. Start Redis for caching
2. Launch the .NET API with health checks
3. Start the React admin panel
4. Open the Aspire Dashboard for monitoring

The application will be available at the URLs shown in the dashboard.

### Individual Component Development

**Backend API**
```bash
cd backend
dotnet run --project src/EzShop.WebHost/EzShop.WebHost.csproj
```

**Admin Frontend**
```bash
cd frontend/storefront-admin
npm install
npm run dev
```

## 📁 Project Structure

```
EzShop/
├── aspire/                           # Aspire AppHost orchestration
│   ├── EzShop.AppHost/              # Main orchestrator
│   ├── aspire.config.json           # Aspire configuration
│   └── EzShop.slnx                  # Aspire solution file
├── backend/                          # .NET backend services
│   ├── src/
│   │   ├── EzShop.Contract/         # Shared abstractions & interfaces
│   │   ├── EzShop.WebHost/          # Main API application
│   │   └── Modules/                 # Feature modules (ready for expansion)
│   ├── Directory.Build.props        # Global C# configuration
│   └── Directory.Packages.props     # Centralized dependency versions
├── frontend/
│   ├── storefront-admin/            # Admin panel (React + Vite + TypeScript)
│   └── storefront/                  # Customer storefront (placeholder)
└── AGENTS.md                        # AI agent customization guide
```

## 🏗️ Architecture

### Backend Patterns

**Modular Architecture**
- Features organized into vertical slices
- `IModule` interface for automatic registration
- ModuleManager discovers and loads modules at startup
- Each module can register endpoints, services, and handlers

**CQRS + MediatR**
- Commands for write operations
- Queries for read operations
- Auto-registered request handlers

**Domain-Driven Design**
- `AggregateRoot`: Base class for domain entities
- `Entity`: Base class for domain objects
- `ReadModel`: Query models for read operations

**Database**
- **PostgreSQL** for primary data storage
- **Entity Framework Core 9** with migrations
- **Redis** for caching

### Frontend Stack

**Admin Panel**
- React 19 + TypeScript 6.0
- Vite build tool for fast development
- ESLint for code quality
- Responsive design ready

**Development Commands**
```bash
npm run dev      # Start development server with HMR
npm run build    # Production build
npm run lint     # Check code quality
npm run preview  # Preview production build
```

## 🔧 Development

### Adding a New Feature Module

1. Create a new project in `backend/src/Modules/YourModule/`
2. Implement `IModule` from `EzShop.Contract`
3. Register endpoints via `IEndpoint` implementations
4. Module auto-discovered and loaded at startup

Example structure:
```
Modules/YourModule/
├── Endpoints/
│   └── GetYourResourceEndpoint.cs
├── Models/
│   ├── YourRequest.cs
│   └── YourResponse.cs
├── Commands/
│   └── CreateYourResourceCommand.cs
├── Queries/
│   └── GetYourResourceQuery.cs
├── Handlers/
│   ├── CreateYourResourceHandler.cs
│   └── GetYourResourceHandler.cs
└── Module.cs (implements IModule)
```

### Code Quality Standards

**C# (.NET)**
- Nullable reference types required
- Implicit usings enabled
- Warnings treated as errors
- Target: .NET 10

**TypeScript (Frontend)**
- Strict type checking
- ESLint with React/hooks rules
- Vite for bundling

**Testing**
- Framework: xUnit
- Coverage: Coverlet
- Convention: `*.Tests` project naming

### Building Everything

```bash
# Backend
dotnet build backend/EzShop.slnx

# Frontend
cd frontend/storefront-admin && npm install && npm run build
```

### Adding Backend Dependencies

Edit `backend/Directory.Packages.props` for centralized version management, then reference in `.csproj`:

```xml
<PackageReference Include="NewPackage" />
```

## 🔐 Key Configuration

### API Endpoints

- **Health Check**: `GET /health`
- **Swagger/OpenAPI**: `GET /swagger`
- **API Prefix**: Modules auto-register with `/api/[module-name]` prefix

### Authentication & Authorization

- **OpenIddict 6.4** for OAuth2/OIDC
- **ASP.NET Identity** for user management
- Entity Framework Core integration

### Service Configuration

Application startup is centralized in `backend/src/EzShop.Contract/Startup.cs`:
- Service registration
- Middleware configuration
- Logging setup with Serilog
- Health checks

## 📊 Monitoring & Debugging

### Aspire Dashboard

Run the full app and access the dashboard to:
- Monitor all services (Redis, API, Frontend)
- View logs in real-time
- Check health status
- Explore traces and metrics

### Logging

Structured logging via **Serilog** with:
- Elastic sink for production
- Console output for development
- Distributed trace context (TraceId, SpanId)
- Configurable via `appsettings.*.json`

### Debugging Backend

- Hot reload supported via `dotnet watch`
- Set breakpoints in VS Code / Visual Studio
- Use Aspire CLI for service logs: `aspire logs [service-name]`

### Debugging Frontend

- Vite provides Hot Module Replacement (HMR)
- React DevTools browser extension
- TypeScript provides compile-time checking

## 📚 Documentation

- **AGENTS.md**: Detailed guide for AI agents working in this codebase
- **aspire/README.md**: Aspire-specific documentation
- **backend/README.md**: Backend development guide
- **frontend/storefront-admin/README.md**: Frontend development guide

## 🤝 Contributing

1. Create a feature branch from `main`
2. Follow the modular architecture for new features
3. Ensure all tests pass: `dotnet test`
4. Run linting: `npm run lint` (frontend), `dotnet format` (backend)
5. Commit with clear messages
6. Open a pull request

## ⚙️ Technology Stack

### Backend
- **.NET 10**: Modern runtime
- **Aspire 13.5.3**: Cloud-native orchestration
- **ASP.NET Core**: Web framework
- **Entity Framework Core 9**: ORM
- **PostgreSQL**: Primary database
- **Redis**: Caching layer
- **OpenIddict 6.4**: OAuth2/OIDC
- **MediatR**: CQRS pattern
- **Serilog**: Structured logging
- **xUnit**: Testing framework

### Frontend
- **React 19**: UI framework
- **TypeScript 6.0**: Type safety
- **Vite**: Build tool
- **ESLint**: Code quality

### Infrastructure
- **Docker**: Containerization
- **Kubernetes**: Orchestration (via Aspire deployment)
- **Azure**: Cloud hosting

## 📝 License

[Add your license here]

## 💬 Support

For questions or issues:
1. Check the documentation in each subdirectory's README
2. Review AGENTS.md for architecture and patterns
3. Consult the Aspire skills in `.agents/skills/` for orchestration help

---

**Last Updated**: August 31, 2026  
**Version**: 1.0.0
