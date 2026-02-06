using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SpmGet
    {
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public int Idxkode { get; set; }
        [Required]
        public long Idunit { get; set; }
        public long? Idbend { get; set; }
        public long? Idkeg { get; set; }
        public bool NoSpmExist { get; set; } // jika tru berarti cari no SPM yg sudah digunakan untuk filter pengecualian / tidak sama dengan nomor spm yang dipilih
    }
    public class SpmPost
    {
        public long Idspm { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Nospm { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public long Idbend { get; set; }
        public long Idspd { get; set; }
        public long Idspp { get; set; }
        public long? Idskp { get; set; }
        public long? Idphk3 { get; set; }
        public int Idxkode { get; set; }
        [Required]
        public string Noreg { get; set; }
        public string Ketotor { get; set; }
        public long? Idkontrak { get; set; }
        public string Keperluan { get; set; }
        public string Penolakan { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Tglspm { get; set; }
        public DateTime? Tglspp { get; set; }
        public DateTime? Tglaprove { get; set; }
        public string Verifikasi { get; set; }
        public bool? Valid { get; set; }
        public bool? Status { get; set; }
        public string Validasi { get; set; }
        public long? Idkeg { get; set; }
        public bool IsPengembalian { get; set; }
    }
    public class SpmdetdPost
    {
        public long Idspmdetd { get; set; }
        [Required]
        public long Idspm { get; set; }
        [Required]
        public List<long> Idrek { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class SpmdetdUpdate
    {
        [Required]
        public long Idspmdetd { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class SpmdetbPost
    {
        public long Idspmdetb { get; set; }
        [Required]
        public long Idspm { get; set; }
        [Required]
        public List<long> Idrek { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class SpmdetbUpdate
    {
        [Required]
        public long Idspmdetb { get; set; }
        public decimal? Nilai { get; set; }
    }
}
