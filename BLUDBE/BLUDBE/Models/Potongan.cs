using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Potongan
    {
        public Potongan()
        {
            Sppdetrpot = new HashSet<Sppdetrpot>();
        }

        public long Idpot { get; set; }
        public string Kdpot { get; set; }
        public string Nmpot { get; set; }
        public string Keterangan { get; set; }
        public int? Mtglevel { get; set; }
        public string Type { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public ICollection<Sppdetrpot> Sppdetrpot { get; set; }
    }
}
