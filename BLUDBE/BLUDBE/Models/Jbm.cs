using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jbm
    {
        public Jbm()
        {
            Bktmem = new HashSet<Bktmem>();
        }

        public long Idjbm { get; set; }
        public string Kdbm { get; set; }
        public string Nmbm { get; set; }

        public ICollection<Bktmem> Bktmem { get; set; }
    }
}
