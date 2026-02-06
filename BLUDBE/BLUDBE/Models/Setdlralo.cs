using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Setdlralo
    {
        public long Idsetdlralo { get; set; }
        public long Idreklo { get; set; }
        public long Idreklra { get; set; }

        public Daftrekening IdrekloNavigation { get; set; }
        public Daftrekening IdreklraNavigation { get; set; }
    }
}
