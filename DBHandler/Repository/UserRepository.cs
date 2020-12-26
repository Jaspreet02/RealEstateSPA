using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DBHandler
{
    public class UserRepository : AbstractRepository<DataContext,User>
    {
       // private readonly DataContext _dataContext;

        public UserRepository(DataContext dataContext) : base(dataContext)
        {
           // _dataContext = dataContext;
        }
        
    }
}
