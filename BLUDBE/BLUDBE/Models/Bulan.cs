using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bulan
    {
        public Bulan()
        {
            Prognosisb = new HashSet<Prognosisb>();
            Prognosisd = new HashSet<Prognosisd>();
            Prognosisr = new HashSet<Prognosisr>();
            SpdIdbulan1Navigation = new HashSet<Spd>();
            SpdIdbulan2Navigation = new HashSet<Spd>();
            Spp = new HashSet<Spp>();
        }

        public int Idbulan { get; set; }
        public int Kdperiode { get; set; }
        public string KetBulan { get; set; }
        public string Alokas { get; set; }

        public ICollection<Prognosisb> Prognosisb { get; set; }
        public ICollection<Prognosisd> Prognosisd { get; set; }
        public ICollection<Prognosisr> Prognosisr { get; set; }
        public ICollection<Spd> SpdIdbulan1Navigation { get; set; }
        public ICollection<Spd> SpdIdbulan2Navigation { get; set; }
        public ICollection<Spp> Spp { get; set; }
    }
}
