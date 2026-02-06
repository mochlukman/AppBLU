using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class TahapGet
    {
        public string Kdtahap { get; set; }
    }
    public class TahapPost
    {
        [Required]
        public string Kdtahap { get; set; }
        [Required]
        public string Uraian { get; set; }
        public string Nmtahap { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Ket { get; set; }
        public DateTime? Tgltransfer { get; set; }
    }
}
