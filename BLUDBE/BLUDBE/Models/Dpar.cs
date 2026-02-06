using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpar
    {
        public Dpar()
        {
            Dpablnr = new HashSet<Dpablnr>();
            Dpadanar = new HashSet<Dpadanar>();
            Dpadetr = new HashSet<Dpadetr>();
        }

        public long Iddpar { get; set; }
        public long Iddpa { get; set; }
        public string Kdtahap { get; set; }
        public long Idkeg { get; set; }
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
        public decimal? UpGu { get; set; }
        public decimal? Ls { get; set; }
        public decimal? Tu { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Dpa IddpaNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public ICollection<Dpablnr> Dpablnr { get; set; }
        public ICollection<Dpadanar> Dpadanar { get; set; }
        public ICollection<Dpadetr> Dpadetr { get; set; }
    }
}
