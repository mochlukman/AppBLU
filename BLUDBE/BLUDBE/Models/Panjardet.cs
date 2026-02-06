using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Panjardet
    {
        public long Idpanjardet { get; set; }
        public long Idpanjar { get; set; }
        public long Idkeg { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Panjar IdpanjarNavigation { get; set; }
    }
}
