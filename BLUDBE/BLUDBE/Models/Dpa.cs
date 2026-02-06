using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Dpa
    {
        public Dpa()
        {
            Dpab = new HashSet<Dpab>();
            Dpad = new HashSet<Dpad>();
            Dpar = new HashSet<Dpar>();
        }

        public long Iddpa { get; set; }
        public long Idunit { get; set; }
        public int? Jdpa { get; set; }
        public int? Idxkode { get; set; }
        public string Nodpa { get; set; }
        public DateTime? Tgldpa { get; set; }
        public string Nosah { get; set; }
        public string Keterangan { get; set; }
        public DateTime? Tglsah { get; set; }
        public bool? Sah { get; set; }
        public string Sahby { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public string Kdtahap { get; set; }
        public decimal? Pendapatan { get; set; }
        public decimal? Belanja { get; set; }
        public decimal? Pembiayaantr { get; set; }
        public decimal? Pembiayaankr { get; set; }

        public Daftunit IdunitNavigation { get; set; }
        public Tahap KdtahapNavigation { get; set; }
        public ICollection<Dpab> Dpab { get; set; }
        public ICollection<Dpad> Dpad { get; set; }
        public ICollection<Dpar> Dpar { get; set; }
    }
}
