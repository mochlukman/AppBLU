using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp3b
    {
        public Sp3b()
        {
            Sp2bdet = new HashSet<Sp2bdet>();
            Sp3bdet = new HashSet<Sp3bdet>();
        }

        public long Idsp3b { get; set; }
        public long Idunit { get; set; }
        public string Nosp3b { get; set; }
        public DateTime? Tglsp3b { get; set; }
        public string Uraisp3b { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Validby { get; set; }
        public long? Keybend { get; set; }
        public bool? Valid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Daftunit IdunitNavigation { get; set; }
        public ICollection<Sp2bdet> Sp2bdet { get; set; }
        public ICollection<Sp3bdet> Sp3bdet { get; set; }
    }
}
