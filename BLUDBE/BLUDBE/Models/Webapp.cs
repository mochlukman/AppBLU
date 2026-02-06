using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Webapp
    {
        public Webapp()
        {
            Webrole = new HashSet<Webrole>();
        }

        public long Idapp { get; set; }
        public string Produkid { get; set; }
        public string Nmapp { get; set; }
        public string Serialkey { get; set; }

        public ICollection<Webrole> Webrole { get; set; }
    }
}
