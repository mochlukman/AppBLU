using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Fungsi
    {
        public Fungsi()
        {
            Fungsinit = new HashSet<Fungsinit>();
        }

        public long Idfung { get; set; }
        public string Kdfung { get; set; }
        public string Nmfung { get; set; }

        public ICollection<Fungsinit> Fungsinit { get; set; }
    }
}
