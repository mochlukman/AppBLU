using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bkpajakdetstr
    {
        public long Idbkpajakdetstr { get; set; }
        public long Idbpkpajakstr { get; set; }
        public long? Idpajak { get; set; }
        public long Idbkpajak { get; set; }
        public string Idbilling { get; set; }
        public DateTime? Tglidbilling { get; set; }
        public DateTime? Tglexpire { get; set; }
        public string Ntpn { get; set; }
        public string Ntb { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bkpajak IdbkpajakNavigation { get; set; }
        public Pajak IdpajakNavigation { get; set; }
    }
}
