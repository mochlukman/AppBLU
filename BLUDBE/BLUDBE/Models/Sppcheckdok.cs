using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sppcheckdok
    {
        public long Idsppcheck { get; set; }
        public long Idspp { get; set; }
        public long Idcheck { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Checkdok IdcheckNavigation { get; set; }
        public Spp IdsppNavigation { get; set; }
    }
}
