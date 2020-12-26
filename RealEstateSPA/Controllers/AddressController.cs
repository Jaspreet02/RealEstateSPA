using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DBHandler;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RealEstate
{
    public class AddressController : BaseController<Address, AddressRepository>
    {
        private readonly AddressRepository _AddressRepository;
        public AddressController(AddressRepository AddressRepository) : base(AddressRepository)
        {
            _AddressRepository  = AddressRepository;
        }
    }
}