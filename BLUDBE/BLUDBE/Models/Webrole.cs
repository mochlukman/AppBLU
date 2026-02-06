using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Webrole
    {
        public Webrole()
        {
            Webotor = new HashSet<Webotor>();
        }

        public string Roleid { get; set; }
        public long? Idapp { get; set; }
        public string Role { get; set; }
        public string Type { get; set; }
        public string Menuid { get; set; }
        public string Parentid { get; set; }
        public string Bantuan { get; set; }
        public string Link { get; set; }
        public string Icon { get; set; }
        public int? Kdlevel { get; set; }
        public int? Show { get; set; }

        public Webapp IdappNavigation { get; set; }
        public ICollection<Webotor> Webotor { get; set; }
    }
}
