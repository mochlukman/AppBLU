using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Userkegiatan
    {
        public string Userid { get; set; }
        public long Idkeg { get; set; }
        public string Assignby { get; set; }
        public DateTime? Assigndate { get; set; }

        public Mkegiatan IdkegNavigation { get; set; }
        public Webuser User { get; set; }
    }
}
