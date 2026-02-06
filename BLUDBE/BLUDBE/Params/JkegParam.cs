using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class JkegPost
    {
        [Required]
        public int Jnskeg { get; set; }
        [Required]
        public string Uraian { get; set; }
    }
}
