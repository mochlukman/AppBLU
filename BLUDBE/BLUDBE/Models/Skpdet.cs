using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Skpdet
    {
        public long Idskpdet { get; set; }
        public long Idskp { get; set; }
        public long Idrek { get; set; }
        public long Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Daftrekening IdrekNavigation { get; set; }
        public Skp IdskpNavigation { get; set; }
    }
}
