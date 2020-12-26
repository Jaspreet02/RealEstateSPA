using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DBHandler
{
   public class AddressRepository : AbstractRepository<DataContext,Address>
    {
        public AddressRepository(DataContext dataContext) :  base(dataContext)
        {

        }
    }
}
