using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sasaranthn
    {
        public Sasaranthn()
        {
            Pgrmunit = new HashSet<Pgrmunit>();
        }

        public string Idsas { get; set; }
        public string Idprioda { get; set; }
        public string Nosas { get; set; }
        public string Nmsas { get; set; }
        public string Ket { get; set; }

        public ICollection<Pgrmunit> Pgrmunit { get; set; }
    }
}
