using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jkinkeg
    {
        public Jkinkeg()
        {
            Kinkeg = new HashSet<Kinkeg>();
            Kinnon = new HashSet<Kinnon>();
        }

        public string Kdjkk { get; set; }
        public string Urjkk { get; set; }

        public ICollection<Kinkeg> Kinkeg { get; set; }
        public ICollection<Kinnon> Kinnon { get; set; }
    }
}
