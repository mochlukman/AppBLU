using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jtermorlun
    {
        public Jtermorlun()
        {
            Kontrakdetr = new HashSet<Kontrakdetr>();
        }

        public long Idjtermorlun { get; set; }
        public string Nmjtermorlun { get; set; }

        public ICollection<Kontrakdetr> Kontrakdetr { get; set; }
    }
}
