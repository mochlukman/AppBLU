using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Kontrakdetr
    {
        public long Iddetkontrak { get; set; }
        public long Idkontrak { get; set; }
        public long Idrek { get; set; }
        public int Idbulan { get; set; }
        public long Idjtermorlun { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jtermorlun IdjtermorlunNavigation { get; set; }
        public Kontrak IdkontrakNavigation { get; set; }
    }
}
