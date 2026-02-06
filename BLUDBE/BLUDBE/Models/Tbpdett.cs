using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Tbpdett
    {
        public Tbpdett()
        {
            Tbpdettkeg = new HashSet<Tbpdettkeg>();
        }

        public long Idtbpdett { get; set; }
        public long Idtbp { get; set; }
        public long Idbend { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Jtrnlkas IdnojetraNavigation { get; set; }
        public Tbp IdtbpNavigation { get; set; }
        public ICollection<Tbpdettkeg> Tbpdettkeg { get; set; }
    }
}
