using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp2ddetb
    {
        public Sp2ddetb()
        {
            Sp2ddetbdana = new HashSet<Sp2ddetbdana>();
        }

        public long Idsp2ddetb { get; set; }
        public long Idsp2d { get; set; }
        public long Idrek { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jtrnlkas IdnojetraNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public Sp2d Idsp2dNavigation { get; set; }
        public ICollection<Sp2ddetbdana> Sp2ddetbdana { get; set; }
    }
}
