using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class Sp2dGet
    {
        public string Kdstatus { get; set; }
        public int Idxkode { get; set; }
        public long Idunit { get; set; }
        public bool Forbpk { get; set; }
        public bool Forbku { get; set; }
        public string Penolakan { get; set; }
        public long Iddp { get; set; } // digunakan untuk get Sp2d berdasarkan List iddp(Daftar Penguji)
        public long? Idkeg { get; set; }
        public long Idbend { get; set; }
    }
    public class Sp2dGetForBkuBud
    {
        public long Idunit { get; set; }
        public long? Idbend { get; set; }
        public int Idxkode { get; set; }
        public string Kdstatus { get; set; }
    }
    public class Sp2dPost
    {
        public long Idsp2d { get; set; }
        [Required]
        public string Nosp2d { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public long? Idspm { get; set; }
        public string Nospm { get; set; }
        public long? Idbend { get; set; }
        public long? Idspd { get; set; }
        public long? Idphk3 { get; set; }
        public long? Idttd { get; set; }
        public int? Idxkode { get; set; }
        [Required]
        public string Noreg { get; set; }
        public string Ketotor { get; set; }
        public long? Idkontrak { get; set; }
        public string Keperluan { get; set; }
        public string Penolakan { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Tglsp2d { get; set; }
        public DateTime? Tglspm { get; set; }
        public string Nobbantu { get; set; }
        public bool? Valid { get; set; }
        public string Verifikasi { get; set; }
        public long? Idkeg { get; set; }
         public string Validasi { get; set; }
        public long? Idppk { get; set; }
    }
    public class Sp2dcheckdokGet
    {
        public long Idsp2d { get; set; }
        public long Idcheck { get; set; }
    }
    public class Sp2dcheckdokPost
    {
        public long Idsp2d { get; set; }
        public List<long> Idcheck { get; set; }
    }
    public class Sp2dNtpnPost
    {
        public long Idntpn { get; set; }
        public long? Idunit { get; set; }
        [Required]
        public string Ntpn { get; set; }
        [Required]
        public DateTime? Tglntpn { get; set; }
        public long? Idsp2d { get; set; }
        public string Idbilling { get; set; }
    }
}
