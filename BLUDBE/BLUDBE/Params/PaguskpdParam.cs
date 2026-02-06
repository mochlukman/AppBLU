using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class PaguskpdGet
    {
        [Required]
        public string Kdtahap { get; set; }
    }
    public class PaguskpdPost
    {
        public long Idpaguskpd { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Kdtahap { get; set; }
        public decimal? Nilaiup { get; set; }
        public decimal? Nilai { get; set; }
    }
}
