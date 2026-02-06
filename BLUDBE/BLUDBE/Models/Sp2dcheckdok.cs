using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp2dcheckdok
    {
        public long Idsp2dcheck { get; set; }
        public long Idsp2d { get; set; }
        public long Idcheck { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Checkdok IdcheckNavigation { get; set; }
        public Sp2d Idsp2dNavigation { get; set; }
    }
}
