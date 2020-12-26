using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DBHandler
{
   public class CityRepository : AbstractRepository<DataContext,City>
    {
        public CityRepository(DataContext dataContext) :  base(dataContext)
        {

        }
    }
}
