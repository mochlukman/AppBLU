using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Stsdett
    {
        public long Idstsdett { get; set; }
        public long Idsts { get; set; }
        public string Nobbantu { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jtrnlkas IdnojetraNavigation { get; set; }
        public Sts IdstsNavigation { get; set; }
        public Bkbkas NobbantuNavigation { get; set; }
    }
}
