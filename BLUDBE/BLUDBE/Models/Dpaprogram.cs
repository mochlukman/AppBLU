using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpaprogram
    {
        public Dpaprogram()
        {
            Dpakegiatan = new HashSet<Dpakegiatan>();
        }

        public long Iddpapgrm { get; set; }
        public long Idprgrm { get; set; }
        public long? Idunit { get; set; }
        public string Kdtahap { get; set; }
        public int? Idprioda { get; set; }
        public int? Idprioprov { get; set; }
        public int? Idprionas { get; set; }
        public DateTime? Tglvalid { get; set; }
        public int? Idxkode { get; set; }
        public bool? Staktif { get; set; }
        public int? Stvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Mpgrm IdprgrmNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public ICollection<Dpakegiatan> Dpakegiatan { get; set; }
    }
}
