# Contributing to EzShop

Thanks for your interest in contributing to **EzShop**, a modern distributed e-commerce application built with .NET 10, Aspire, and React. 

A few conventions before you open a Pull Request:

## License & Attribution

EzShop is licensed under the **Apache License, Version 2.0**. By contributing, you agree your contribution is licensed under the same terms.

## AI Co-author Attribution

A significant portion of this codebase may be written collaboratively with AI coding assistants. The convention this repo follows: **every commit produced with meaningful AI assistance should end with a Git `Co-Authored-By:` trailer naming the model**.

Example:
```text
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
Co-Authored-By: Gemini 3.1 Pro <gemini-code-assist@google.com>
```

Use an AI address only in the `Co-Authored-By:` trailer; the human accountable for the contribution remains the commit author.

## Signed Commits

Signed commits (`git commit -S` for GPG, or SSH-signed via `git config gpg.format ssh`) are **recommended** and surfaced as `Verified` badges by GitHub.

## Commit Message Style

We follow [Conventional Commits](https://www.conventionalcommits.org/) format — `type(scope): subject`. 
Common types in this repo: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`.

## Verification & Build

EzShop consists of a .NET backend and a React frontend orchestrated by .NET Aspire. Please ensure the following checks pass before submitting your PR:

### 1. Backend (.NET 10)
Run the following commands from the project root:
```bash
# Build the backend solution (strict mode is enabled, warnings are treated as errors)
dotnet build backend/EzShop.slnx

# Run backend tests
dotnet test backend/EzShop.slnx
```

### 2. Frontend (React 19 + Vite)
Run the following commands for the admin frontend:
```bash
cd frontend/storefront-admin
npm install

# Check code quality & TypeScript errors
npm run lint

# Ensure the production build succeeds
npm run build
```

### 3. Orchestration (Aspire 13.5.3)
Ensure the full application can start locally without errors:
```bash
aspire start
```
Check the Aspire dashboard to verify that the Redis container, API service, and Admin app all start and report a "Healthy" status.

## Architecture Guidelines
When contributing, please adhere to the project's architectural standards:
- **Modular Backend:** New features should be added as new modules in `backend/src/Modules/`. Implement the `IModule` interface for automatic runtime discovery.
- **CQRS Pattern:** Use MediatR for commands (state changes) and queries (read operations).
- **Strict Typing:** Both C# (nullable reference types enabled) and TypeScript utilize strict type checking.
- **UI Components:** Do not modify the base UI components located in `frontend/storefront-admin/src/components/ui` unless specifically requested.