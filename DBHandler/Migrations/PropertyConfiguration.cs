using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace DBHandler
{
    public class PropertyConfiguration : IEntityTypeConfiguration<Type>
    {
        public void Configure(EntityTypeBuilder<Type> builder)
        {
            builder.ToTable("Type");
            builder.Property(x => x.Status).HasDefaultValue(true);
            DateTimeOffset currentTime = DateTimeOffset.Now;
            builder.Property(x => x.CreatedAt).HasDefaultValue(currentTime);
            builder.Property(x => x.ModifiedAt).HasDefaultValue(currentTime);

            foreach (var item in Enum.GetValues(typeof(eType)))
            {
                builder.HasData(
                new Type()
                {
                    TypeId = (int)item ,
                    Name = item.ToString(),
                    Description = EnumHelper.GetEnumDescription((eType)item)
                });
            }

        }
    }
}
