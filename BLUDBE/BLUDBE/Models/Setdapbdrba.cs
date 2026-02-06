using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Setdapbdrba
    {
        public long Idsetdapbdrba { get; set; }
        public long Idrekapbd { get; set; }
        public long Idrekrba { get; set; }
        public long? Idrekapbd2 { get; set; }

        public Daftrekening IdrekapbdNavigation { get; set; }
        public Daftrekening IdrekrbaNavigation { get; set; }
    }
}
