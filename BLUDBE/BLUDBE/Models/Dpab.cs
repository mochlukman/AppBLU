using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpab
    {
        public Dpab()
        {
            Dpablnb = new HashSet<Dpablnb>();
            Dpadanab = new HashSet<Dpadanab>();
            Dpadetb = new HashSet<Dpadetb>();
        }

        public long Iddpab { get; set; }
        public long Iddpa { get; set; }
        public string Kdtahap { get; set; }
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Dpa IddpaNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public Tahap KdtahapNavigation { get; set; }
        public ICollection<Dpablnb> Dpablnb { get; set; }
        public ICollection<Dpadanab> Dpadanab { get; set; }
        public ICollection<Dpadetb> Dpadetb { get; set; }
    }
}
