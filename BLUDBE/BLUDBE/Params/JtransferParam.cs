using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class JtransferPost
    {
        public long Idjtransfer { get; set; }
        [Required]
        public int Kdtransfer { get; set; }
        public string Nmtransfer { get; set; }
        public string Uraiantrans { get; set; }
        public decimal? Minnominal { get; set; }
        public string Flagsnom { get; set; }
    }
}
