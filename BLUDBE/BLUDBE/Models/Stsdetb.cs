using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Stsdetb
    {
        public long Idstsdetb { get; set; }
        public long Idsts { get; set; }
        public long Idrek { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jtrnlkas IdnojetraNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public Sts IdstsNavigation { get; set; }
    }
}
