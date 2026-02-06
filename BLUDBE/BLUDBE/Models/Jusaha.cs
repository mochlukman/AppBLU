using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jusaha
    {
        public Jusaha()
        {
            Daftphk3 = new HashSet<Daftphk3>();
        }

        public long Idjusaha { get; set; }
        public string Badanusaha { get; set; }
        public string Keterangan { get; set; }
        public string Akronim { get; set; }

        public ICollection<Daftphk3> Daftphk3 { get; set; }
    }
}
