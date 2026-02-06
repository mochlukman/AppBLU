using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Setkorolari
    {
        public long Idkorolari { get; set; }
        public long Idrek { get; set; }
        public string Kdpers { get; set; }
        public long? Idreknrc { get; set; }

        public Daftrekening IdrekNavigation { get; set; }
        public Daftrekening IdreknrcNavigation { get; set; }
    }
}
