using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jabttd
    {
        public Jabttd()
        {
            Sp2d = new HashSet<Sp2d>();
            Spd = new HashSet<Spd>();
        }

        public long Idttd { get; set; }
        public long Idunit { get; set; }
        public long Idpeg { get; set; }
        public string Kddok { get; set; }
        public string Jabatan { get; set; }
        public string Noskpttd { get; set; }
        public DateTime? Tglskpttd { get; set; }
        public string Noskstopttd { get; set; }
        public DateTime? Tglskstopttd { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Pegawai IdpegNavigation { get; set; }
        public Daftdok KddokNavigation { get; set; }
        public ICollection<Sp2d> Sp2d { get; set; }
        public ICollection<Spd> Spd { get; set; }
    }
}
