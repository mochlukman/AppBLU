using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sts
    {
        public Sts()
        {
            Bkusts = new HashSet<Bkusts>();
            Npdsts = new HashSet<Npdsts>();
            Stsdetb = new HashSet<Stsdetb>();
            Stsdetd = new HashSet<Stsdetd>();
            Stsdetr = new HashSet<Stsdetr>();
            Stsdett = new HashSet<Stsdett>();
            Tbpsts = new HashSet<Tbpsts>();
        }

        public long Idsts { get; set; }
        public long Idunit { get; set; }
        public string Nosts { get; set; }
        public long? Idbend { get; set; }
        public string Kdstatus { get; set; }
        public int Idxkode { get; set; }
        public string Nobbantu { get; set; }
        public DateTime? Tglsts { get; set; }
        public string Uraian { get; set; }
        public decimal? Nilaiup { get; set; }
        public bool? Valid { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Validby { get; set; }
        public string Ketvalid { get; set; }
        public long? Kdrilis { get; set; }
        public int? Stkirim { get; set; }
        public int? Stcair { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public Zkode IdxkodeNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public Bkbkas NobbantuNavigation { get; set; }
        public Jcair StcairNavigation { get; set; }
        public Jkirim StkirimNavigation { get; set; }
        public Skpsts Skpsts { get; set; }
        public ICollection<Bkusts> Bkusts { get; set; }
        public ICollection<Npdsts> Npdsts { get; set; }
        public ICollection<Stsdetb> Stsdetb { get; set; }
        public ICollection<Stsdetd> Stsdetd { get; set; }
        public ICollection<Stsdetr> Stsdetr { get; set; }
        public ICollection<Stsdett> Stsdett { get; set; }
        public ICollection<Tbpsts> Tbpsts { get; set; }
    }
}
