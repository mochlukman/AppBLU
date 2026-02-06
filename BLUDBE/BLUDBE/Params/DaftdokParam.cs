using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class DaftdokPost
    {
        public long Iddaftdok { get; set; }
        [Required]
        public string Kddok { get; set; }
        [Required]
        public string Nmdok { get; set; }
        public string Ket { get; set; }
    }
}
