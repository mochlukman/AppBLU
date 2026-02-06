using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Rkadetd
    {
        public Rkadetd()
        {
            Rkatapddetd = new HashSet<Rkatapddetd>();
        }

        public long Idrkadetd { get; set; }
        public long? Idrkadetdx { get; set; }
        public long Idrkad { get; set; }
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
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }
        public long? Idrkadetdduk { get; set; }

        public Rkad IdrkadNavigation { get; set; }
        public ICollection<Rkatapddetd> Rkatapddetd { get; set; }
    }
}
