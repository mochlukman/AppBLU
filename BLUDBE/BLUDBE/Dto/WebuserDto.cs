using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class WebuserView
    {
        public string Userid { get; set; }
        public long? Idunit { get; set; }
        public string Kdtahap { get; set; }
        public long? Idpeg { get; set; }
        public long? Groupid { get; set; }
        public string Nama { get; set; }
        public string Email { get; set; }
        public int? Blokid { get; set; }
        public bool? Transecure { get; set; }
        public bool? Stmaker { get; set; }
        public bool? Stchecker { get; set; }
        public bool? Staproval { get; set; }
        public bool? Stlegitimator { get; set; }
        public bool? Stinsert { get; set; }
        public bool? Stupdate { get; set; }
        public bool? Stdelete { get; set; }
        public string Ket { get; set; }
        public bool? Isauthorized { get; set; }
        public string Authorizedby { get; set; }
        public DateTime? Authorizeddate { get; set; }
        public string Disetujui { get; set; }

        public Webgroup Group { get; set; }
        public Pegawai IdpegNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public string Otorisasi { get; set; }
    }
}
