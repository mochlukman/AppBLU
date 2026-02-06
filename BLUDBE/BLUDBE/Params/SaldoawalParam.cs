using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SaldoawalnrcPost
    {
        public long Idsaldo { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public long? Idrek { get; set; }
        [Required]
        public string Kdpers { get; set; }
        public decimal? Nilai { get; set; }
        public string Stvalid { get; set; }
    }
    public class SaldoawallraPost
    {
        public long Idsaldo { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public long Idrek { get; set; }
        [Required]
        public long Idjnsakun { get; set; }
        public decimal? Nilai { get; set; }
        public string Stvalid { get; set; }
    }
}
