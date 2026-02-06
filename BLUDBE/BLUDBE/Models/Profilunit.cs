using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Profilunit
    {
        public long Idprofilunit { get; set; }
        public long Idunit { get; set; }
        public string Kdprofil { get; set; }
        public string Nodesk { get; set; }
        public string Ketprofil { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Daftunit IdunitNavigation { get; set; }
        public Profil KdprofilNavigation { get; set; }
    }
}
