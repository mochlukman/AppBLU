using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Keginduk
    {
        public long Idkeginduk { get; set; }
        public long Idunit { get; set; }
        public long Idkeg { get; set; }
        public string Kdtahap { get; set; }
        public long Idprgrm { get; set; }
        public string Indikator { get; set; }
        public decimal? Pagu { get; set; }
        public long? Target { get; set; }
        public string Satuan { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
