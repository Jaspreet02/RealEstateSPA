using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DBHandler
{
  public abstract class AbstractRepository<TContext, TEntity> : IRepository<TEntity>
        where TEntity : class  where TContext : DbContext
    {
       protected readonly TContext context;

       public AbstractRepository(TContext options)
       {
           context = options;
       }

        public TEntity Add(TEntity entity)
        {
            context.Set<TEntity>().Add(entity);
            context.SaveChangesAsync();
            return entity;
        }

        public TEntity Delete(int id)
        {
            var entity = context.Set<TEntity>().Find(id);
            if (entity == null)
            {
                return entity;
            }

            context.Set<TEntity>().Remove(entity);
            context.SaveChangesAsync();

            return entity;
        }

        public TEntity Get(int id)
        {
            return context.Set<TEntity>().Find(id);
        }

        //public  IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate)
        //{
        //    return context.Set<TEntity>().Where(predicate);
        //}

        public IQueryable<TEntity> GetAll()
        {
            return context.Set<TEntity>();
        }

        public TEntity Update(TEntity entity)
        {

            context.Entry(entity).State = EntityState.Modified;
            context.SaveChangesAsync();
            return entity;
        }
    }
}
