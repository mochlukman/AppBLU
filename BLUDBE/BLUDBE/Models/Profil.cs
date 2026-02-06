using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Profil
    {
        public Profil()
        {
            Profilunit = new HashSet<Profilunit>();
        }

        public long Idprofil { get; set; }
        public string Kdprofil { get; set; }
        public string Nmprofil { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public ICollection<Profilunit> Profilunit { get; set; }
    }
}
