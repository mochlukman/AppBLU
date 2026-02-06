using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Dto
{
    public class BkudView
    {
        public long Idbkud { get; set; }
        public string Nobukas { get; set; }
        public long? Idkas { get; set; }
        public long? Idsts { get; set; }
        public long? Idbkas { get; set; }
        public long? Idunit { get; set; }
        public long? Idttd { get; set; }
        public string Nobukti { get; set; }
        public string Nobbantu { get; set; }
        public DateTime? Tglkas { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Uraian { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public int Idxttd { get; set; }
        public DateTime? Tgl1 { get; set; }
        public DateTime? Tgl2 { get; set; }
        public string Nosts { get; set; }
        public int Idxkode { get; set; }
        public string Kdstatus { get; set; }
        public long Idbend { get; set; }
        public DateTime? Tglsts { get; set; }
        public string Nmbkas { get; set; }
        public decimal? Penerimaan { get; set; }
        public decimal? Potongan { get; set; }
        public decimal? Diterima { get; set; }
    }
    public class BkukView
    {
        public long Idbkud { get; set; }
        public string Nobukas { get; set; }
        public long? Idkas { get; set; }
        public long? Idsp2d { get; set; }
        public long? Idbkas { get; set; }
        public long? Idunit { get; set; }
        public long? Idttd { get; set; }
        public string Nobukti { get; set; }
        public string Nobbantu { get; set; }
        public DateTime? Tglkas { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Uraian { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public int Idxttd { get; set; }
        public DateTime? Tgl1 { get; set; }
        public DateTime? Tgl2 { get; set; }
        public string Nosp2d { get; set; }
        public int Idxkode { get; set; }
        public string Kdstatus { get; set; }
        public long Idbend { get; set; }
        public DateTime? Tglsts { get; set; }
        public string Nmbkas { get; set; }
        public decimal? Pajak { get; set; }
        public decimal? Potongan { get; set; }
        public decimal? Dibayar { get; set; }
        public decimal? Afektasi { get; set; }
    }
}
