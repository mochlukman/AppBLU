using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Beritapot
    {
        public long Idberitapot { get; set; }
        public long Idberita { get; set; }
        public long Idsp2d { get; set; }
        public long? Idrek { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
