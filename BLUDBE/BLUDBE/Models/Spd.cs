using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Spd
    {
        public Spd()
        {
            Spddetb = new HashSet<Spddetb>();
            Spddetr = new HashSet<Spddetr>();
        }

        public long Idspd { get; set; }
        public long Idunit { get; set; }
        public string Nospd { get; set; }
        public DateTime? Tglspd { get; set; }
        public int Idbulan1 { get; set; }
        public int Idbulan2 { get; set; }
        public int Idxkode { get; set; }
        public long? Idttd { get; set; }
        public string Keterangan { get; set; }
        public bool? Valid { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bulan Idbulan1Navigation { get; set; }
        public Bulan Idbulan2Navigation { get; set; }
        public Jabttd IdttdNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public Zkode IdxkodeNavigation { get; set; }
        public ICollection<Spddetb> Spddetb { get; set; }
        public ICollection<Spddetr> Spddetr { get; set; }
    }
}
