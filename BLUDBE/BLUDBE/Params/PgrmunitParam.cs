using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class PgrmunitGet
    {
        public long Idpgrmunit { get; set; }
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
        public long Idprgrm { get; set; }
    }
    public class PgrmunitPost
    {
        public long Idpgrmunit { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Kdtahap { get; set; }
        [Required]
        public long Idprgrm { get; set; }
        public string Target { get; set; }
        public string Sasaran { get; set; }
        public int? Noprio { get; set; }
        public string Indikator { get; set; }
        public string Ket { get; set; }
        public string Idsas { get; set; }
        public DateTime? Tglvalid { get; set; }
        public int? Idxkode { get; set; }
    }
}
