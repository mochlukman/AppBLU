using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp2ddetbdana
    {
        public long Idsp2ddetbdana { get; set; }
        public long Idsp2ddetb { get; set; }
        public long Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jdana IdjdanaNavigation { get; set; }
        public Sp2ddetb Idsp2ddetbNavigation { get; set; }
    }
}
