using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jkirim
    {
        public Jkirim()
        {
            Bkpajak = new HashSet<Bkpajak>();
            Bpk = new HashSet<Bpk>();
            Sts = new HashSet<Sts>();
            Tbpl = new HashSet<Tbpl>();
        }

        public int Stkirim { get; set; }
        public string Uraikirim { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public ICollection<Bkpajak> Bkpajak { get; set; }
        public ICollection<Bpk> Bpk { get; set; }
        public ICollection<Sts> Sts { get; set; }
        public ICollection<Tbpl> Tbpl { get; set; }
    }
}
