using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jrek
    {
        public Jrek()
        {
            Daftrekening = new HashSet<Daftrekening>();
        }

        public int Jnsrek { get; set; }
        public string Uraian { get; set; }

        public ICollection<Daftrekening> Daftrekening { get; set; }
    }
}
