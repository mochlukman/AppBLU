using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Setrlralo
    {
        public long Idsetrlralo { get; set; }
        public long Idreklo { get; set; }
        public long Idreklra { get; set; }

        public Daftrekening IdrekloNavigation { get; set; }
        public Daftrekening IdreklraNavigation { get; set; }
    }
}
