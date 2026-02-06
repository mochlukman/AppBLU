using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SetpendbljPost
    {
        [Required]
        public long Idrekd { get; set; }
        public List<long> Idrekr { get; set; }
    }
}
