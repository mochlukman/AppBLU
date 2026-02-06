using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class BktmemPost
    {
        public long Idbm { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Nobm { get; set; }
        [Required]
        public long Idjbm { get; set; }
        public long? Idttd { get; set; }
        public DateTime? Tglbm { get; set; }
        public string Referensi { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool Penutup { get; set; } // untuk Penutup
    }
    public class BktmemdetPost
    {
        public long Idbmdet { get; set; }
        [Required]
        public long Idbm { get; set; }
        [Required]
        public long Idrek { get; set; }
        public long Idkeg { get; set; }
        [Required]
        public string Kdpers { get; set; }
        public decimal? Nilai { get; set; }
        [Required]
        public long Idjnsakun { get; set; }
    }
    public class BktmemdetUpdate
    {
        [Required]
        public long Idbmdet { get; set; }
        [Required]
        public long Nilai { get; set; }
        [Required]
        public string Tname { get; set; }
    }
    public class BktmemValidasi
    {
        [Required]
        public long Idbm { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
    }
}
