using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class StattrsPost
    {
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public string Lblstatus { get; set; }
        public string Uraian { get; set; }
    }
}
