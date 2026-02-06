using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpablnb
    {
        public long Iddpablnb { get; set; }
        public long Iddpab { get; set; }
        public long Idbulan { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Dpab IddpabNavigation { get; set; }
    }
}
