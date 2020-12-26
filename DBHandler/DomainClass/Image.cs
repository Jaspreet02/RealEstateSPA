using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DBHandler
{
   public    class Image : BaseModel
    {
        public int ImageId { get; set; }
        public string Path { get; set; }
        public string Name { get; set; }
        public int PropertyId { get; set; }
        [ForeignKey("PropertyId")]
        public Property Property { get; set; }
    }
}
