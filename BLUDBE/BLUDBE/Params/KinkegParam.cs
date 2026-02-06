using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class KinkegPost
    {
        public long Idkinkeg { get; set; }
        [Required]
        public long Idkegunit { get; set; }
        [Required]
        public string Kdjkk { get; set; }
        public string Nomor { get; set; }
        public string Tolokur { get; set; }
        public decimal? Target { get; set; }
        public string Satuan { get; set; }
        public string Keterangan { get; set; }
    }
    public class KinkegGet
    {
        public long Idkinkeg { get; set; }
        public long Idkegunit { get; set; }
        public string Kdjkk { get; set; }
        public string Nomor { get; set; }
        public string Tolokur { get; set; }
        public decimal? Target { get; set; }
        public string Satuan { get; set; }
        public string Keterangan { get; set; }
        public long Idunit { get; set; } // Idunit & Kdtahap di pakai untuk check Pengesahan RKA berdasarkan Unit & Tahap
        public string Kdtahap { get; set; }
    }
}
