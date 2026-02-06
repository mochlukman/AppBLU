using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bkbankdet
    {
        public long Idbankdet { get; set; }
        public long Idbkbank { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }

        public Bkbank IdbkbankNavigation { get; set; }
        public Jtrnlkas IdnojetraNavigation { get; set; }
    }
}
