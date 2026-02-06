using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class Sp2bdetGet
    {
        public long Idsp2bdet { get; set; }
        public long? Idsp2b { get; set; }
        public long? Idsp3b { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long? Iderek { get; set; }
        public long? Idjnsakun { get; set; }
    }
    public class Sp2bdetPost
    {
        public long Idsp2bdet { get; set; }
        public long? Idsp2b { get; set; }
        public long? Idsp3b { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long? Iderek { get; set; }
        public long? Idjnsakun { get; set; }
    }
}
