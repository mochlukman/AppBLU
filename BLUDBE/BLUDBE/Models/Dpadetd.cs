using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpadetd
    {
        public long Iddpadetd { get; set; }
        public long Iddpad { get; set; }
        public string Kdjabar { get; set; }
        public string Uraian { get; set; }
        public decimal? Jumbyek { get; set; }
        public long? Idsatuan { get; set; }
        public string Satuan { get; set; }
        public decimal? Tarif { get; set; }
        public decimal? Subtotal { get; set; }
        public string Ekspresi { get; set; }
        public bool? Inclsubtotal { get; set; }
        public string Type { get; set; }
        public long? Idstdharga { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long? Iddpadetdduk { get; set; }

        public Dpad IddpadNavigation { get; set; }
    }
}
