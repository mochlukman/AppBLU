using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Adendum
    {
        public long Idadd { get; set; }
        public long? Idunit { get; set; }
        public long? Idkeg { get; set; }
        public string Noadd { get; set; }
        public DateTime? Tgladd { get; set; }
        public long? Idkontrak { get; set; }
        public decimal? Nilaiawal { get; set; }
        public decimal? Nilaiadd { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Mkegiatan IdkegNavigation { get; set; }
        public Kontrak IdkontrakNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
    }
}
