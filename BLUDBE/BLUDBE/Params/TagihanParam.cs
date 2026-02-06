using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class TagihanGet
    {
        public long Idunit { get; set; }
        public long? Idkeg { get; set; }
        public bool NoTagihanExist { get; set; } // jika tru berarti cari no Tagihan yg sudah digunakan untuk filter pengecualian / tidak sama dengan nomor Tagihan yang dipilih
    }
    public class TagihanPost
    {
        public long Idtagihan { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public long Idkeg { get; set; }
        [Required]
        public string Notagihan { get; set; }
        public DateTime Tgltagihan { get; set; }
        [Required]
        public long Idkontrak { get; set; }
        public string Uraiantagihan { get; set; }
        public string Bulan { get; set; }
        public int Idbulan { get; set; }
        public string Nofaktur { get; set; }
        public decimal? Nilaippn { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
    public class TagihandetPost
    {
        public long Idtagihandet { get; set; }
        [Required]
        public long Idtagihan { get; set; }
        [Required]
        public long Idrek { get; set; }
        [Required]
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
