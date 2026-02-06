using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Daftdok
    {
        public Daftdok()
        {
            Jabttd = new HashSet<Jabttd>();
        }

        public long Iddaftdok { get; set; }
        public string Kddok { get; set; }
        public string Nmdok { get; set; }
        public string Ket { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public ICollection<Jabttd> Jabttd { get; set; }
    }
}
