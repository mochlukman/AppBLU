using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bpkdetr
    {
        public Bpkdetr()
        {
            Bpkdetrdana = new HashSet<Bpkdetrdana>();
        }

        public long Idbpkdetr { get; set; }
        public long Idbpk { get; set; }
        public long Idkeg { get; set; }
        public long Idrek { get; set; }
        public long? Idjdana { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bpk IdbpkNavigation { get; set; }
        public Jdana IdjdanaNavigation { get; set; }
        public Jtrnlkas IdnojetraNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public ICollection<Bpkdetrdana> Bpkdetrdana { get; set; }
    }
}
