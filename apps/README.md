# EzShop Applications

This directory contains the individual services, frontends, and microservices that compose the distributed **EzShop** application.

While each application has its own distinct architecture and technology stack, they are designed to work together and are orchestrated centrally via **.NET Aspire**.

## Applications Overview

### Backend Services

*   **[`core-api`](./core-api/)**
    The main backend business API built with .NET 10. It uses a **Modular Monolith** architecture where features are developed as independent modules (`EzShop.Contract`, `EzShop.WebHost`, and various feature modules). It utilizes CQRS with MediatR and Entity Framework Core for persistence.
    [View core-api README](./core-api/README.md)

*   **[`identity`](./identity/)**
    The central authentication and authorization service. Built with .NET 10, it acts as an OAuth2/OpenID Connect (OIDC) provider using **OpenIddict** and **ASP.NET Identity**. It follows Clean Architecture and uses WolverineFx for CQRS.
    [View identity README](./identity/README.md)

### Frontend Applications

*   **[`storefront-admin-web`](./storefront-admin-web/)**
    The back-office admin panel for managing the store. Built with **React 19**, **TypeScript**, and **Vite**.
    [View admin web README](./storefront-admin-web/README.md)

*   **[`storefront-web`](./storefront-web/)**
    The customer-facing storefront application (currently a placeholder).
    [View storefront web README](./storefront-web/README.md)

## Running the Applications

Although these applications exist in separate folders, they are designed to be run together using the **.NET Aspire** orchestrator. 

**Do not run these projects individually** using `dotnet run` or `npm run dev` unless you are specifically working on UI isolation or unit testing.

To start the full distributed system, navigate to the root `aspire` directory and start the AppHost:

```bash
cd ../aspire
aspire start
```

This will automatically start PostgreSQL, Redis, the APIs, and the frontend applications, resolving all cross-service dependencies and injecting the correct environment variables.

## Shared Dependencies

For .NET projects, dependencies and build properties are managed at the folder level using `Directory.Packages.props` and `Directory.Build.props` to ensure consistency across microservices while maintaining separation between different architectural domains (e.g., `core-api` vs `identity`).

