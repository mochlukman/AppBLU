using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Rkadetr
    {
        public Rkadetr()
        {
            Rkatapddetr = new HashSet<Rkatapddetr>();
        }

        public long Idrkadetr { get; set; }
        public long? Idrkadetrx { get; set; }
        public long Idrkar { get; set; }
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
        public long? Idjdana { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }
        public long? Idrkadetrduk { get; set; }

        public Jdana IdjdanaNavigation { get; set; }
        public Rkar IdrkarNavigation { get; set; }
        public Ssh IdsshNavigation { get; set; }
        public ICollection<Rkatapddetr> Rkatapddetr { get; set; }
    }
}
