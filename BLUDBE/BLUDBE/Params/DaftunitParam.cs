using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class DaftunitGet
    {
        public int Kdlevel { get; set; }
    }
    public class DaftunitPost
    {
        public long Idunit { get; set; }
        public long? Idpemda { get; set; }
        public long? Idurus { get; set; }
        [Required]
        public string Kdunit { get; set; }
        [Required]
        public string Nmunit { get; set; }
        [Required]
        public int Kdlevel { get; set; }
        [Required]
        public string Type { get; set; }
        public string Akrounit { get; set; }
        public string Alamat { get; set; }
        public string Telepon { get; set; }
        public int? Staktif { get; set; }
    }
}
