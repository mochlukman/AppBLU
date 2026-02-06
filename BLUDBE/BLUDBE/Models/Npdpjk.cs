using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Npdpjk
    {
        public long Idnpdnpdpjk { get; set; }
        public long Idbkpajak { get; set; }
        public long Idnpd { get; set; }
        public DateTime? Tglkirim { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bkpajak IdbkpajakNavigation { get; set; }
        public Npd IdnpdNavigation { get; set; }
    }
}
