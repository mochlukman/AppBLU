using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bpkspj
    {
        public long Idbpkspj { get; set; }
        public long Idbpk { get; set; }
        public long Idspj { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bpk IdbpkNavigation { get; set; }
        public Spj IdspjNavigation { get; set; }
    }
}
