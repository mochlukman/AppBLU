using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpad
    {
        public Dpad()
        {
            Dpablnd = new HashSet<Dpablnd>();
            Dpadanad = new HashSet<Dpadanad>();
            Dpadetd = new HashSet<Dpadetd>();
        }

        public long Iddpad { get; set; }
        public long Iddpa { get; set; }
        public string Kdtahap { get; set; }
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Dpa IddpaNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public Tahap KdtahapNavigation { get; set; }
        public ICollection<Dpablnd> Dpablnd { get; set; }
        public ICollection<Dpadanad> Dpadanad { get; set; }
        public ICollection<Dpadetd> Dpadetd { get; set; }
    }
}
