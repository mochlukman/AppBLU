using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class BendPost
    {
        public long Idbend { get; set; }
        public long? Idpemda { get; set; }
        [Required]
        public string Jnsbend { get; set; }
        [Required]
        public long Idpeg { get; set; }
        [Required]
        public long Idbank { get; set; }
        public string Nmcabbank { get; set; }
        public string Rekbend { get; set; }
        public string Npwpbend { get; set; }
        public string Jabbend { get; set; }
        public decimal? Saldobankup { get; set; }
        public decimal? Saldobankpajak { get; set; }
        public decimal? Saldotunaiup { get; set; }
        public decimal? Saldotunaipajak { get; set; }
        public DateTime? Tglstopbend { get; set; }
        public string Warganegara { get; set; }
        public string Stpendududuk { get; set; }
        public int? Staktif { get; set; }
        public DateTime? Datecreate { get; set; }
    }
}
