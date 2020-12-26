using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Extensions;
using DBHandler;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using System.Text;
using System;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Linq;

namespace RealEstate
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private IConfiguration Configuration { get; }
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _sendEmailService;
        public AccountController(SignInManager<User> signInManager, UserManager<User> userManager, IConfiguration configuration, IEmailService sendEmailService)
        {
            Configuration = configuration;
            _signInManager = signInManager;
            _userManager = userManager;
            _sendEmailService = sendEmailService;
        }

        [EnableCors]
        [HttpPost("[action]")]
        public async Task<IActionResult> Login(UserModel model)
        {
            if (!ModelState.IsValid) { BadRequest(ModelState); }

            //Get user details for the user who is trying to login
            var user = await _userManager.FindByEmailAsync(model.Username);

            //Authenticate User, Check if it’s a registered user in Database 
            if (user == null)
                return NotFound(model);

            //Email is confirmed or not
            if (!user.EmailConfirmed)
                return StatusCode(500, "Email is not confirmed.");

            //If it is registered user, check user password stored in Database
            //For demo, password is not hashed. It is just a string comparision 
            //In reality, password would be hashed and stored in Database. 
            //Before comparing, hash the password again.
            //_userManager.CheckPasswordAsync(user, model.Password)
            var result = _signInManager.PasswordSignInAsync(user, model.Password, false, false).Result;
            if (result.Succeeded)
            {
                string userRole = _userManager.GetRolesAsync(user).Result[0];
                //Authentication successful, Issue Token with user credentials 
                //Provide the security key which is given in 
                //Startup.cs ConfigureServices() method 
                var key = Encoding.ASCII.GetBytes
                (Configuration.GetSection("MySettings").GetSection("SecretKey").Value);
                //Generate Token for user 
                var JWToken = new JwtSecurityToken(
                        issuer: Configuration.GetSection("MySettings").GetSection("ValidIssuer").Value,
                        audience: Configuration.GetSection("MySettings").GetSection("ValidAudience").Value,
                        claims: null, //GetUserClaims(user, role),
                        notBefore: new DateTimeOffset(DateTime.Now).DateTime,
                        expires: new DateTimeOffset(DateTime.Now.AddHours(1)).DateTime,
                        //Using HS256 Algorithm to encrypt Token  
                        signingCredentials: new SigningCredentials
                        (new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    );
                var token = new JwtSecurityTokenHandler().WriteToken(JWToken);

                //Save token in session object
                //HttpContext.Session.SetString("JWToken", token);
                return Ok(new { access_token = token, role = userRole });
            }
            else if (result.IsNotAllowed)
            {
                return StatusCode(500, "User is not allowed.");
            }
            else if (result.IsLockedOut)
            {
                return StatusCode(500, "Account has been locked.");
            }
            else
            {
                return StatusCode(500, "Internal Server Error from the custom middleware.");
            }

        }

        //Using hard coded collection list as Data Store for demo. 
        //In reality, User data comes from Database or other Data Source 
        private IEnumerable<Claim> GetUserClaims(User user, string role)
        {
            var identity = new ClaimsIdentity();
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id));
            identity.AddClaim(new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName));
            identity.AddClaim(new Claim(ClaimTypes.Email, user.Email));
            identity.AddClaim(new Claim(ClaimTypes.MobilePhone, user.PhoneNumber));
            identity.AddClaim(new Claim(ClaimTypes.Role, role));
            return identity.Claims;
        }

        [HttpPost("[action]")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Ok();
        }

        // POST: api/Client
        [HttpPost("[action]/{roleName}")]
        public async Task<IActionResult> Register(User value, string roleName)
        {
            if (!ModelState.IsValid) { BadRequest(ModelState); }

            value.UserName = value.Email;
            value.NormalizedUserName = value.Email;
            value.NormalizedEmail = value.Email;
            value.CreatedAt = DateTimeOffset.Now;
            value.ModifiedAt = value.CreatedAt;
            IdentityResult result = await _userManager.CreateAsync(value, value.PasswordHash);
            if (result.Succeeded)
            {
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(value);
                var callbackUrl = new Uri(Url.Link("ConfirmEmailRoute", new { userId = value.Id, code = code }));
                // await _userManager.SetEmailAsync(value,
                //"Please confirm your account by clicking this link: <a href=\""
                // + callbackUrl + "\">link</a>");
                var emailDetail = new IdentityMessage()
                {
                    Destination = value.Email,
                    Subject = "Account Confirmation",
                    Body = "Please confirm your account by click this link : <a href=\"" + callbackUrl + "\">link</a>"
                };
                var emailResult = _sendEmailService.SendEmailAsync(emailDetail);
                result = await _userManager.AddToRoleAsync(value, roleName);
                if (emailResult.Result)
                {
                    return Ok(result);
                }
                else
                {
                    return StatusCode(500, emailResult.Exception.Message);
                }
            }
            else
            {
                return StatusCode(500, result.Errors.ToList().First());
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route(("[action]"), Name = "ConfirmEmailRoute")]
        public async Task<IActionResult> ConfirmEmail(string userId = "", string code = "")
        {
            var user = await this._userManager.FindByIdAsync(userId);
            if (user != null)
            {
                var result = await this._userManager.ConfirmEmailAsync(user, code);
                if (result.Succeeded)
                {
                    string url = string.Format("{0}://{1}{2}/login", Request.Scheme, Request.Host, Request.PathBase);
                    //string url = Request?.GetDisplayUrl().Replace("ConfirmEmail", "Login");
                    return Redirect(url);
                }
                else { return BadRequest(); }
            }
            else { return NotFound(); }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var user = await this._userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
            IdentityResult result = await this._userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                foreach (var item in result.Errors)
                {
                    ModelState.AddModelError(item.Code, item.Description);
                }
                return BadRequest(ModelState);
            }

            return Ok();
        }

    }
}
