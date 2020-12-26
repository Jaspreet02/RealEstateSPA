using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DBHandler
{
   public class Type : BaseModel
    {
        public int TypeId { get; set; }
        [Required]
        [StringLength(30)]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
