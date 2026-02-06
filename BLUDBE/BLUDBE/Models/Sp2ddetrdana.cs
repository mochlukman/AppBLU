using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp2ddetrdana
    {
        public long Idsp2ddetrdana { get; set; }
        public long Idsp2ddetr { get; set; }
        public long Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jdana IdjdanaNavigation { get; set; }
        public Sp2ddetr Idsp2ddetrNavigation { get; set; }
    }
}
