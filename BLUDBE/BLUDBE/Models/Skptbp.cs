using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Skptbp
    {
        public long Idtbp { get; set; }
        public long Idskp { get; set; }

        public Skp IdskpNavigation { get; set; }
        public Tbp IdtbpNavigation { get; set; }
    }
}
