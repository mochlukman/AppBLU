using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class JbmPost
    {
        public long Idjbm { get; set; }
        [Required]
        public string Kdbm { get; set; }
        public string Nmbm { get; set; }
    }
}
