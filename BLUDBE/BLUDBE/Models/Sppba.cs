using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sppba
    {
        public long Idsppba { get; set; }
        public long Idspp { get; set; }
        public long Idberita { get; set; }
        public DateTime? Datecreate { get; set; }

        public Berita IdberitaNavigation { get; set; }
        public Spp IdsppNavigation { get; set; }
    }
}
