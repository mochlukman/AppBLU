using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bpk
    {
        public Bpk()
        {
            Bkubpk = new HashSet<Bkubpk>();
            Bpkdetr = new HashSet<Bpkdetr>();
            Bpkpajak = new HashSet<Bpkpajak>();
            Bpkspj = new HashSet<Bpkspj>();
            Npdbpk = new HashSet<Npdbpk>();
            Sp2dbpk = new HashSet<Sp2dbpk>();
        }

        public long Idbpk { get; set; }
        public long Idunit { get; set; }
        public long? Idkeg { get; set; }
        public long? Idphk3 { get; set; }
        public string Nobpk { get; set; }
        public long? Idtagihan { get; set; }
        public string Kdstatus { get; set; }
        public long? Idjbayar { get; set; }
        public long? Idjtransfer { get; set; }
        public int Idxkode { get; set; }
        public long? Idbend { get; set; }
        public DateTime? Tglbpk { get; set; }
        public string Uraibpk { get; set; }
        public string Penerima { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Verifikasi { get; set; }
        public long? Kdrilis { get; set; }
        public int? Stkirim { get; set; }
        public int? Stcair { get; set; }
        public string Noref { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Jbayar IdjbayarNavigation { get; set; }
        public Jtransfer IdjtransferNavigation { get; set; }
        public Daftphk3 Idphk3Navigation { get; set; }
        public Tagihan IdtagihanNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public Zkode IdxkodeNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public Jcair StcairNavigation { get; set; }
        public Jkirim StkirimNavigation { get; set; }
        public Sppbpk Sppbpk { get; set; }
        public ICollection<Bkubpk> Bkubpk { get; set; }
        public ICollection<Bpkdetr> Bpkdetr { get; set; }
        public ICollection<Bpkpajak> Bpkpajak { get; set; }
        public ICollection<Bpkspj> Bpkspj { get; set; }
        public ICollection<Npdbpk> Npdbpk { get; set; }
        public ICollection<Sp2dbpk> Sp2dbpk { get; set; }
    }
}
