using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class KegunitGet
    {
        public long Idkegunit { get; set; }
        public long Idpgrmunit { get; set; }
        public string Nukeg { get; set; }
        public string Nmkegunit { get; set; }
        public long Idkeg { get; set; }
    }
    public class KegunitPost
    {
        public long Idkegunit { get; set; }
        [Required]
        public long Idpgrmunit { get; set; }
        [Required]
        public long Idkeg { get; set; }
        public int? Noprior { get; set; }
        [Required]
        public long Idsifatkeg { get; set; }
        public long? Idpeg { get; set; }
        public DateTime? Tglakhir { get; set; }
        public DateTime? Tglawal { get; set; }
        public decimal? Targetp { get; set; }
        public string Lokasi { get; set; }
        public decimal? Pagumin1 { get; set; }
        public decimal? Pagu { get; set; }
        public decimal? Pagupls1 { get; set; }
        public string Sasaran { get; set; }
        public string Ketkeg { get; set; }
        public string Idprioda { get; set; }
        public string Idsas { get; set; }
        public string Target { get; set; }
        public string Targetif { get; set; }
        public string Targetsen { get; set; }
        public string Volume { get; set; }
        public string Volume1 { get; set; }
        public string Satuan { get; set; }
        public decimal? Paguplus { get; set; }
        public decimal? Pagutif { get; set; }
        public DateTime? Tglvalid { get; set; }
    }
}
