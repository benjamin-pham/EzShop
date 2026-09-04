using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EzShop.Module.Identity.Infrastructure.Database.EntityConfigurations;

public class ApplicationRoleClaimConfiguration : IEntityTypeConfiguration<IdentityRoleClaim<Guid>>
{
    public void Configure(EntityTypeBuilder<IdentityRoleClaim<Guid>> builder)
    {
        builder.ToTable("role_claims");

        builder.Property(x => x.Id).HasColumnName("id");
        builder.Property(x => x.RoleId).HasColumnName("role_id");
        builder.Property(x => x.ClaimType).HasColumnName("claim_type");
        builder.Property(x => x.ClaimValue).HasColumnName("claim_value");
    }
}
