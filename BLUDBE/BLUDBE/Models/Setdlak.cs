using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Setdlak
    {
        public long Idsetdlak { get; set; }
        public long Idreklra { get; set; }
        public long Idreklak { get; set; }

        public Daftreklak IdreklakNavigation { get; set; }
        public Daftrekening IdreklraNavigation { get; set; }
    }
}
