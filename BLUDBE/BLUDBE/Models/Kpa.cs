using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Kpa
    {
        public long Idkpa { get; set; }
        public long Idpeg { get; set; }
        public string Jabatan { get; set; }
        public DateTime? Datecreate { get; set; }

        public Pegawai IdpegNavigation { get; set; }
    }
}
