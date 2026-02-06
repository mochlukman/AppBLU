using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Npdbpk
    {
        public long Idnpdbpk { get; set; }
        public long Idbpk { get; set; }
        public long Idnpd { get; set; }
        public DateTime? Tglkirim { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bpk IdbpkNavigation { get; set; }
        public Npd IdnpdNavigation { get; set; }
    }
}
