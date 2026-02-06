using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp2dntpn
    {
        public long Idntpn { get; set; }
        public string Ntpn { get; set; }
        public DateTime? Tglntpn { get; set; }
        public long? Idunit { get; set; }
        public long? Idsp2d { get; set; }
        public string Nosp2d { get; set; }
        public DateTime? Tglsp2d { get; set; }
        public int? Idxkode { get; set; }
        public string Kdstatus { get; set; }
        public string Idbilling { get; set; }

        public Sp2d Idsp2dNavigation { get; set; }
        public Zkode IdxkodeNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
    }
}
