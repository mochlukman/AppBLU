using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sppbpk
    {
        public long Idsppbpk { get; set; }
        public long Idbpk { get; set; }
        public long Idspp { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Bpk IdbpkNavigation { get; set; }
        public Spp IdsppNavigation { get; set; }
    }
}
