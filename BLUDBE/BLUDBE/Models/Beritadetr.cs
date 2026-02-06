using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Beritadetr
    {
        public long Idberitadet { get; set; }
        public long Idberita { get; set; }
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Berita IdberitaNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
    }
}
