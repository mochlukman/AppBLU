using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Stdharga
    {
        public long Idstdharga { get; set; }
        public string Kdjnsstd { get; set; }
        public string Nostd { get; set; }
        public string Nmstd { get; set; }
        public string Spekstd { get; set; }
        public string Merkstd { get; set; }
        public string Kdsatuan { get; set; }
        public decimal? Hrgstd { get; set; }
        public string Ket { get; set; }
        public string Stvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
