using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Daftrekapbd
    {
        public long Idrek { get; set; }
        public string Kdper { get; set; }
        public string Nmper { get; set; }
        public int Mtglevel { get; set; }
        public int Kdkhusus { get; set; }
        public string Type { get; set; }
        public int? Staktif { get; set; }
        public decimal? Nlraawal { get; set; }
        public decimal? Nprognosis { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
