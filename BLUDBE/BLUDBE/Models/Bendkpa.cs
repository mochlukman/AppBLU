using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bendkpa
    {
        public long Idbendkpa { get; set; }
        public long Idbend { get; set; }
        public long Idpeg { get; set; }
        public DateTime? Datecreate { get; set; }

        public Bend IdbendNavigation { get; set; }
    }
}
