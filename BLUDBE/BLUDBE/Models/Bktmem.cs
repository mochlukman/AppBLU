using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bktmem
    {
        public Bktmem()
        {
            Bktmemdetb = new HashSet<Bktmemdetb>();
            Bktmemdetd = new HashSet<Bktmemdetd>();
            Bktmemdetn = new HashSet<Bktmemdetn>();
            Bktmemdetr = new HashSet<Bktmemdetr>();
        }

        public long Idbm { get; set; }
        public long Idunit { get; set; }
        public string Nobm { get; set; }
        public long Idjbm { get; set; }
        public long? Idttd { get; set; }
        public DateTime? Tglbm { get; set; }
        public string Referensi { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jbm IdjbmNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public ICollection<Bktmemdetb> Bktmemdetb { get; set; }
        public ICollection<Bktmemdetd> Bktmemdetd { get; set; }
        public ICollection<Bktmemdetn> Bktmemdetn { get; set; }
        public ICollection<Bktmemdetr> Bktmemdetr { get; set; }
    }
}
