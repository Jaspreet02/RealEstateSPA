using System.Linq;

namespace RealEstate
{
    public interface IPageResult<T>
    {
        int count { get; set; }
        IQueryable<T> result { get; set; }
    }
}
