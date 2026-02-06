using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp2bdet
    {
        public long Idsp2bdet { get; set; }
        public long? Idsp2b { get; set; }
        public long? Idsp3b { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long? Iderek { get; set; }
        public long? Idjnsakun { get; set; }

        public Sp2b Idsp2bNavigation { get; set; }
        public Sp3b Idsp3bNavigation { get; set; }
    }
}
