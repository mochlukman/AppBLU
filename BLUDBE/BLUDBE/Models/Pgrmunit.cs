using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Pgrmunit
    {
        public Pgrmunit()
        {
            Kegunit = new HashSet<Kegunit>();
        }

        public long Idpgrmunit { get; set; }
        public long? Idpgrmunitx { get; set; }
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
        public long Idprgrm { get; set; }
        public string Target { get; set; }
        public string Sasaran { get; set; }
        public int? Noprio { get; set; }
        public string Indikator { get; set; }
        public string Ket { get; set; }
        public string Idsas { get; set; }
        public DateTime? Tglvalid { get; set; }
        public int? Idxkode { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Mpgrm IdprgrmNavigation { get; set; }
        public Sasaranthn IdsasNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public Tahap KdtahapNavigation { get; set; }
        public ICollection<Kegunit> Kegunit { get; set; }
    }
}
