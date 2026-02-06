using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jbayar
    {
        public Jbayar()
        {
            Bpk = new HashSet<Bpk>();
        }

        public long Idjbayar { get; set; }
        public int Kdbayar { get; set; }
        public string Uraianbayar { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public ICollection<Bpk> Bpk { get; set; }
    }
}
