using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Berita
    {
        public Berita()
        {
            Beritadetr = new HashSet<Beritadetr>();
        }

        public long Idberita { get; set; }
        public long Idunit { get; set; }
        public long Idkeg { get; set; }
        public string Noberita { get; set; }
        public DateTime Tglba { get; set; }
        public long Idkontrak { get; set; }
        public string UraiBerita { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Kontrak IdkontrakNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public ICollection<Beritadetr> Beritadetr { get; set; }
    }
}
