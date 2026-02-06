using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Tbpldet
    {
        public Tbpldet()
        {
            Tbpldetkeg = new HashSet<Tbpldetkeg>();
        }

        public long Idtbpldet { get; set; }
        public long Idtbpl { get; set; }
        public long Idbend { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jtrnlkas IdnojetraNavigation { get; set; }
        public Tbpl IdtbplNavigation { get; set; }
        public ICollection<Tbpldetkeg> Tbpldetkeg { get; set; }
    }
}
