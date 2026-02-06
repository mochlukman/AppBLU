using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Lpj
    {
        public Lpj()
        {
            Spjlpj = new HashSet<Spjlpj>();
        }

        public long Idlpj { get; set; }
        public long Idunit { get; set; }
        public string Nolpj { get; set; }
        public long? Idttd { get; set; }
        public int Idxkode { get; set; }
        public long? Idbend { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Tgllpj { get; set; }
        public DateTime? Tglbuku { get; set; }
        public string Nosah { get; set; }
        public DateTime? Tglsah { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Validby { get; set; }
        public string Verifikasi { get; set; }
        public string Keterangan { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Daftunit IdunitNavigation { get; set; }
        public ICollection<Spjlpj> Spjlpj { get; set; }
    }
}
