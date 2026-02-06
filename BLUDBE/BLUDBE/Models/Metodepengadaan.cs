using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Metodepengadaan
    {
        public Metodepengadaan()
        {
            Paketrup = new HashSet<Paketrup>();
        }

        public long Idmetodepengadaan { get; set; }
        public string Kode { get; set; }
        public string Uraian { get; set; }

        public ICollection<Paketrup> Paketrup { get; set; }
    }
}
