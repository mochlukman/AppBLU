using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Rkadanar
    {
        public long Idrkadanar { get; set; }
        public long? Idrkadanarx { get; set; }
        public long Idrkar { get; set; }
        public long Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Rkar IdrkarNavigation { get; set; }
    }
}
