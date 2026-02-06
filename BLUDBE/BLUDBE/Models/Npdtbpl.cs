using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Npdtbpl
    {
        public long Idnpdtbpl { get; set; }
        public long Idtbpl { get; set; }
        public long Idnpd { get; set; }
        public DateTime? Tglkirim { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Npd IdnpdNavigation { get; set; }
        public Tbpl IdtbplNavigation { get; set; }
    }
}
