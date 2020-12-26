using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DBHandler
{
   public class PropertyRepository : AbstractRepository<DataContext,Property>
    {
        public PropertyRepository(DataContext dataContext) :  base(dataContext)
        {

        }

        public IQueryable<Property> GetAllWithImages(Expression<Func<Property, bool>> predicate)
        {
            return context.Property.Include("User").Include("Address.City").Include("Images").Where(predicate);
        }

        public Property GetwithAddress (int id)
        {
            return context.Property.Include("Address").SingleOrDefault(x => x.PropertyId == id);
        }
    }
}
