using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dafturus
    {
        public Dafturus()
        {
            Daftunit = new HashSet<Daftunit>();
            Mpgrm = new HashSet<Mpgrm>();
            Urusanunit = new HashSet<Urusanunit>();
        }

        public long Idurus { get; set; }
        public string Kdurus { get; set; }
        public string Nmurus { get; set; }
        public int Kdlevel { get; set; }
        public string Type { get; set; }
        public string Akrounit { get; set; }
        public string Alamat { get; set; }
        public string Telepon { get; set; }
        public int? Staktif { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Struunit KdlevelNavigation { get; set; }
        public Fungsinit Fungsinit { get; set; }
        public ICollection<Daftunit> Daftunit { get; set; }
        public ICollection<Mpgrm> Mpgrm { get; set; }
        public ICollection<Urusanunit> Urusanunit { get; set; }
    }
}
