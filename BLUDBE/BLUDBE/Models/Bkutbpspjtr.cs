using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bkutbpspjtr
    {
        public long Idbkutbpspjtr { get; set; }
        public long Idspjtr { get; set; }
        public long Idbkutbp { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bkutbp IdbkutbpNavigation { get; set; }
        public Spjtr IdspjtrNavigation { get; set; }
    }
}
