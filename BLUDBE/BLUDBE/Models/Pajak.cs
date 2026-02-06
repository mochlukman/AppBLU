using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Pajak
    {
        public Pajak()
        {
            Bkpajakdetstr = new HashSet<Bkpajakdetstr>();
            Bpkpajakdet = new HashSet<Bpkpajakdet>();
            Sp2ddetrp = new HashSet<Sp2ddetrp>();
            Sppdetrp = new HashSet<Sppdetrp>();
        }

        public long Idpajak { get; set; }
        public string Kdpajak { get; set; }
        public string Nmpajak { get; set; }
        public string Kdper { get; set; }
        public string Uraian { get; set; }
        public string Keterangan { get; set; }
        public string Rumuspajak { get; set; }
        public long? Idjnspajak { get; set; }
        public int? Staktif { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jnspajak IdjnspajakNavigation { get; set; }
        public ICollection<Bkpajakdetstr> Bkpajakdetstr { get; set; }
        public ICollection<Bpkpajakdet> Bpkpajakdet { get; set; }
        public ICollection<Sp2ddetrp> Sp2ddetrp { get; set; }
        public ICollection<Sppdetrp> Sppdetrp { get; set; }
    }
}
