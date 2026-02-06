using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Daftphk3
    {
        public Daftphk3()
        {
            Bpk = new HashSet<Bpk>();
            Kontrak = new HashSet<Kontrak>();
            Paketrupdet = new HashSet<Paketrupdet>();
            Skp = new HashSet<Skp>();
            Spm = new HashSet<Spm>();
            Spp = new HashSet<Spp>();
        }

        public long Idphk3 { get; set; }
        public long? Idunit { get; set; }
        public string Nmphk3 { get; set; }
        public string Nminst { get; set; }
        public long? Idbank { get; set; }
        public string Cabangbank { get; set; }
        public string Alamatbank { get; set; }
        public string Norekbank { get; set; }
        public string Namapemilik { get; set; }
        public long? Idjusaha { get; set; }
        public string Alamat { get; set; }
        public string Telepon { get; set; }
        public string Npwp { get; set; }
        public string Warganegara { get; set; }
        public string Stpenduduk { get; set; }
        public int? Stvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Daftbank IdbankNavigation { get; set; }
        public Jusaha IdjusahaNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public ICollection<Bpk> Bpk { get; set; }
        public ICollection<Kontrak> Kontrak { get; set; }
        public ICollection<Paketrupdet> Paketrupdet { get; set; }
        public ICollection<Skp> Skp { get; set; }
        public ICollection<Spm> Spm { get; set; }
        public ICollection<Spp> Spp { get; set; }
    }
}
