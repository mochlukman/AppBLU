using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sifatkeg
    {
        public Sifatkeg()
        {
            Kegunit = new HashSet<Kegunit>();
        }

        public long Idsifatkeg { get; set; }
        public string Kdsifat { get; set; }
        public string Nmsifat { get; set; }

        public ICollection<Kegunit> Kegunit { get; set; }
    }
}
