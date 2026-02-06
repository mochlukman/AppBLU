using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class JdanaPost
    {
        public long Idjdana { get; set; }
        [Required]
        public string Kddana { get; set; }
        [Required]
        public string Nmdana { get; set; }
        public string Ket { get; set; }
    }
}
