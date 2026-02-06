using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Strurek
    {
        public Strurek()
        {
            Daftbarang = new HashSet<Daftbarang>();
        }

        public long Idstrurek { get; set; }
        public int Mtglevel { get; set; }
        public string Nmlevel { get; set; }

        public ICollection<Daftbarang> Daftbarang { get; set; }
    }
}
