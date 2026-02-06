using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class JbendPost
    {
        [Required]
        public string Jnsbend { get; set; }
        [Required]
        public long Idrek { get; set; }
        public string Uraibend { get; set; }
    }
}
