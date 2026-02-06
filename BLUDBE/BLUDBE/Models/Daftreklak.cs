using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Daftreklak
    {
        public Daftreklak()
        {
            Saldoawallak = new HashSet<Saldoawallak>();
            Setblak = new HashSet<Setblak>();
            Setdlak = new HashSet<Setdlak>();
            Setrlak = new HashSet<Setrlak>();
        }

        public long Idrek { get; set; }
        public string Kdper { get; set; }
        public string Nmper { get; set; }
        public int Mtglevel { get; set; }
        public int Kdkhusus { get; set; }
        public int? Idjnslak { get; set; }
        public string Type { get; set; }
        public int? Staktif { get; set; }
        public decimal? Nlakawal { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jnslak IdjnslakNavigation { get; set; }
        public ICollection<Saldoawallak> Saldoawallak { get; set; }
        public ICollection<Setblak> Setblak { get; set; }
        public ICollection<Setdlak> Setdlak { get; set; }
        public ICollection<Setrlak> Setrlak { get; set; }
    }
}
