using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class JbayarPost
    {
        public long Idjbayar { get; set; }
        [Required]
        public int Kdbayar { get; set; }
        [Required]
        public string Uraianbayar { get; set; }
    }
}
