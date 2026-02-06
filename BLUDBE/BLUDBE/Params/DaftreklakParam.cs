using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class DaftreklakPost
    {
        public long Idrek { get; set; }
        public string Kdper { get; set; }
        public string Nmper { get; set; }
        public int Mtglevel { get; set; }
        public int Kdkhusus { get; set; }
        public int? Idjnslak { get; set; }
        public string Type { get; set; }
        public int? Staktif { get; set; }
        public decimal? Nlakawal { get; set; }
    }
}
