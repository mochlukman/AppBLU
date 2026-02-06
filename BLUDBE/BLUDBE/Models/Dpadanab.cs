using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpadanab
    {
        public long Iddpadanab { get; set; }
        public long Iddpab { get; set; }
        public long? Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Dpab IddpabNavigation { get; set; }
        public Jdana IdjdanaNavigation { get; set; }
    }
}
