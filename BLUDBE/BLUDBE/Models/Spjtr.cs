using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Spjtr
    {
        public Spjtr()
        {
            Bkustsspjtr = new HashSet<Bkustsspjtr>();
            Bkutbpspjtr = new HashSet<Bkutbpspjtr>();
        }

        public long Idspjtr { get; set; }
        public long Idunit { get; set; }
        public string Nospj { get; set; }
        public long? Idttd { get; set; }
        public int Idxkode { get; set; }
        public long Idbend { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Tglspj { get; set; }
        public DateTime? Tglbuku { get; set; }
        public string Nosah { get; set; }
        public DateTime? Tglsah { get; set; }
        public bool? Sah { get; set; }
        public string Sahby { get; set; }
        public string Ketsah { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Keterangan { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public ICollection<Bkustsspjtr> Bkustsspjtr { get; set; }
        public ICollection<Bkutbpspjtr> Bkutbpspjtr { get; set; }
    }
}
