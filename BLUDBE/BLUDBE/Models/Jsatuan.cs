using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jsatuan
    {
        public Jsatuan()
        {
            Ssh = new HashSet<Ssh>();
        }

        public long Idsatuan { get; set; }
        public string Kdsatuan { get; set; }
        public string Uraisatuan { get; set; }
        public string Ket { get; set; }

        public ICollection<Ssh> Ssh { get; set; }
    }
}
