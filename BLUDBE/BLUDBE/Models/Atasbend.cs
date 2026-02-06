using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Atasbend
    {
        public long Idpa { get; set; }
        public long? Idunit { get; set; }
        public long Idpeg { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Pegawai IdpegNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
    }
}
