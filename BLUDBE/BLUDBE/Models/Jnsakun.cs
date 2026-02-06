using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jnsakun
    {
        public Jnsakun()
        {
            Daftrekening = new HashSet<Daftrekening>();
            Saldoawallo = new HashSet<Saldoawallo>();
            Saldoawallra = new HashSet<Saldoawallra>();
        }

        public long Idjnsakun { get; set; }
        public string Uraiakun { get; set; }
        public string Kdpers { get; set; }

        public ICollection<Daftrekening> Daftrekening { get; set; }
        public ICollection<Saldoawallo> Saldoawallo { get; set; }
        public ICollection<Saldoawallra> Saldoawallra { get; set; }
    }
}
