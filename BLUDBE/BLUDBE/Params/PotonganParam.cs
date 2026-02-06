using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class PotonganGet
    {
        public string Kdpot { get; set; }
        public string Nmpot { get; set; }
        public string Keterangan { get; set; }
        public int? Mtglevel { get; set; }
        public string Type { get; set; }
    }
    public class PotonganPost
    {
        [Required]
        public string Kdpot { get; set; }
        [Required]
        public string Nmpot { get; set; }
        public string Keterangan { get; set; }
        public int? Mtglevel { get; set; }
        public string Type { get; set; }
    }
    public class PotonganUpdate
    {
        [Required]
        public long Idpot { get; set; }
        [Required]
        public string Kdpot { get; set; }
        [Required]
        public string Nmpot { get; set; }
        public string Keterangan { get; set; }
        public int? Mtglevel { get; set; }
        public string Type { get; set; }
    }
}
