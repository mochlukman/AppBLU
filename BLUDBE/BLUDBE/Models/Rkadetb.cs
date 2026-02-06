using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Rkadetb
    {
        public Rkadetb()
        {
            Rkatapddetb = new HashSet<Rkatapddetb>();
        }

        public long Idrkadetb { get; set; }
        public long? Idrkadetbx { get; set; }
        public long Idrkab { get; set; }
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
        public long? Idrkadetbduk { get; set; }

        public Rkab IdrkabNavigation { get; set; }
        public ICollection<Rkatapddetb> Rkatapddetb { get; set; }
    }
}
