using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpablnd
    {
        public long Iddpablnd { get; set; }
        public long Iddpad { get; set; }
        public long Idbulan { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Dpad IddpadNavigation { get; set; }
    }
}
