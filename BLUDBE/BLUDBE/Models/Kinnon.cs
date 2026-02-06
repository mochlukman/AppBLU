using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Kinnon
    {
        public long Idkinnon { get; set; }
        public string Kdjkk { get; set; }
        public string Idunit { get; set; }
        public string Kdtahap { get; set; }
        public int Idxkode { get; set; }
        public string Tolokur { get; set; }
        public string Target { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Zkode IdxkodeNavigation { get; set; }
        public Jkinkeg KdjkkNavigation { get; set; }
    }
}
