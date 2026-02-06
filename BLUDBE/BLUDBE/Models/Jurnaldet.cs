using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jurnaldet
    {
        public long Idjurnaldet { get; set; }
        public long Idjurnalhed { get; set; }
        public long? Idkeg { get; set; }
        public long? Idjnsakun { get; set; }
        public string JnsJurnal { get; set; }
        public long? Idrek { get; set; }
        public string Kdpers { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Createdate { get; set; }
    }
}
