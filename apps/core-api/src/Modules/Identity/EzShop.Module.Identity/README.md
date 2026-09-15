# EzShop.Module.Identity

Identity module chuẩn OIDC cho EzShop, xây dựng trên **OpenIddict 6.4** (OIDC server) + **ASP.NET Identity** (user store) + **EF Core / PostgreSQL**, tổ chức theo **Clean Architecture + Vertical Slice**.

Module tuân theo kiến trúc modular của EzShop: implement `IModule` từ `EzShop.Contract`, được `ModuleManager` tự động phát hiện và đăng ký lúc khởi động. Các endpoint `IEndpoint` được map dưới prefix `/api/identity`.

## Cấu trúc

```
EzShop.Module.Identity/
├── IdentityModule.cs                 # Điểm đăng ký module (IModule)
├── appsettings.identity.json         # Seed config (clients, scopes, admin user)
├── Domain/                           # Entities, business concepts
│   ├── ApplicationUser.cs
│   └── ApplicationRole.cs
├── Infrastructure/                   # Persistence + cấu hình kỹ thuật
│   ├── IdentityDbContext.cs          # Schema PostgreSQL "identity" + OpenIddict stores
│   ├── Configuration/
│   │   └── IdentitySeedOptions.cs
│   └── Services/
│       └── IdentityDataSeeder.cs     # Seed scopes/clients/admin lúc startup
└── Features/                         # Vertical slices — mỗi use case một thư mục
    ├── Accounts/
    │   └── Register/
    │       └── RegisterAccountEndpoint.cs
    └── Connect/                      # Nhóm OIDC protocol endpoints
        ├── Authorize/AuthorizeEndpoint.cs
        ├── Token/TokenEndpoint.cs
        ├── UserInfo/UserInfoEndpoint.cs
        ├── Logout/LogoutEndpoint.cs
        └── Shared/ClaimsDestinations.cs   # Logic dùng chung trong nhóm Connect
```

Quy ước thêm use case mới: tạo thư mục `Features/<Nhóm>/<UseCase>/`, đặt endpoint/DTO/handler trong đó; code dùng chung giữa các use case trong cùng nhóm đặt ở `Features/<Nhóm>/Shared/`.

## OIDC endpoints

| Endpoint | Route | Mô tả |
|---|---|---|
| Discovery | `GET /.well-known/openid-configuration` | Metadata OIDC (do middleware OpenIddict phục vụ) |
| JWKS | `GET /.well-known/jwks.json` | Signing keys công khai |
| Authorize | `GET\|POST /api/identity/connect/authorize` | Authorization code flow + PKCE (headless: yêu cầu access token hợp lệ, consent tự động cho first-party client) |
| Token | `POST /api/identity/connect/token` | Grant types: `password`, `client_credentials`, `authorization_code`, `refresh_token` |
| UserInfo | `GET\|POST /api/identity/connect/userinfo` | Claims của user, yêu cầu access token |
| End session | `POST /api/identity/connect/logout` | Đăng xuất + redirect về `post_logout_redirect_uri` |
| Register | `POST /api/identity/account/register` | Đăng ký tài khoản self-service |

## Ví dụ

Password grant:

```bash
curl -X POST http://localhost:<port>/api/identity/connect/token \
  -d "grant_type=password" \
  -d "username=admin@ezshop.local" \
  -d "password=Admin@123" \
  -d "scope=openid profile email roles api"
```

Client credentials:

```bash
curl -X POST http://localhost:<port>/api/identity/connect/token \
  -u "ezshop-service:ezshop-service-secret-dev" \
  -d "grant_type=client_credentials&scope=api"
```

UserInfo:

```bash
curl http://localhost:<port>/api/identity/connect/userinfo \
  -H "Authorization: Bearer <access_token>"
```

## Cấu hình

Module đọc cấu hình từ [appsettings.identity.json](appsettings.identity.json) (section `Identity`) — file được `ModuleLoader` nạp tự động nhờ `ModuleSettingFiles`:

- `AdminUser`: tài khoản admin mặc định được seed lúc startup.
- `Scopes`: OpenIddict scopes (mặc định `api` với resource `api`).
- `Clients`: OIDC clients được seed:
  - `ezshop-admin` — public client (SPA), authorization code + PKCE + refresh token.
  - `ezshop-service` — confidential client, client credentials.

Kết nối database dùng chung `ConnectionStrings:Database` của WebHost. Tất cả bảng (Identity + OpenIddict) nằm trong schema PostgreSQL `identity`.

## Lưu ý

- `IdentityDataSeeder` đang dùng `EnsureCreatedAsync()` cho môi trường dev. Khi cần quản lý schema nghiêm túc, hãy tạo EF Core migrations (`dotnet ef migrations add`) và chuyển sang `MigrateAsync()`.
- Signing/encryption keys đang dùng development certificates. Production cần cấu hình certificate thật qua `AddSigningCertificate`/`AddEncryptionCertificate` (hoặc key vault).
- `AddIdentityCore` được dùng thay cho `AddIdentity` để tránh đăng ký cookie authentication — API thuần token, default scheme là OpenIddict validation.
