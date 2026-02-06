using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Tbpdettkeg
    {
        public long Idtbpdettkeg { get; set; }
        public long Idtbpdett { get; set; }
        public long Idkeg { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Mkegiatan IdkegNavigation { get; set; }
        public Tbpdett IdtbpdettNavigation { get; set; }
    }
}
