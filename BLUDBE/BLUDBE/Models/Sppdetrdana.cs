using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sppdetrdana
    {
        public long Idsppdetrdana { get; set; }
        public long Idsppdetr { get; set; }
        public long Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Jdana IdjdanaNavigation { get; set; }
        public Sppdetr IdsppdetrNavigation { get; set; }
    }
}
