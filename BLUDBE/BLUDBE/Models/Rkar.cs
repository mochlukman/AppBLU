using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Rkar
    {
        public Rkar()
        {
            Rkadanar = new HashSet<Rkadanar>();
            Rkadetr = new HashSet<Rkadetr>();
            Rkatapdr = new HashSet<Rkatapdr>();
        }

        public long Idrkar { get; set; }
        public long? Idrkarx { get; set; }
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
        public long Idkeg { get; set; }
        public long? Idkegunit { get; set; }
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Mkegiatan IdkegNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public ICollection<Rkadanar> Rkadanar { get; set; }
        public ICollection<Rkadetr> Rkadetr { get; set; }
        public ICollection<Rkatapdr> Rkatapdr { get; set; }
    }
}
