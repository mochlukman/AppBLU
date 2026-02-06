using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Ppk
    {
        public Ppk()
        {
            Sp2d = new HashSet<Sp2d>();
        }

        public long Idppk { get; set; }
        public long? Idunit { get; set; }
        public long Idpeg { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Pegawai IdpegNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public ICollection<Sp2d> Sp2d { get; set; }
    }
}
