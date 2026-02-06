using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Nrcbend
    {
        public long Idnrcbend { get; set; }
        public long Idbend { get; set; }
        public long Idrek { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
    }
}
