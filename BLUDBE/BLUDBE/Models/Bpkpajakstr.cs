using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bpkpajakstr
    {
        public Bpkpajakstr()
        {
            Bkupajak = new HashSet<Bkupajak>();
            Bpkpajakstrdet = new HashSet<Bpkpajakstrdet>();
        }

        public long Idbpkpajakstr { get; set; }
        public long? Idunit { get; set; }
        public long? Idbend { get; set; }
        public string Nomor { get; set; }
        public DateTime? Tanggal { get; set; }
        public string Uraian { get; set; }
        public string Kdstatus { get; set; }
        public bool? Valid { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public ICollection<Bkupajak> Bkupajak { get; set; }
        public ICollection<Bpkpajakstrdet> Bpkpajakstrdet { get; set; }
    }
}
