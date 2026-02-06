using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jpekerjaan
    {
        public Jpekerjaan()
        {
            Paketrup = new HashSet<Paketrup>();
            Paketrupdet = new HashSet<Paketrupdet>();
        }

        public long Idjnspekerjaan { get; set; }
        public string Uraian { get; set; }

        public ICollection<Paketrup> Paketrup { get; set; }
        public ICollection<Paketrupdet> Paketrupdet { get; set; }
    }
}
