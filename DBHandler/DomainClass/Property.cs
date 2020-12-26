using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DBHandler
{
   public class Property : BaseModel
    {
        public int PropertyId { get; set; }
        public string Description { get; set; }
        public int AddressId { get; set; }
        [ForeignKey("AddressId")]
        public Address Address { get; set; }
        public int TypeId { get; set; }
        [ForeignKey("TypeId")]
        public Type Type { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public decimal Rent { get; set; }
        public int Room { get; set; }
        public virtual ICollection<Image> Images { get; set; }

    }
}
