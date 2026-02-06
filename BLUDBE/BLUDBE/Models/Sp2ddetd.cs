using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp2ddetd
    {
        public long Idsp2ddetd { get; set; }
        public long Idsp2d { get; set; }
        public long Idrek { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jtrnlkas IdnojetraNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public Sp2d Idsp2dNavigation { get; set; }
    }
}
