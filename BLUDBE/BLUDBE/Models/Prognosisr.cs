using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Prognosisr
    {
        public long Idprog { get; set; }
        public long Idunit { get; set; }
        public int Idbulan { get; set; }
        public long Idrek { get; set; }
        public long Idkeg { get; set; }
        public decimal? Nprognosis { get; set; }
        public decimal? Nprogman { get; set; }
        public decimal? Nsoakhir { get; set; }
        public string Stvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bulan IdbulanNavigation { get; set; }
        public Mkegiatan IdkegNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
    }
}
