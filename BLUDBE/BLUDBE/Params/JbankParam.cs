using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class JbankPost
    {
        public long Idbank { get; set; }
        [Required]
        public string Kdbank { get; set; }
        [Required]
        public string Nmbank { get; set; }
        [Required]
        public string Uraian { get; set; }
        public string Akronim { get; set; }
        public DateTime? Datecreate { get; set; }
        public string Alamat { get; set; }
    }
}
