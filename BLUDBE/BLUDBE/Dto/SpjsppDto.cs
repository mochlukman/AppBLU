using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Dto
{
    public class SpjsppView
    {
        public long Idsppspj { get; set; }
        public long Idspj { get; set; }
        public long Idspp { get; set; }
        public string Nospj { get; set; }
        public DateTime? Tglspj { get; set; }
        public DateTime? Tglbuku { get; set; }
        public string Keterangan { get; set; }
        public decimal? Nilai { get; set; }
    }
}
