using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SpjapbddetGet
    {
        public long Idspjapbddet { get; set; }
        public long Idspjapbd { get; set; }
        public long Idrek { get; set; }
        public int Idnojetra { get; set; }
        public long? Idjdana { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class SpjapbddetPost
    {
        public long Idspjapbddet { get; set; }
        [Required]
        public long Idspjapbd { get; set; }
        [Required]
        public long Idrek { get; set; }
        [Required]
        public int Idnojetra { get; set; }
        public long? Idjdana { get; set; }
        public decimal? Nilai { get; set; }
    }
}
