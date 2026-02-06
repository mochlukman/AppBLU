using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class Sp3bdetGet
    {
        public long Idsp3bdet { get; set; }
        public long Idsp3b { get; set; }
        public string Nospj { get; set; }
        public decimal? Nilai { get; set; }
        public long Idunit { get; set; }
        public long? Idrek { get; set; }
        public long? Idjnsakun { get; set; }
    }
    public class Sp3bdetPost
    {
        public long Idsp3bdet { get; set; }
        public long Idsp3b { get; set; }
        public string Nospj { get; set; }
        public decimal? Nilai { get; set; }
        public long Idunit { get; set; }
        public long? Idrek { get; set; }
        public long? Idjnsakun { get; set; }
    }
}
