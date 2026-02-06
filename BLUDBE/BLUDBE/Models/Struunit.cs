using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Struunit
    {
        public Struunit()
        {
            Daftunit = new HashSet<Daftunit>();
            Dafturus = new HashSet<Dafturus>();
        }

        public long Idstruunit { get; set; }
        public int Kdlevel { get; set; }
        public string Nmlevel { get; set; }
        public string Numdigit { get; set; }

        public ICollection<Daftunit> Daftunit { get; set; }
        public ICollection<Dafturus> Dafturus { get; set; }
    }
}
