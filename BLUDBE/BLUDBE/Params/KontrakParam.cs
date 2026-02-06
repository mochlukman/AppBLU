using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class KontrakGet
    {
        public long Idunit { get; set; }
       
        public long Idkeg { get; set; }
        public long Idphk3 { get; set; }
        public bool NoKontrakExist { get; set; } // jika tru berarti cari no Kontrak yg sudah digunakan untuk filter pengecualian / tidak sama dengan nomor Kontrak yang dipilih
    }
    public class KontrakPost
    {
        public long Idkontrak { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Nokontrak { get; set; }
        [Required]
        public long Idphk3 { get; set; }
        [Required]
        public long Idkeg { get; set; }
        public DateTime? Tglkontrak { get; set; }
        public DateTime? Tglakhirkontrak { get; set; }
        public string Uraian { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
    public class KontrakdetrPost
    {
        public long Iddetkontrak { get; set; }
        [Required]
        public long Idkontrak { get; set; }
        [Required]
        public long Idrek { get; set; }
        [Required]
        public int Idbulan { get; set; }
        public long Idjtermorlun { get; set; }
        public decimal? Nilai { get; set; }
    }
}
