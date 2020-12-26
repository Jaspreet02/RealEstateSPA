using System;
using System.Text;
using System.Threading.Tasks;
using DBHandler;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using RealEstate;

namespace RealEstateSPA
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:4200")
                                      .AllowAnyHeader().AllowAnyMethod();
                                  });
            });

            services.AddControllersWithViews();

            services.AddControllers().AddNewtonsoftJson(options =>
             options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<UserRepository>();

            services.AddScoped<PropertyRepository>();

            services.AddScoped<CityRepository>();

            services.AddScoped<StateRepository>();

            services.AddScoped<AddressRepository>();

            services.AddScoped<IUserClaimsPrincipalFactory<User>, AdditionalUserClaimsPrincipalFactory>();

            services.AddSingleton<IAuthorizationHandler, IsAdminHandler>();

            services.AddTransient<IEmailService, EmailService>();

            services.AddDistributedMemoryCache();

            services.AddSession(options => {
                options.IdleTimeout = TimeSpan.FromMinutes(15);
            });

            //  services.AddIdentity<ApplicationUser, IdentityRole>()
            // .AddEntityFrameworkStores<DataContext>()
            // .AddDefaultTokenProviders();

            //Password Strength Setting
            services.AddIdentity<User, IdentityRole>(options =>
            {
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = false;
                options.Password.RequiredUniqueChars = 6;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;
                options.Lockout.AllowedForNewUsers = true;

                // User settings
                options.User.RequireUniqueEmail = true;

                //SignIn Manager
                options.SignIn.RequireConfirmedEmail = true;
            })    
                .AddEntityFrameworkStores<DataContext>()
                .AddDefaultTokenProviders();

            //Setting the Account Login page
            //services.ConfigureApplicationCookie(options =>
            //{
            //    // Cookie settings
            //    options.Cookie.HttpOnly = true;
            //    options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
            //    options.LoginPath = "/Account/Login"; // If the LoginPath is not set here, 
            //                                          // ASP.NET Core will default to /Account/Login
            //    options.LogoutPath = "/Account/Logout"; // If the LogoutPath is not set here, 
            //                                            // ASP.NET Core will default to /Account/Logout
            //    options.AccessDeniedPath = "/Account/AccessDenied"; // If the AccessDeniedPath 
            //                                                        // is not set here, ASP.NET Core will default to /Account/AccessDenied
            //    options.SlidingExpiration = true;
            //});

            //Provide a secret key to Encrypt and Decrypt the Token
            var SecretKey = Encoding.ASCII.GetBytes
                 (Configuration.GetSection("MySettings").GetSection("SecretKey").Value);

            //Configure JWT Token Authentication
            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(token =>
            {
                token.RequireHttpsMetadata = false;
                token.SaveToken = true;
                token.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    //Same Secret key will be used while creating the token
                    IssuerSigningKey = new SymmetricSecurityKey(SecretKey),
                    ValidateIssuer = true,
                    //Usually, this is your application base URL
                    ValidIssuer = Configuration.GetSection("MySettings").GetSection("ValidIssuer").Value,
                    ValidateAudience = true,
                    //Here, we are creating and using JWT within the same application.
                    //In this case, base URL is fine.
                    //If the JWT is created using a web service, then this would be the consumer URL.
                    ValidAudience = Configuration.GetSection("MySettings").GetSection("ValidAudience").Value,
                    RequireExpirationTime = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                DbInitializer.Initialize(app);
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                //app.UseExceptionHandler(a => a.Run(async context =>
                //{
                //    var feature = context.Features.Get<IExceptionHandlerPathFeature>();
                //    var exception = feature.Error;

                //    var result = JsonConvert.SerializeObject(new { error = exception.Message });
                //    context.Response.ContentType = "application/json";
                //    await context.Response.WriteAsync(result);
                //}));
            }

            app.ConfigureCustomExceptionMiddleware();

            app.UseDefaultFiles();

            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCookiePolicy();

            //Add User session
            app.UseSession();

            //Add JWToken to all incoming HTTP Request Header
            //app.Use(async (context, next) =>
            //{
                //Save token in session object
                //var JWToken = context.Session.GetString("JWToken");
                //if (!string.IsNullOrEmpty(JWToken))
                //{
                //    context.Request.Headers.Add("Authorization", "Bearer " + JWToken);
                //}
                //await next();
            //});

            //Add JWToken Authentication service
            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }

        private async Task CreateUserRoles(IServiceProvider serviceProvider)
        {
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var UserManager = serviceProvider.GetRequiredService<UserManager<User>>();

            IdentityResult roleResult;
            //Adding Addmin Role  

            var roleCheck = await RoleManager.RoleExistsAsync("Admin");
            if (!roleCheck)
            {
                //create the roles and seed them to the database  
                roleResult = await RoleManager.CreateAsync(new IdentityRole("Admin"));
            }

            roleCheck = await RoleManager.RoleExistsAsync("Manager");
            if (!roleCheck)
            {
                //create the roles and seed them to the database  
                roleResult = await RoleManager.CreateAsync(new IdentityRole("Manager"));
            }

            //Assign Admin role to the main User here we have given our 
            //newly loregistered login id for Admin management  
            User user = await UserManager.FindByEmailAsync("syedshanumcain@gmail.com");
            var User = new User();
            await UserManager.AddToRoleAsync(user, "Admin");

            user = await UserManager.FindByEmailAsync("Afraz@gmail.com");
            await UserManager.AddToRoleAsync(user, "Manager");
        }
    }
}
