using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Setmappfk
    {
        public long Idmappfk { get; set; }
        public long Idreknrc { get; set; }
        public long Idrekpot { get; set; }
        public long? Idpajak { get; set; }

        public Daftrekening IdreknrcNavigation { get; set; }
        public Jnspajak IdrekpotNavigation { get; set; }
    }
}
