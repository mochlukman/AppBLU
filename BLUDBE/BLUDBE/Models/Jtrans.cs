using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jtrans
    {
        public Jtrans()
        {
            Npd = new HashSet<Npd>();
        }

        public string Idtrans { get; set; }
        public string Nmtrans { get; set; }

        public ICollection<Npd> Npd { get; set; }
    }
}
