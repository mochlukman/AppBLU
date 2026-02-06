using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp3bdet
    {
        public long Idsp3bdet { get; set; }
        public long Idsp3b { get; set; }
        public string Nospj { get; set; }
        public decimal? Nilai { get; set; }
        public long Idunit { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long? Idrek { get; set; }
        public long? Idjnsakun { get; set; }

        public Daftrekening IdrekNavigation { get; set; }
        public Sp3b Idsp3bNavigation { get; set; }
    }
}
