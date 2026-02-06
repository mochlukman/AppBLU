using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Daftbank
    {
        public Daftbank()
        {
            Bend = new HashSet<Bend>();
            Daftphk3 = new HashSet<Daftphk3>();
        }

        public long Idbank { get; set; }
        public string Kdbank { get; set; }
        public string Akbank { get; set; }
        public string Alamat { get; set; }
        public string Telepon { get; set; }
        public string Cabang { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public ICollection<Bend> Bend { get; set; }
        public ICollection<Daftphk3> Daftphk3 { get; set; }
    }
}
