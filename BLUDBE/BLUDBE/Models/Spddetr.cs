using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Spddetr
    {
        public long Idspddetr { get; set; }
        public long Idspd { get; set; }
        public long Idkeg { get; set; }
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Daftrekening IdrekNavigation { get; set; }
        public Spd IdspdNavigation { get; set; }
    }
}
