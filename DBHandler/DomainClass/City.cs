using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DBHandler
{
   public    class City : BaseModel
    {
        public int CityId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int StateId { get; set; }
        [ForeignKey("StateId")]
        public State State { get; set; }
    }
}
