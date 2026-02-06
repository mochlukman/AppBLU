using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jtransfer
    {
        public Jtransfer()
        {
            Bpk = new HashSet<Bpk>();
        }

        public long Idjtransfer { get; set; }
        public int Kdtransfer { get; set; }
        public string Nmtransfer { get; set; }
        public string Uraiantrans { get; set; }
        public decimal? Minnominal { get; set; }
        public string Flagsnom { get; set; }

        public ICollection<Bpk> Bpk { get; set; }
    }
}
