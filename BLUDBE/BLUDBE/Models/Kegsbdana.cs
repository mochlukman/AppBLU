using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Kegsbdana
    {
        public long Idkegdana { get; set; }
        public long? Idkegdanax { get; set; }
        public long Idkegunit { get; set; }
        public long Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jdana IdjdanaNavigation { get; set; }
        public Kegunit IdkegunitNavigation { get; set; }
    }
}
