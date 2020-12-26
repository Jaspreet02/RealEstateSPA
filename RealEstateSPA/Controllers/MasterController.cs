using DBHandler;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace RealEstate
{
    public class MasterController : BaseController<User,UserRepository>
    {
        public MasterController() : base(null)
        {
        }

        [HttpGet("[action]/{abc:int}")]
        public IActionResult TestMethod(int abc, [FromQuery(Name = "ids")] int[] ids)
        {
            return Ok(ids.Length);
        }

        [HttpGet("[action]")]
        public IActionResult Roles()
        {
            return Ok(Enum.GetNames(typeof(eRole)));
        }

        [HttpGet("[action]")]
        public IActionResult Types()
        {
            List<DBHandler.Type> result = new List<DBHandler.Type>();
            foreach (var item in Enum.GetValues(typeof(eType)))
            {
                result.Add(new DBHandler.Type() { TypeId = Convert.ToByte(item), Name = item.ToString() });
            }
            return Ok(result);
        }
    }
}
