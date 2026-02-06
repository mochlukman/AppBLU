using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Paketrup
    {
        public Paketrup()
        {
            Diskusipaket = new HashSet<Diskusipaket>();
        }

        public long Idrup { get; set; }
        public int? Jnsrup { get; set; }
        public int? Tipeswakelola { get; set; }
        public string Uraitipeswakelola { get; set; }
        public long Idunit { get; set; }
        public long Idkeg { get; set; }
        public decimal? Nilaipagu { get; set; }
        public string Koderup { get; set; }
        public string Nmpaket { get; set; }
        public string Idlokasi { get; set; }
        public string Lokasi { get; set; }
        public string Volume { get; set; }
        public string Uraipaket { get; set; }
        public long? Idjnspekerjaan { get; set; }
        public long? Idmetodepengadaan { get; set; }
        public int? Status { get; set; }
        public DateTime? Waktupemilihan { get; set; }
        public DateTime? Awalpekerjaan { get; set; }
        public DateTime? Akhirpekerjaan { get; set; }
        public long? Idjdana { get; set; }
        public long? Idphk3 { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public bool? A { get; set; }
        public bool? Fd { get; set; }
        public bool? U { get; set; }
        public string Createdby { get; set; }
        public DateTime? Awalpemanfaatan { get; set; }
        public DateTime? Akhirpemanfaatan { get; set; }
        public DateTime? Awalpelaksanaankontrak { get; set; }
        public DateTime? Akhirpelaksanaankontrak { get; set; }
        public DateTime? Awalpemilihan { get; set; }
        public DateTime? Akhirpemilihan { get; set; }

        public Jpekerjaan IdjnspekerjaanNavigation { get; set; }
        public Metodepengadaan IdmetodepengadaanNavigation { get; set; }
        public ICollection<Diskusipaket> Diskusipaket { get; set; }
    }
}
