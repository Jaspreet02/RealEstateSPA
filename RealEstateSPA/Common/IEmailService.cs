
using System.Threading.Tasks;

namespace RealEstate
{
    public interface IEmailService
    {
       Task<bool> SendEmailAsync(IdentityMessage message);
    }
}
