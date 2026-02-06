using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Urusanunit
    {
        public long Idurusanunit { get; set; }
        public long Idunit { get; set; }
        public long Idurus { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Daftunit IdunitNavigation { get; set; }
        public Dafturus IdurusNavigation { get; set; }
    }
}
