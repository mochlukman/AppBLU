using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class GolonganGet
    {
        public string Kdgol { get; set; }
    }
    public class GolonganPost
    {
        public long Idgol { get; set; }
        [Required]
        public string Kdgol { get; set; }
        public string Nmgol { get; set; }
        public string Pangkat { get; set; }
    }
}
