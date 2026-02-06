using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Paguskpd
    {
        public long Idpaguskpd { get; set; }
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
        public decimal? Nilaiup { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Tahap KdtahapNavigation { get; set; }
    }
}
