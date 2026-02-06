using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Tagihan
    {
        public Tagihan()
        {
            Bpk = new HashSet<Bpk>();
            Spptag = new HashSet<Spptag>();
            Tagihandet = new HashSet<Tagihandet>();
        }

        public long Idtagihan { get; set; }
        public long Idunit { get; set; }
        public long Idkeg { get; set; }
        public string Notagihan { get; set; }
        public DateTime Tgltagihan { get; set; }
        public long Idkontrak { get; set; }
        public string Uraiantagihan { get; set; }
        public string Bulan { get; set; }
        public int Idbulan { get; set; }
        public string Nofaktur { get; set; }
        public decimal? Nilaippn { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Kontrak IdkontrakNavigation { get; set; }
        public Bulan IdbulanNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public ICollection<Bpk> Bpk { get; set; }
        public ICollection<Spptag> Spptag { get; set; }
        public ICollection<Tagihandet> Tagihandet { get; set; }
    }
}
