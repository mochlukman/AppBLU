using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class PajakGet
    {
        public long Idsppdetr { get; set; }
        public int? Idjnspajak { get; set; }
        public long Idbpkpajak { get; set; }
    }
    public class PajakPost
    {
        public long Idpajak { get; set; }
        public string Kdpajak { get; set; }
        [Required]
        public string Nmpajak { get; set; }
        [Required]
        public string Uraian { get; set; }
        public string Keterangan { get; set; }
        public string Rumuspajak { get; set; }
        public long? Idjnspajak { get; set; }
        public int? Staktif { get; set; }
    }
}
