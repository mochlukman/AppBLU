using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SppGet
    {
        public string Kdstatus { get; set; }
        public int Idxkode { get; set; }
        public long Idunit { get; set; }
        public long Idbend { get; set; }
        public long? Idkeg { get; set; }
        public bool NoSppExist { get; set; } // jika tru berarti cari no SPP yg sudah digunakan untuk filter pengecualian / tidak sama dengan nomor spp yang dipilih
    }
    public class SppPost
    {
        public long Idspp { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Nospp { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public int Idbulan { get; set; }
        [Required]
        public long? Idbend { get; set; }
        [Required]
        public long Idspd { get; set; }
        public long? Idphk3 { get; set; }
        [Required]
        public int Idxkode { get; set; }
        public string Noreg { get; set; }
        public string Ketotor { get; set; }
        public long? Idkontrak { get; set; }
        public string Keperluan { get; set; }
        public string Penolakan { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Tglaprove { get; set; }
        [Required]
        public DateTime? Tglspp { get; set; }
        public bool? Status { get; set; }
        public decimal? Nilaiup { get; set; }
        public string Verifikasi { get; set; }
        public bool? Valid { get; set; }
        public long? Idkeg { get; set; }
        public string Validasi { get; set; }
    }
    public class SppdetrPost
    {
        public long Idsppdetr { get; set; }
        [Required]
        public List<long> Idrek { get; set; }
        [Required]
        public long Idkeg { get; set; }
        public long Idspp { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class SppdetrPostSingle
    {
        public long Idsppdetr { get; set; }
        [Required]
        public long Idrek { get; set; }
        [Required]
        public long Idkeg { get; set; }
        public long? Idjdana { get; set; }
        public long Idspp { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class SppdetrPostMultiKeg
    {
        [Required]
        public long Idrek { get; set; }
        [Required]
        public long Idkeg { get; set; }
        [Required]
        public long Idspp { get; set; }
        [Required]
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class SppdetrUpdate
    {
        [Required]
        public long Idsppdetr { get; set; }
        public long Idspp { get; set; }
        public long? Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public long Idrek { get; set; }
    }
    public class SppdetbPost
    {
        public long Idsppdetb { get; set; }
        [Required]
        public List<long> Idrek { get; set; }
        public long Idspp { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class SppdetbUpdate
    {
        [Required]
        public long Idsppdetb { get; set; }
        public long Idspp { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class SppcheckdokGet
    {
        public long Idspp { get; set; }
        public long Idcheck { get; set; }
    }
    public class SppcheckdokPost
    {
        public long Idspp { get; set; }
        public List<long> Idcheck { get; set; }
    }
    public class SppTagPost
    {
        public long Idspptag { get; set; }
        public long Idspp { get; set; }
        public List<long> Idtagihans { get; set; }
    }
}
