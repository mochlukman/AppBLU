using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class MkegiatanGet
    {
        public long Idkeg { get; set; }
        public long Idprgrm { get; set; }
        public long? Kdperspektif { get; set; }
        public int? Levelkeg { get; set; }
        public string Type { get; set; }
        public long? Idkeginduk { get; set; }
        public int? Jnskeg { get; set; }
        public long Idpgrmunit { get; set; } // ini diisi kalau lookup yang diingikan != kegiatan yang ada di kegunit / untuk input ke kegunit
    }
    public class MkegiatanPost
    {
        public long Idkeg { get; set; }
        [Required]
        public long Idprgrm { get; set; }
        public long? Kdperspektif { get; set; }
        [Required]
        public string Nukeg { get; set; }
        [Required]
        public string Nmkegunit { get; set; }
        public int? Levelkeg { get; set; }
        public string Type { get; set; }
        public long? Idkeginduk { get; set; }
        public bool? Staktif { get; set; }
        public bool? Stvalid { get; set; }
        public int? Jnskeg { get; set; }
    }
}
