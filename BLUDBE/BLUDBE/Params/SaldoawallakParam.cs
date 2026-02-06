using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SaldoawallakGet
    {
        public long Idunit { get; set; }
    }
    public class SaldoawallakPost
    {
        public long Idsaldo { get; set; }
        public long Idunit { get; set; }
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
    }
}
