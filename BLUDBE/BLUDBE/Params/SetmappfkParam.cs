using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SetmappfkPost
    {
        [Required]
        public long Idreknrc { get; set; }
        public List<long> Idrekpot { get; set; }
    }
}
