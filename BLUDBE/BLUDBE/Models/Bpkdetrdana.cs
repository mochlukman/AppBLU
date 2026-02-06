using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bpkdetrdana
    {
        public long Idbpkdetrdana { get; set; }
        public long Idbpkdetr { get; set; }
        public long Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bpkdetr IdbpkdetrNavigation { get; set; }
        public Jdana IdjdanaNavigation { get; set; }
    }
}
