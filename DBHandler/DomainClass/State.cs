using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DBHandler
{
   public class State : BaseModel
    {
        public int StateId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [StringLength(2)]
        public string code { get; set; }
    }
}
