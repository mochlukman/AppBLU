using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpadetr
    {
        public long Iddpadetr { get; set; }
        public long Iddpar { get; set; }
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
        public long? Idssh { get; set; }
        public long? Idstdharga { get; set; }
        public long? Idjdana { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long? Iddpadetrduk { get; set; }

        public Dpar IddparNavigation { get; set; }
        public Jdana IdjdanaNavigation { get; set; }
        public Ssh IdsshNavigation { get; set; }
    }
}
