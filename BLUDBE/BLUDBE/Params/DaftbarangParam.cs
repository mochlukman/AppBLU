using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class DaftbarangPost
    {
        public long Idbrg { get; set; }
        public long? Idparent { get; set; }
        [Required]
        public string Kdbrg { get; set; }
        public string Nmbrg { get; set; }
        public int? Mtglevel { get; set; }
        public string Type { get; set; }
        public string Ket { get; set; }
    }
    public class DaftbarangGet
    {
        public long Idbrg { get; set; }
        public long? Idparent { get; set; }
        public string Kdbrg { get; set; }
        public string Nmbrg { get; set; }
        public int? Mtglevel { get; set; }
        public string Type { get; set; }
        public string Ket { get; set; }
    }
}
