using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bpkdetrp
    {
        public Bpkdetrp()
        {
            Bpkpajakstr = new HashSet<Bpkpajakstr>();
        }

        public long Idbpkdetrp { get; set; }
        public long Idbpkdetr { get; set; }
        public long Idpajak { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bpkdetr IdbpkdetrNavigation { get; set; }
        public Pajak IdpajakNavigation { get; set; }
        public ICollection<Bpkpajakstr> Bpkpajakstr { get; set; }
    }
}
