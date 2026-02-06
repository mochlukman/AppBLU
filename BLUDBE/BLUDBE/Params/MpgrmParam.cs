using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class MpgrmGet
    {
        public long? Idurus { get; set; }
    }
    public class MpgrmPost
    {
        public long Idprgrm { get; set; }
        public long? Idurus { get; set; }
        [Required]
        public string Nmprgrm { get; set; }
        [Required]
        public string Nuprgrm { get; set; }
        public int? Idprioda { get; set; }
        public int? Idprioprov { get; set; }
        public int? Idprionas { get; set; }
        public int? Idxkode { get; set; }
        public bool? Staktif { get; set; }
        public bool? Stvalid { get; set; }
    }
}
