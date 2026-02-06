using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Spmcheckdok
    {
        public long Idspmcheck { get; set; }
        public long Idspm { get; set; }
        public long Idcheck { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Checkdok IdcheckNavigation { get; set; }
        public Spm IdspmNavigation { get; set; }
    }
}
