using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class StrurekPost
    {
        public long Idstrurek { get; set; }
        [Required]
        public int Mtglevel { get; set; }
        [Required]
        public string Nmlevel { get; set; }
    }
}
