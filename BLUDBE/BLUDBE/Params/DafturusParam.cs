using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class DafturusGet
    {
        public string Kdurus { get; set; }
        public string Nmurus { get; set; }
        public string Kdlevel { get; set; }
        public string Type { get; set; }
    }
    public class DafturusPost
    {
        public long Idurus { get; set; }
        [Required]
        public string Kdurus { get; set; }
        [Required]
        public string Nmurus { get; set; }
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
