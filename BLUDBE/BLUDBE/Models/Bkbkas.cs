using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bkbkas
    {
        public Bkbkas()
        {
            Sp2d = new HashSet<Sp2d>();
            Sts = new HashSet<Sts>();
            Stsdett = new HashSet<Stsdett>();
        }

        public string Nobbantu { get; set; }
        public long Idunit { get; set; }
        public long Idrek { get; set; }
        public long Idbank { get; set; }
        public string Nmbkas { get; set; }
        public string Norek { get; set; }
        public decimal? Saldo { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Daftrekening IdrekNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public ICollection<Sp2d> Sp2d { get; set; }
        public ICollection<Sts> Sts { get; set; }
        public ICollection<Stsdett> Stsdett { get; set; }
    }
}
