using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jkeg
    {
        public Jkeg()
        {
            Mkegiatan = new HashSet<Mkegiatan>();
        }

        public int Jnskeg { get; set; }
        public string Uraian { get; set; }

        public ICollection<Mkegiatan> Mkegiatan { get; set; }
    }
}
