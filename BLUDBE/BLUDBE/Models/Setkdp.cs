using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Setkdp
    {
        public long Idsetkdp { get; set; }
        public long? Idrekbm { get; set; }
        public long? Idrekkdp { get; set; }

        public Daftrekening IdrekbmNavigation { get; set; }
        public Daftrekening IdrekkdpNavigation { get; set; }
    }
}
