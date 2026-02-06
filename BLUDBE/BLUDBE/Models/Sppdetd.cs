using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sppdetd
    {
        public long Idsppdetd { get; set; }
        public long Idrek { get; set; }
        public long Idspp { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Jtrnlkas IdnojetraNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public Spp IdsppNavigation { get; set; }
    }
}
