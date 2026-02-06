using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Kontrak
    {
        public Kontrak()
        {
            Adendum = new HashSet<Adendum>();
            Berita = new HashSet<Berita>();
            Kontrakdetr = new HashSet<Kontrakdetr>();
            Sp2d = new HashSet<Sp2d>();
            Spm = new HashSet<Spm>();
            Spp = new HashSet<Spp>();
            Tagihan = new HashSet<Tagihan>();
        }

        public long Idkontrak { get; set; }
        public long Idunit { get; set; }
        public string Nokontrak { get; set; }
        public long Idphk3 { get; set; }
        public long Idkeg { get; set; }
        public DateTime? Tglkontrak { get; set; }
        public DateTime? Tglakhirkontrak { get; set; }
        public string Uraian { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Mkegiatan IdkegNavigation { get; set; }
        public Daftphk3 Idphk3Navigation { get; set; }
        public ICollection<Adendum> Adendum { get; set; }
        public ICollection<Berita> Berita { get; set; }
        public ICollection<Kontrakdetr> Kontrakdetr { get; set; }
        public ICollection<Sp2d> Sp2d { get; set; }
        public ICollection<Spm> Spm { get; set; }
        public ICollection<Spp> Spp { get; set; }
        public ICollection<Tagihan> Tagihan { get; set; }
    }
}
