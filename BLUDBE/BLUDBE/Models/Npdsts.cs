using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Npdsts
    {
        public long Idnpdsts { get; set; }
        public long Idsts { get; set; }
        public long Idnpd { get; set; }
        public DateTime? Tglkirim { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Npd IdnpdNavigation { get; set; }
        public Sts IdstsNavigation { get; set; }
    }
}
