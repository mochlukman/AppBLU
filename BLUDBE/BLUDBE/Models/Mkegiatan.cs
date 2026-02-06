using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Mkegiatan
    {
        public Mkegiatan()
        {
            Adendum = new HashSet<Adendum>();
            Bktmemdetr = new HashSet<Bktmemdetr>();
            Dpakegiatan = new HashSet<Dpakegiatan>();
            Kegunit = new HashSet<Kegunit>();
            Kontrak = new HashSet<Kontrak>();
            Prognosisr = new HashSet<Prognosisr>();
            Rkar = new HashSet<Rkar>();
            Spjapbd = new HashSet<Spjapbd>();
            Stsdetr = new HashSet<Stsdetr>();
            Tbpdetr = new HashSet<Tbpdetr>();
            Tbpdettkeg = new HashSet<Tbpdettkeg>();
            Userkegiatan = new HashSet<Userkegiatan>();
        }

        public long Idkeg { get; set; }
        public long Idprgrm { get; set; }
        public long? Kdperspektif { get; set; }
        public string Nukeg { get; set; }
        public string Nmkegunit { get; set; }
        public int? Levelkeg { get; set; }
        public string Type { get; set; }
        public long? Idkeginduk { get; set; }
        public bool? Staktif { get; set; }
        public bool? Stvalid { get; set; }
        public int? Jnskeg { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Mpgrm IdprgrmNavigation { get; set; }
        public Jkeg JnskegNavigation { get; set; }
        public ICollection<Adendum> Adendum { get; set; }
        public ICollection<Bktmemdetr> Bktmemdetr { get; set; }
        public ICollection<Dpakegiatan> Dpakegiatan { get; set; }
        public ICollection<Kegunit> Kegunit { get; set; }
        public ICollection<Kontrak> Kontrak { get; set; }
        public ICollection<Prognosisr> Prognosisr { get; set; }
        public ICollection<Rkar> Rkar { get; set; }
        public ICollection<Spjapbd> Spjapbd { get; set; }
        public ICollection<Stsdetr> Stsdetr { get; set; }
        public ICollection<Tbpdetr> Tbpdetr { get; set; }
        public ICollection<Tbpdettkeg> Tbpdettkeg { get; set; }
        public ICollection<Userkegiatan> Userkegiatan { get; set; }
    }
}
