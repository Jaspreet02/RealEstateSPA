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
    public class CityController : BaseController<City, CityRepository>
    {
        private readonly CityRepository _cityRepository;
        public CityController(CityRepository cityRepository) : base(cityRepository)
        {
            _cityRepository  = cityRepository;
        }
    }
}