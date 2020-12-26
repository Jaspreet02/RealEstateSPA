using DBHandler;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace RealEstate
{
    public static class DbInitializer
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DataContext>();
                context.Database.EnsureCreated();

                var _userManager = serviceScope.ServiceProvider.GetService<UserManager<User>>();
                var _roleManager = serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole>>();

                if (!context.Users.Any(usr => usr.UserName == "samarpratap@gmail.com"))
                {
                    var user = new User()
                    {
                        UserName = "samarpratap@gmail.com",
                        NormalizedUserName = "samarpratap@gmail.com",
                        Email = "samarpratap@gmail.com",
                        NormalizedEmail = "samarpratap@gmail.com",
                        EmailConfirmed = true,
                        FirstName = "Samarpratap",
                        LastName = "Singh",
                        Gender = "M",
                        CreatedAt = DateTimeOffset.Now,
                        ModifiedAt = DateTimeOffset.Now,
                        PhoneNumber = "1234567890",
                        PhoneNumberConfirmed = true
                    };

                    var userResult = _userManager.CreateAsync(user, "Admin@1234").Result;
                }

                if (!_roleManager.RoleExistsAsync("Admin").Result)
                {
                    foreach (var item in Enum.GetNames(typeof(eRole)))
                    {
                     var role =  _roleManager.CreateAsync
                               (new IdentityRole { Name = item }).Result;
                    } 
                }

                var adminUser = _userManager.FindByNameAsync("Samarpratap@gmail.com").Result;
                var userRole = _userManager.AddToRolesAsync(adminUser, new string[] { "Admin" }).Result;

                context.SaveChanges();
            }
        }
    }
}