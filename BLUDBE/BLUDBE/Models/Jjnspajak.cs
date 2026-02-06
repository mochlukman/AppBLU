using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jjnspajak
    {
        public Jjnspajak()
        {
            Pajak = new HashSet<Pajak>();
        }

        public int Idjnspajak { get; set; }
        public string Nmjnspajak { get; set; }

        public ICollection<Pajak> Pajak { get; set; }
    }
}
