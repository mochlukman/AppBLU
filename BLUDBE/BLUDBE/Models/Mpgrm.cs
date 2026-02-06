using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Mpgrm
    {
        public Mpgrm()
        {
            Dpaprogram = new HashSet<Dpaprogram>();
            Mkegiatan = new HashSet<Mkegiatan>();
            Pgrmunit = new HashSet<Pgrmunit>();
        }

        public long Idprgrm { get; set; }
        public long? Idurus { get; set; }
        public string Nmprgrm { get; set; }
        public string Nuprgrm { get; set; }
        public int? Idprioda { get; set; }
        public int? Idprioprov { get; set; }
        public int? Idprionas { get; set; }
        public int? Idxkode { get; set; }
        public bool? Staktif { get; set; }
        public bool? Stvalid { get; set; }
        public DateTime? Dateupdate { get; set; }
        public DateTime? Datecreate { get; set; }

        public Dafturus IdurusNavigation { get; set; }
        public Zkode IdxkodeNavigation { get; set; }
        public ICollection<Dpaprogram> Dpaprogram { get; set; }
        public ICollection<Mkegiatan> Mkegiatan { get; set; }
        public ICollection<Pgrmunit> Pgrmunit { get; set; }
    }
}
