using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Doksah
    {
        public Doksah()
        {
            Tahapsah = new HashSet<Tahapsah>();
        }

        public long Id { get; set; }
        public string Kddoksah { get; set; }
        public string Nmdoksah { get; set; }
        public string Ket { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public ICollection<Tahapsah> Tahapsah { get; set; }
    }
}
