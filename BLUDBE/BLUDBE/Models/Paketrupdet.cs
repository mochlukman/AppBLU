using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Paketrupdet
    {
        public long Idrupdet { get; set; }
        public long? Idrup { get; set; }
        public string Koderup { get; set; }
        public string Nmpaket { get; set; }
        public string Lokasi { get; set; }
        public string Volume { get; set; }
        public string Uraipaket { get; set; }
        public long? Idjnspekerjaan { get; set; }
        public DateTime? Awalpekerjaan { get; set; }
        public DateTime? Akhirpekerjaan { get; set; }
        public long Idjdana { get; set; }
        public long Idphk3 { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jdana IdjdanaNavigation { get; set; }
        public Jpekerjaan IdjnspekerjaanNavigation { get; set; }
        public Daftphk3 Idphk3Navigation { get; set; }
    }
}
