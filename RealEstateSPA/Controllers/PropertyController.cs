using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DBHandler;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace RealEstate
{
    //[AllowAnonymous]
    public class PropertyController : BaseController<Property, PropertyRepository>
    {
        private readonly PropertyRepository _propertyRepository;
        public PropertyController(PropertyRepository propertyRepository) : base(propertyRepository)
        {
            _propertyRepository = propertyRepository;
        }

        [HttpGet("GetAllWithImages/{typeId:int}/{cityId:int}/{intersection}/{pageNumber:int}/{pageSize:int}/{sortField}/{sortOrder}")]
        public IPageResult<Property> GetAllWithImages(int typeId, int cityId, string intersection, int pageNumber, int pageSize, string sortField, string sortOrder, [FromQuery(Name = "rent")] int[] rent)
        {
            Expression<Func<Property, bool>> predicate = x => (typeId > -1 ? x.TypeId == typeId : true) && (cityId > 0 ? x.Address.CityId == cityId : true) && (string.IsNullOrEmpty(intersection) ? true : x.Address.Intersection.Contains(intersection.Trim())) && (x.Rent >= rent[0] ? x.Rent <= rent[1] : false);
            return CreatePageResult<Property>(_propertyRepository.GetAllWithImages(predicate).OrderBy(sortField + " " + sortOrder), pageNumber, pageSize, false);
        }

        [HttpGet("GetWithAddress/{id}")]
        public Property GetWithAddress(int id)
        {
            return _propertyRepository.GetwithAddress(id);
        }
    }
}