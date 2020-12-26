using System.Linq;

namespace RealEstate
{
    public class PageResult<T> : IPageResult<T>
    {
        public int count { get; set ; }
        public IQueryable<T> result { get ; set; }
    }
}