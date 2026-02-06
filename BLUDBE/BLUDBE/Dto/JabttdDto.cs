using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class JabttdView
    {
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

        public Daftdok KddokNavigation { get; set; }
        public Pegawai IdpegNavigation { get; set; }
    }
}
