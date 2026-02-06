using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Tbpldetkeg
    {
        public long Idtbpldetkeg { get; set; }
        public long Idtbpldet { get; set; }
        public int Idnojetra { get; set; }
        public long Idkeg { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jtrnlkas IdnojetraNavigation { get; set; }
        public Tbpldet IdtbpldetNavigation { get; set; }
    }
}
