using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class Daftphk3Post
    {
        public long Idphk3 { get; set; }
        public long? Idunit { get; set; }
        [Required]
        public string Nmphk3 { get; set; }
        [Required]
        public string Nminst { get; set; }
        public long? Idbank { get; set; }
        public string Cabangbank { get; set; }
        public string Alamatbank { get; set; }
        public string Norekbank { get; set; }
        public string Namapemilik { get; set; }
        public long? Idjusaha { get; set; }
        public string Alamat { get; set; }
        public string Telepon { get; set; }
        public string Npwp { get; set; }
        public string Warganegara { get; set; }
        public string Stpenduduk { get; set; }
        public int? Stvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
