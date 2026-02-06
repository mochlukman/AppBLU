using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpablnr
    {
        public long Iddpablnr { get; set; }
        public long Iddpar { get; set; }
        public long Idbulan { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Dpar IddparNavigation { get; set; }
    }
}
