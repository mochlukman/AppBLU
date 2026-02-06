using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dp
    {
        public Dp()
        {
            Dpdet = new HashSet<Dpdet>();
        }

        public long Iddp { get; set; }
        public string Nodp { get; set; }
        public int? Idxkode { get; set; }
        public long? Idttd { get; set; }
        public DateTime? Tgldp { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public ICollection<Dpdet> Dpdet { get; set; }
    }
}
