using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Tagihandet
    {
        public long Idtagihandet { get; set; }
        public long Idtagihan { get; set; }
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Daftrekening IdrekNavigation { get; set; }
        public Tagihan IdtagihanNavigation { get; set; }
    }
}
