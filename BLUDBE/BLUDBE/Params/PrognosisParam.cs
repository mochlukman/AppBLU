using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class PrognosisPost
    {
        public long Idprog { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public int Idbulan { get; set; }
        [Required]
        public long Idrek { get; set; }
        public decimal? Nprognosis { get; set; }
        public decimal? Nprogman { get; set; }
        public decimal? Soakhir { get; set; }
        public string Stvalid { get; set; }
    }
    public class PrognosisrPost
    {
        public long Idprog { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public int Idbulan { get; set; }
        [Required]
        public long Idrek { get; set; }
        [Required]
        public long Idkeg { get; set; }
        public decimal? Nprognosis { get; set; }
        public decimal? Nprogman { get; set; }
        public decimal? Soakhir { get; set; }
        public string Stvalid { get; set; }
    }
}
