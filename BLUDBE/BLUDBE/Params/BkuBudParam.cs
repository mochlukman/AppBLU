using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class BkuBudGet
    {
        [Required]
        public string Nobbantu { get; set; }
        [Required]
        public DateTime Tgl1 { get; set; }
        [Required]
        public DateTime Tgl2 { get; set; }
        [Required]
        public string Jenis { get; set; }
    }
    public class BkuBudPost
    {
        public long Idbku { get; set; }
        public string Nobukas { get; set; }
        public long? Idkas { get; set; }
        public long Idref { get; set; }
        public long? Idbkas { get; set; }
        public long? Idunit { get; set; }
        public long? Idttd { get; set; }
        public string Nobbantu { get; set; }
        public string Nobukti { get; set; }
        public DateTime? Tglkas { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Uraian { get; set; }
        public string Jenis { get; set; }
    }
}
