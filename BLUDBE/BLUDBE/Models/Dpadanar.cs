using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpadanar
    {
        public long Iddpadanar { get; set; }
        public long Iddpar { get; set; }
        public long Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Dpar IddparNavigation { get; set; }
        public Jdana IdjdanaNavigation { get; set; }
    }
}
