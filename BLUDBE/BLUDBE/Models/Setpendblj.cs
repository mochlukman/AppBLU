using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Setpendblj
    {
        public long Idsetpendblj { get; set; }
        public long Idrekd { get; set; }
        public long Idrekr { get; set; }

        public Daftrekening IdrekdNavigation { get; set; }
        public Daftrekening IdrekrNavigation { get; set; }
    }
}
