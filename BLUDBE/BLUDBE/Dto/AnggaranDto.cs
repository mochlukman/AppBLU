using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class PgrmunitView
    {
        public long Idpgrmunit { get; set; }
        public long? Idpgrmunitx { get; set; }
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
        public long Idprgrm { get; set; }
        public string Target { get; set; }
        public string Sasaran { get; set; }
        public int? Noprio { get; set; }
        public string Indikator { get; set; }
        public string Ket { get; set; }
        public string Idsas { get; set; }
        public DateTime? Tglvalid { get; set; }
        public int? Idxkode { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Mpgrm IdprgrmNavigation { get; set; }
        public Sasaranthn IdsasNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public Tahap KdtahapNavigation { get; set; }
        public ICollection<Kegunit> Kegunit { get; set; }
        public Pgrmunit Pgrmunitx { get; set; }
    }
    public class KegsbdanaView
    {
        public long Idkegdana { get; set; }
        public long? Idkegdanax { get; set; }
        public long Idkegunit { get; set; }
        public long Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jdana IdjdanaNavigation { get; set; }
        public Kegunit IdkegunitNavigation { get; set; }
        public Kegsbdana Kegsbdana { get; set; }
    }
    public partial class KinkegView
    {
        public long Idkinkeg { get; set; }
        public long? Idkinkegx { get; set; }
        public long Idkegunit { get; set; }
        public string Kdjkk { get; set; }
        public string Nomor { get; set; }
        public string Tolokur { get; set; }
        public decimal? Target { get; set; }
        public string Satuan { get; set; }
        public string Keterangan { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Kegunit IdkegunitNavigation { get; set; }
        public Jkinkeg KdjkkNavigation { get; set; }
        public Kinkeg Kinkegx { get; set; }
    }
}
