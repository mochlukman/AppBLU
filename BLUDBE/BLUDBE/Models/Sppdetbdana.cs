using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sppdetbdana
    {
        public long Idsppdetbdana { get; set; }
        public long Idsppdetb { get; set; }
        public long Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Jdana IdjdanaNavigation { get; set; }
        public Sppdetb IdsppdetbNavigation { get; set; }
    }
}
