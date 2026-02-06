using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bpkpajakstrdet
    {
        public long Idbpkpajakstrdet { get; set; }
        public long Idbpkpajakstr { get; set; }
        public long? Idbpkpajak { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bpkpajak IdbpkpajakNavigation { get; set; }
        public Bpkpajakstr IdbpkpajakstrNavigation { get; set; }
    }
}
