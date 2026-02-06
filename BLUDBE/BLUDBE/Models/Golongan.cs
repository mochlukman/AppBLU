using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Golongan
    {
        public Golongan()
        {
            Pegawai = new HashSet<Pegawai>();
        }

        public long Idgol { get; set; }
        public string Kdgol { get; set; }
        public string Nmgol { get; set; }
        public string Pangkat { get; set; }

        public ICollection<Pegawai> Pegawai { get; set; }
    }
}
