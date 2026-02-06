using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Rkadanad
    {
        public long Idrkadanad { get; set; }
        public long? Idrkadanadx { get; set; }
        public long Idrkad { get; set; }
        public long? Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Rkad IdrkadNavigation { get; set; }
    }
}
