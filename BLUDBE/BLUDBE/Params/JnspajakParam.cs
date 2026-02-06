using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class JnspajakPost
    {
        public int Idjnspajak { get; set; }
        [Required]
        public string Kdjnspajak { get; set; }
        [Required]
        public string Nmjnspajak { get; set; }
    }
}
