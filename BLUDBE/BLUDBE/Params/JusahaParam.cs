using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class JusahaPost
    {
        public long Idjusaha { get; set; }
        [Required]
        public string Badanusaha { get; set; }
        public string Keterangan { get; set; }
        public string Akronim { get; set; }
    }
}
