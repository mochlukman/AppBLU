using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Spjspp
    {
        public long Idsppspj { get; set; }
        public long Idspj { get; set; }
        public long Idspp { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public string Idbpk { get; set; }

        public Spj IdspjNavigation { get; set; }
        public Spp IdsppNavigation { get; set; }
    }
}
