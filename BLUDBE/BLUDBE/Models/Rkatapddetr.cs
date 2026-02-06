using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Rkatapddetr
    {
        public long Idtapddetr { get; set; }
        public long? Idrkadetr { get; set; }
        public long? Idpeg { get; set; }
        public string Nomor { get; set; }
        public string Verifikasi { get; set; }
        public DateTime? Tanggal { get; set; }
        public string Keterangan { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Pegawai IdpegNavigation { get; set; }
        public Rkadetr IdrkadetrNavigation { get; set; }
    }
}
