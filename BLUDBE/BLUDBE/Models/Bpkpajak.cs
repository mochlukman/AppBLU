using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bpkpajak
    {
        public Bpkpajak()
        {
            Bkupajak = new HashSet<Bkupajak>();
            Bpkpajakdet = new HashSet<Bpkpajakdet>();
            Bpkpajakstrdet = new HashSet<Bpkpajakstrdet>();
        }

        public long Idbpkpajak { get; set; }
        public long Idbpk { get; set; }
        public string Nomor { get; set; }
        public DateTime? Tanggal { get; set; }
        public string Uraian { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bpk IdbpkNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public ICollection<Bkupajak> Bkupajak { get; set; }
        public ICollection<Bpkpajakdet> Bpkpajakdet { get; set; }
        public ICollection<Bpkpajakstrdet> Bpkpajakstrdet { get; set; }
    }
}
