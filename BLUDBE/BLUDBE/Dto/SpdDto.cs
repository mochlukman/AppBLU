using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class SpdView
    {
        public long Idspd { get; set; }
        public long Idunit { get; set; }
        public Daftunit Daftunit { get; set; }
        public string Nospd { get; set; }
        public DateTime? Tglspd { get; set; }
        public int Idbulan1 { get; set; }
        public Bulan Bulan1 { get; set; }
        public int Idbulan2 { get; set; }
        public Bulan Bulan2 { get; set; }
        public int Idxkode { get; set; }
        public long? Idttd { get; set; }
        public Jabttd Jabttd { get; set; }
        public string Keterangan { get; set; }
        public bool? Valid { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
    public class SpddetbView
    {
        public long Idspddetb { get; set; }
        public long Idspd { get; set; }
        public long Idrek { get; set; }
        public Daftrekening Rekening { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
    public class SpddetrView
    {
        public long Idspddetr { get; set; }
        public long Idspd { get; set; }
        public long Idkeg { get; set; }
        public Mkegiatan Kegiatan { get; set; }
        public long Idrek { get; set; }
        public Daftrekening Rekening { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
    public class SpddetrViewTreeRoot
    {
        public SpddetrViewTreeData Data { get; set; }
        public List<SpddetrViewTreeRoot> Children { get; set; }
    }
    public class SpddetrViewTreeData
    {
        public string Rowid { get; set; }
        public string Level { get; set; }
        public string kode { get; set; }
        public string uraian { get; set; }
        public long Idspddetr { get; set; }
        public long Idrek { get; set; }
        public long Idkeg { get; set; }
        public long Idspd { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class SpptagView
    {
        public long Idspptag { get; set; }
        public long Idspp { get; set; }
        public long Idtagihan { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Spp IdsppNavigation { get; set; }
        public Tagihan IdtagihanNavigation { get; set; }
    }
}
