using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sppdetrpot
    {
        public long Idsppdetrpot { get; set; }
        public long Idsppdetr { get; set; }
        public long Idpot { get; set; }
        public decimal? Nilai { get; set; }
        public string Keterangan { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Potongan IdpotNavigation { get; set; }
        public Sppdetr IdsppdetrNavigation { get; set; }
    }
}
