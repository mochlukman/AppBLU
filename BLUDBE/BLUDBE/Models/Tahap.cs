using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Tahap
    {
        public Tahap()
        {
            Dpa = new HashSet<Dpa>();
            Dpab = new HashSet<Dpab>();
            Dpad = new HashSet<Dpad>();
            Paguskpd = new HashSet<Paguskpd>();
            Pgrmunit = new HashSet<Pgrmunit>();
        }

        public string Kdtahap { get; set; }
        public string Uraian { get; set; }
        public string Nmtahap { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Ket { get; set; }
        public DateTime? Tgltransfer { get; set; }
        public bool? Lock { get; set; }

        public ICollection<Dpa> Dpa { get; set; }
        public ICollection<Dpab> Dpab { get; set; }
        public ICollection<Dpad> Dpad { get; set; }
        public ICollection<Paguskpd> Paguskpd { get; set; }
        public ICollection<Pgrmunit> Pgrmunit { get; set; }
    }
}
