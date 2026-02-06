using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Checkdok
    {
        public Checkdok()
        {
            Sp2dcheckdok = new HashSet<Sp2dcheckdok>();
            Spmcheckdok = new HashSet<Spmcheckdok>();
            Sppcheckdok = new HashSet<Sppcheckdok>();
        }

        public long Idcheck { get; set; }
        public string Uraian { get; set; }
        public int? Idxkode { get; set; }

        public Zkode IdxkodeNavigation { get; set; }
        public ICollection<Sp2dcheckdok> Sp2dcheckdok { get; set; }
        public ICollection<Spmcheckdok> Spmcheckdok { get; set; }
        public ICollection<Sppcheckdok> Sppcheckdok { get; set; }
    }
}
