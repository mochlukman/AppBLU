using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Spjapbddet
    {
        public long Idspjapbddet { get; set; }
        public long Idspjapbd { get; set; }
        public long Idrek { get; set; }
        public int Idnojetra { get; set; }
        public long? Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jdana IdjdanaNavigation { get; set; }
        public Jtrnlkas IdnojetraNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public Spjapbd IdspjapbdNavigation { get; set; }
    }
}
