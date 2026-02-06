using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Spj
    {
        public Spj()
        {
            Bpkspj = new HashSet<Bpkspj>();
            Spjlpj = new HashSet<Spjlpj>();
            Spjspp = new HashSet<Spjspp>();
        }

        public long Idspj { get; set; }
        public long Idunit { get; set; }
        public string Nospj { get; set; }
        public long? Idttd { get; set; }
        public int Idxkode { get; set; }
        public long? Idbend { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Tglspj { get; set; }
        public DateTime? Tglbuku { get; set; }
        public string Nosah { get; set; }
        public DateTime? Tglsah { get; set; }
        public bool? Sah { get; set; }
        public string Sahby { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public string Verifikasi { get; set; }
        public string Keterangan { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public ICollection<Bpkspj> Bpkspj { get; set; }
        public ICollection<Spjlpj> Spjlpj { get; set; }
        public ICollection<Spjspp> Spjspp { get; set; }
    }
}
