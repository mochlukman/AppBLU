using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Tahapsah
    {
        public string Kdtahap { get; set; }
        public string Kddoksah { get; set; }
        public string Nosah { get; set; }
        public DateTime Tglsah { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Doksah KddoksahNavigation { get; set; }
    }
}
