using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bktmemdetr
    {
        public long Idbmdetr { get; set; }
        public long Idbm { get; set; }
        public long Idrek { get; set; }
        public long Idkeg { get; set; }
        public string Kdpers { get; set; }
        public decimal? Nilai { get; set; }

        public Bktmem IdbmNavigation { get; set; }
        public Mkegiatan IdkegNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
    }
}
