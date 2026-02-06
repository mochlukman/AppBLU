using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class DaftbankPost
    {
        public long Idbank { get; set; }
        [Required]
        public string Kdbank { get; set; }
        public string Akbank { get; set; }
        public string Alamat { get; set; }
        public string Telepon { get; set; }
        public string Cabang { get; set; }
        
    }
}
