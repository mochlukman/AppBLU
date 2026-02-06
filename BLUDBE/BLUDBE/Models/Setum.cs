using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Setum
    {
        public long Idsetum { get; set; }
        public long Idrekum { get; set; }
        public long Idrekbl { get; set; }

        public Daftrekening IdrekblNavigation { get; set; }
    }
}
