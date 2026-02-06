using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpadanad
    {
        public long Iddpadanad { get; set; }
        public long Iddpad { get; set; }
        public long? Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Dpad IddpadNavigation { get; set; }
        public Jdana IdjdanaNavigation { get; set; }
    }
}
