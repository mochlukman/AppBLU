using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sppdetrp
    {
        public long Idsppdetrp { get; set; }
        public long Idsppdetr { get; set; }
        public long Idpajak { get; set; }
        public decimal? Nilai { get; set; }
        public string Keterangan { get; set; }
        public string Idbilling { get; set; }
        public DateTime? Tglbilling { get; set; }
        public string Ntpn { get; set; }
        public string Ntb { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Pajak IdpajakNavigation { get; set; }
        public Sppdetr IdsppdetrNavigation { get; set; }
    }
}
