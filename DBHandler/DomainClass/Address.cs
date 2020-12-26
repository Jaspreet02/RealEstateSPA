using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DBHandler
{
   public class Address : BaseModel
    {
        public int AddressId { get; set; }
        public int Number { get; set; }
        public string Street { get; set; }
        public int UnitNumber { get; set; }
        public string Intersection { get; set; }
        public string PostalCode { get; set; }
        public int CityId { get; set; }
        [ForeignKey("CityId")]
        public City City { get; set; }

    }
}
