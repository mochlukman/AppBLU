using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class DpdetView
    {
        public long Iddpdet { get; set; }
        public long Iddp { get; set; }
        public long Idsp2d { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Dp IddpNavigation { get; set; }
        public Sp2d Idsp2dNavigation { get; set; }
        public Daftunit Daftunit { get; set; }
    }
}
