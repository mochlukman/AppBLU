using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Setuprlo
    {
        public long Idsetuprlo { get; set; }
        public long Idreklo { get; set; }
        public long Idreknrc { get; set; }

        public Daftrekening IdrekloNavigation { get; set; }
        public Daftrekening IdreknrcNavigation { get; set; }
    }
}
