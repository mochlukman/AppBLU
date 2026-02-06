using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp2dbpk
    {
        public long Idbpk { get; set; }
        public long Idsp2d { get; set; }
        public DateTime? Datecreate { get; set; }

        public Bpk IdbpkNavigation { get; set; }
        public Sp2d Idsp2dNavigation { get; set; }
    }
}
