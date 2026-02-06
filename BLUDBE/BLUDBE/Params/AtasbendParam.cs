using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class AtasbendPost
    {
        [Required]
        public long? Idunit { get; set; }
        [Required]
        public long Idpeg { get; set; }
    }
    public class AtasbendUpdate
    {
        [Required]
        public long Idpa { get; set; }
        [Required]
        public long? Idunit { get; set; }
        [Required]
        public long Idpeg { get; set; }
    }
}
