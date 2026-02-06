using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Spptag
    {
        public long Idspptag { get; set; }
        public long Idspp { get; set; }
        public long Idtagihan { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Spp IdsppNavigation { get; set; }
        public Tagihan IdtagihanNavigation { get; set; }
    }
}
