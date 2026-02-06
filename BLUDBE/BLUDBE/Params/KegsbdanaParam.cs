using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class KegsbdanaPost
    {
        public long Idkegdana { get; set; }
        [Required]
        public long Idkegunit { get; set; }
        [Required]
        public long Idjdana { get; set; }
        public decimal? Nilai { get; set; }
    }
}
