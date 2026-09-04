using EzShop.Module.Identity.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EzShop.Module.Identity.Infrastructure.Database.EntityConfigurations;

public class ApplicationRoleConfiguration : IEntityTypeConfiguration<ApplicationRole>
{
    public void Configure(EntityTypeBuilder<ApplicationRole> builder)
    {
        builder.ToTable("roles");

        builder.Property(x => x.Id).HasColumnName("id");
        builder.Property(x => x.Name).HasColumnName("name");
        builder.Property(x => x.NormalizedName).HasColumnName("normalized_name");
        builder.Property(x => x.ConcurrencyStamp).HasColumnName("concurrency_stamp");
    }
}
