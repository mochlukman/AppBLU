using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class CheckdokGet
    {
        public int? Idxkode { get; set; }
        public long Idspp { get; set; } // digunakan untuk get data berdasarkan sppcheckbox, atau != sppcheckbox, atau tidak mengambil data yang sudah masuk ke sppcheckdox
        public long Idsp2d { get; set; } // digunakan untuk get data berdasarkan sp2dcheckbox, atau != sp2dcheckbox, atau tidak mengambil data yang sudah masuk ke sp2dcheckbox
    }
    public class CheckdokPost
    {
        public long Idcheck { get; set; }
        [Required]
        public string Uraian { get; set; }
        [Required]
        public int? Idxkode { get; set; }
    }
}
