using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp2ddetrp
    {
        public long Idsp2ddetrp { get; set; }
        public long Idsp2ddetr { get; set; }
        public long Idpajak { get; set; }
        public decimal? Nilai { get; set; }
        public string Keterangan { get; set; }
        public string Idbilling { get; set; }
        public DateTime? Tglbilling { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Pajak IdpajakNavigation { get; set; }
        public Sp2ddetr Idsp2ddetrNavigation { get; set; }
    }
}
