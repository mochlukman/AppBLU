using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Spjapbd
    {
        public Spjapbd()
        {
            Spjapbddet = new HashSet<Spjapbddet>();
        }

        public long Idspjapbd { get; set; }
        public long Idunit { get; set; }
        public long Idkeg { get; set; }
        public string Nospj { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Tglspj { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public string Keterangan { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Mkegiatan IdkegNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public ICollection<Spjapbddet> Spjapbddet { get; set; }
    }
}
