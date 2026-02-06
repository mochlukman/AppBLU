using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Saldoawallak
    {
        public long Idsaldo { get; set; }
        public long Idunit { get; set; }
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
        public string Stvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Daftreklak IdrekNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
    }
}
