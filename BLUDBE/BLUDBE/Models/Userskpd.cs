using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Userskpd
    {
        public string Userid { get; set; }
        public long Idunit { get; set; }
        public int? Status { get; set; }
        public string LastBy { get; set; }
        public DateTime? LastDate { get; set; }

        public Daftunit IdunitNavigation { get; set; }
        public Webuser User { get; set; }
    }
}
