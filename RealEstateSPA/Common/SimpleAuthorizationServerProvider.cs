using DBHandler;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RealEstate
{
    public class AdditionalUserClaimsPrincipalFactory
          : UserClaimsPrincipalFactory<User, IdentityRole>
    {
        public AdditionalUserClaimsPrincipalFactory(
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IOptions<IdentityOptions> optionsAccessor)
            : base(userManager, roleManager, optionsAccessor)
        {
        }

        public async override Task<ClaimsPrincipal> CreateAsync(User user)
        {
            var principal = await base.CreateAsync(user);
            var identity = (ClaimsIdentity)principal.Identity;

            var claims = new List<Claim>
            {
                new Claim(JwtClaimTypes.Role, "dataEventRecords"),
                new Claim(JwtClaimTypes.Role, "dataEventRecords.user")
            };

            //if (user.DataEventRecordsRole == "dataeventrecords.admin")
            //{
            //    claims.Add(new Claim(JwtClaimTypes.Role, "dataeventrecords.admin"));
            //}

            //if (user.IsAdmin)
            //{
            //    claims.Add(new Claim(JwtClaimTypes.Role, "admin"));
            //}
            //else
            //{
            //    claims.Add(new Claim(JwtClaimTypes.Role, "user"));
            //}

            identity.AddClaims(claims);
            return principal;
        }
    }
}