using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Rkab
    {
        public Rkab()
        {
            Rkadanab = new HashSet<Rkadanab>();
            Rkadetb = new HashSet<Rkadetb>();
            Rkatapdb = new HashSet<Rkatapdb>();
        }

        public long Idrkab { get; set; }
        public long? Idrkabx { get; set; }
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
        public int? Trkr { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Daftrekening IdrekNavigation { get; set; }
        public ICollection<Rkadanab> Rkadanab { get; set; }
        public ICollection<Rkadetb> Rkadetb { get; set; }
        public ICollection<Rkatapdb> Rkatapdb { get; set; }
    }
}
