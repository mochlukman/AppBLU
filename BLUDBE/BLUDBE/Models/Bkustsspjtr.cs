using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bkustsspjtr
    {
        public long Idbkustsspjtr { get; set; }
        public long Idspjtr { get; set; }
        public long Idbkusts { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bkusts IdbkustsNavigation { get; set; }
        public Spjtr IdspjtrNavigation { get; set; }
    }
}
