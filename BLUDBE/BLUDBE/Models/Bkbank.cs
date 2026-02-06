using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bkbank
    {
        public Bkbank()
        {
            Bkbankdet = new HashSet<Bkbankdet>();
            Bkubank = new HashSet<Bkubank>();
        }

        public long Idbkbank { get; set; }
        public long Idunit { get; set; }
        public long Idbend { get; set; }
        public string Nobuku { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Tglbuku { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public ICollection<Bkbankdet> Bkbankdet { get; set; }
        public ICollection<Bkubank> Bkubank { get; set; }
    }
}
