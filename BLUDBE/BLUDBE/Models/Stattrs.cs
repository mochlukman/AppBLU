using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Stattrs
    {
        public Stattrs()
        {
            Bkbank = new HashSet<Bkbank>();
            Bkpajak = new HashSet<Bkpajak>();
            Bpk = new HashSet<Bpk>();
            Bpkpajak = new HashSet<Bpkpajak>();
            Bpkpajakstr = new HashSet<Bpkpajakstr>();
            Panjar = new HashSet<Panjar>();
            Sp2d = new HashSet<Sp2d>();
            Sp2dntpn = new HashSet<Sp2dntpn>();
            Spm = new HashSet<Spm>();
            Spp = new HashSet<Spp>();
            Sts = new HashSet<Sts>();
            Tbp = new HashSet<Tbp>();
        }

        public string Kdstatus { get; set; }
        public string Lblstatus { get; set; }
        public string Uraian { get; set; }

        public ICollection<Bkbank> Bkbank { get; set; }
        public ICollection<Bkpajak> Bkpajak { get; set; }
        public ICollection<Bpk> Bpk { get; set; }
        public ICollection<Bpkpajak> Bpkpajak { get; set; }
        public ICollection<Bpkpajakstr> Bpkpajakstr { get; set; }
        public ICollection<Panjar> Panjar { get; set; }
        public ICollection<Sp2d> Sp2d { get; set; }
        public ICollection<Sp2dntpn> Sp2dntpn { get; set; }
        public ICollection<Spm> Spm { get; set; }
        public ICollection<Spp> Spp { get; set; }
        public ICollection<Sts> Sts { get; set; }
        public ICollection<Tbp> Tbp { get; set; }
    }
}
