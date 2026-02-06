using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp2b
    {
        public Sp2b()
        {
            Sp2bdet = new HashSet<Sp2bdet>();
        }

        public long Idsp2b { get; set; }
        public string Nosp2b { get; set; }
        public long? Idunit { get; set; }
        public DateTime? Tglsp2b { get; set; }
        public string Uraian { get; set; }
        public string Validby { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public ICollection<Sp2bdet> Sp2bdet { get; set; }
    }
}
