using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SppdetrpotGet
    {
        public long Idsppdetrpot { get; set; }
    }
    public class SppdetrpotPost
    {
        [Required]
        public long Idsppdetr { get; set; }
        [Required]
        public long Idpot { get; set; }
        public decimal? Nilai { get; set; }
        public string Keterangan { get; set; }
    }
    public class SppdetrpotUpdate
    {
        [Required]
        public long Idsppdetrpot { get; set; }
        [Required]
        public long Idsppdetr { get; set; }
        [Required]
        public long Idpot { get; set; }
        public decimal? Nilai { get; set; }
        public string Keterangan { get; set; }
    }
}
