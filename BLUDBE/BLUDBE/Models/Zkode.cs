using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Zkode
    {
        public Zkode()
        {
            Bkpajak = new HashSet<Bkpajak>();
            Bpk = new HashSet<Bpk>();
            Checkdok = new HashSet<Checkdok>();
            Kinnon = new HashSet<Kinnon>();
            Mpgrm = new HashSet<Mpgrm>();
            Panjar = new HashSet<Panjar>();
            Sp2d = new HashSet<Sp2d>();
            Sp2dntpn = new HashSet<Sp2dntpn>();
            Spd = new HashSet<Spd>();
            Spm = new HashSet<Spm>();
            Spp = new HashSet<Spp>();
            Sts = new HashSet<Sts>();
            Tbpl = new HashSet<Tbpl>();
        }

        public int Idxkode { get; set; }
        public string Uraian { get; set; }

        public ICollection<Bkpajak> Bkpajak { get; set; }
        public ICollection<Bpk> Bpk { get; set; }
        public ICollection<Checkdok> Checkdok { get; set; }
        public ICollection<Kinnon> Kinnon { get; set; }
        public ICollection<Mpgrm> Mpgrm { get; set; }
        public ICollection<Panjar> Panjar { get; set; }
        public ICollection<Sp2d> Sp2d { get; set; }
        public ICollection<Sp2dntpn> Sp2dntpn { get; set; }
        public ICollection<Spd> Spd { get; set; }
        public ICollection<Spm> Spm { get; set; }
        public ICollection<Spp> Spp { get; set; }
        public ICollection<Sts> Sts { get; set; }
        public ICollection<Tbpl> Tbpl { get; set; }
    }
}
