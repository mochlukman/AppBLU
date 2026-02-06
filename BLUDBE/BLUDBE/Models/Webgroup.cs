using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Webgroup
    {
        public Webgroup()
        {
            Webotor = new HashSet<Webotor>();
            Webuser = new HashSet<Webuser>();
        }

        public long Groupid { get; set; }
        public string Nmgroup { get; set; }
        public string Kdgroup { get; set; }
        public string Ket { get; set; }

        public ICollection<Webotor> Webotor { get; set; }
        public ICollection<Webuser> Webuser { get; set; }
    }
}
