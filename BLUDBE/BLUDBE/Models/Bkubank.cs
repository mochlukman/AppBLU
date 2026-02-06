using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bkubank
    {
        public long Idbkubank { get; set; }
        public string Nobkuskpd { get; set; }
        public long? Idunit { get; set; }
        public long? Idttd { get; set; }
        public DateTime? Tglbkuskpd { get; set; }
        public long Idbkbank { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglvalid { get; set; }
        public long? Idbend { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Bkbank IdbkbankNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
    }
}
