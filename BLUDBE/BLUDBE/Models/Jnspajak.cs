using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jnspajak
    {
        public Jnspajak()
        {
            Pajak = new HashSet<Pajak>();
            Setmappfk = new HashSet<Setmappfk>();
        }

        public long Idjnspajak { get; set; }
        public string Kdjnspajak { get; set; }
        public string Nmjnspajak { get; set; }

        public ICollection<Pajak> Pajak { get; set; }
        public ICollection<Setmappfk> Setmappfk { get; set; }
    }
}
