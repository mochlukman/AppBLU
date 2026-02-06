using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Rkad
    {
        public Rkad()
        {
            Rkadanad = new HashSet<Rkadanad>();
            Rkadetd = new HashSet<Rkadetd>();
            Rkatapdd = new HashSet<Rkatapdd>();
        }

        public long Idrkad { get; set; }
        public long? Idrkadx { get; set; }
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Daftrekening IdrekNavigation { get; set; }
        public ICollection<Rkadanad> Rkadanad { get; set; }
        public ICollection<Rkadetd> Rkadetd { get; set; }
        public ICollection<Rkatapdd> Rkatapdd { get; set; }
    }
}
