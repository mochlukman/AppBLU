using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Rkadanab
    {
        public long Idrkadanab { get; set; }
        public long? Idrkadanabx { get; set; }
        public long Idrkab { get; set; }
        public long? Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Rkab IdrkabNavigation { get; set; }
    }
}
