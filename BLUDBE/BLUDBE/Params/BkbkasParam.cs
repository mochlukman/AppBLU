using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class BkbkasPost
    {
        [Required]
        public string Nobbantu { get; set; }
        public long Idunit { get; set; }
        [Required]
        public long Idrek { get; set; }
        [Required]
        public long Idbank { get; set; }
        public string Nmbkas { get; set; }
        public string Norek { get; set; }
        public decimal? Saldo { get; set; }
    }
}
