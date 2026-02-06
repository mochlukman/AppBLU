using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp2ddetr
    {
        public Sp2ddetr()
        {
            Sp2ddetrdana = new HashSet<Sp2ddetrdana>();
            Sp2ddetrp = new HashSet<Sp2ddetrp>();
        }

        public long Idsp2ddetr { get; set; }
        public long Idsp2d { get; set; }
        public long Idkeg { get; set; }
        public long Idrek { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jtrnlkas IdnojetraNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public Sp2d Idsp2dNavigation { get; set; }
        public ICollection<Sp2ddetrdana> Sp2ddetrdana { get; set; }
        public ICollection<Sp2ddetrp> Sp2ddetrp { get; set; }
    }
}
