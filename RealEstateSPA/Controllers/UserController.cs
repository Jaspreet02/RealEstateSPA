using DBHandler;
using Microsoft.AspNetCore.Authorization;

namespace RealEstate
{

    [Authorize]
    public class UserController : BaseController<User, UserRepository>
    {
        public UserController(UserRepository userRepository) : base(userRepository)
        {
        }
    }
}