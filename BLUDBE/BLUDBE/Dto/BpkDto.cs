using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class BpkView
    {
        public long Idbpk { get; set; }
        public long Idunit { get; set; }
        public long? Idphk3 { get; set; }
        public string Nobpk { get; set; }
        public long? Idtagihan { get; set; }
        public string Kdstatus { get; set; }
        public long? Idjbayar { get; set; }
        public long? Idjtransfer { get; set; }
        public int Idxkode { get; set; }
        public long? Idbend { get; set; }
        public DateTime? Tglbpk { get; set; }
        public string Penerima { get; set; }
        public string Uraibpk { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
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
        public Jcair StcairNavigation { get; set; }
        public Jkirim StkirimNavigation { get; set; }
        public Sppbpk Sppbpk { get; set; }

        public long Idsp2d { get; set; }
        public Sp2d Idsp2dNavigation { get; set; }
    }
    public class BpkpajakView
    {
        public long Idbpkpajak { get; set; }
        public long Idbpk { get; set; }
        public string Nomor { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tanggal { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bpk IdbpkNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public ICollection<Bpkpajakdet> Bpkpajakdet { get; set; }
        public ICollection<Bpkpajakstr> Bpkpajakstr { get; set; }
        public decimal? Nilai { get; set; } // SUM BPKPAJAKDET.NILAI
    }
    public class BpkpajakstrView
    {
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

        public Daftunit IdunitNavigation { get; set; }
        public Bend IdbendNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public ICollection<Bpkpajakstrdet> Bpkpajakstrdet { get; set; }
        public decimal? Nilai { get; set; } // SUM BPKPAJAKDET.NILAI
    }
}
