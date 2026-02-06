using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jbend
    {
        public Jbend()
        {
            Bend = new HashSet<Bend>();
        }

        public string Jnsbend { get; set; }
        public long Idrek { get; set; }
        public string Uraibend { get; set; }

        public Daftrekening IdrekNavigation { get; set; }
        public ICollection<Bend> Bend { get; set; }
    }
}
