using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Fungsinit
    {
        public long Idfungsiinit { get; set; }
        public long Idurus { get; set; }
        public long? Idfung { get; set; }

        public Fungsi IdfungNavigation { get; set; }
        public Dafturus IdurusNavigation { get; set; }
    }
}
