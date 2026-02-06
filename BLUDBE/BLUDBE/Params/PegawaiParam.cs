using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class PegawaiGet
    {
        public long Idpeg { get; set; }
        public string Nip { get; set; }
        public long Idunit { get; set; }
        public string Kdgol { get; set; }
    }
    public class PegawaiPost
    {
        public long Idpeg { get; set; }
        [Required]
        public string Nip { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Kdgol { get; set; }
        public string Nama { get; set; }
        public string Alamat { get; set; }
        public string Jabatan { get; set; }
        public string Pddk { get; set; }
        public string Npwp { get; set; }
        public bool? Staktif { get; set; }
        public bool? Stvalid { get; set; }
    }
}
