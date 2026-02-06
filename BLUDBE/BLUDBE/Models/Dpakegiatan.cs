using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpakegiatan
    {
        public long Iddpakeg { get; set; }
        public long Idkeg { get; set; }
        public long Iddpapgrm { get; set; }
        public int? Noprior { get; set; }
        public long Idsifatkeg { get; set; }
        public long? Idpeg { get; set; }
        public DateTime? Tglakhir { get; set; }
        public DateTime? Tglawal { get; set; }
        public decimal? Targetp { get; set; }
        public string Lokasi { get; set; }
        public decimal? Pagu { get; set; }
        public string Sasaran { get; set; }
        public string Ketkeg { get; set; }
        public string Idprioda { get; set; }
        public string Idsas { get; set; }
        public string Target { get; set; }
        public string Targetif { get; set; }
        public string Targetsen { get; set; }
        public string Volume { get; set; }
        public string Volume1 { get; set; }
        public string Satuan { get; set; }
        public decimal? Paguplus { get; set; }
        public decimal? Pagutif { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Dpaprogram IddpapgrmNavigation { get; set; }
        public Mkegiatan IdkegNavigation { get; set; }
        public Pegawai IdpegNavigation { get; set; }
    }
}
