using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jnslak
    {
        public Jnslak()
        {
            Daftreklak = new HashSet<Daftreklak>();
        }

        public int Idjnslak { get; set; }
        public string Uraijnslak { get; set; }

        public ICollection<Daftreklak> Daftreklak { get; set; }
    }
}
