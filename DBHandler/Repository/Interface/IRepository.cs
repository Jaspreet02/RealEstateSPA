using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DBHandler
{
    public interface IRepository<T> where T : class
    {
        //IQueryable<T> GetAll(Expression<Func<T,bool>> predicate);
        IQueryable<T> GetAll();
        T Get(int id);
        T Add(T entity);
        T Update(T entity);
        T Delete(int id);
    }
}
