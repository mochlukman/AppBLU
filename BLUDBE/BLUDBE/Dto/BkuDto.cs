using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class BkuView
    {
        public int Nmr { get; set; }
        public long Idunit { get; set; }
        public long Idbend { get; set; }
        public long? Idxttd { get; set; }
        public string Nobkuskpd { get; set; }
        public string Nobukti { get; set; }
        public DateTime Tgl1 { get; set; }
        public DateTime Tgl2 { get; set; }
        public DateTime Tglbkuskpd { get; set; }
        public DateTime Tglvalid { get; set; }
        public string Uraian { get; set; }
        public DateTime Tglbukti { get; set; }
        public DateTime Tglkas { get; set; }
        public string Jenis { get; set; }
        public int Idxkode { get; set; }
        public string Kdstatus { get; set; }
        public decimal? Afektasi { get; set; }
        public decimal? Potongan { get; set; }
        public decimal? Dibayar { get; set; }
    }
    public class BkuPenerimaanView
    {
        public long Idbku { get; set; }
        public int Nmr { get; set; }
        public long Idunit { get; set; }
        public long Idbend { get; set; }
        public long? Idxttd { get; set; }
        public string Nobkuskpd { get; set; }
        public string Nobukti { get; set; }
        public DateTime? Tgl1 { get; set; }
        public DateTime? Tgl2 { get; set; }
        public DateTime? Tglbkuskpd { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Tglvalidbku { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglbukti { get; set; }
        public DateTime? Tglkas { get; set; }
        public string Jenis { get; set; }
        public int Idxkode { get; set; }
        public string Kdstatus { get; set; }
        public decimal? Penerimaan { get; set; }
        public decimal? Potongan { get; set; }
        public decimal? Diterima { get; set; }
    }
    public class BkutbpspjtrView
    {
        public long Idbkutbpspjtr { get; set; }
        public long Idspjtr { get; set; }
        public long Idbkutbp { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bkutbp IdbkutbpNavigation { get; set; }
        public Spjtr IdspjtrNavigation { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class BkustsspjtrView
    {
        public long Idbkustsspjtr { get; set; }
        public long Idspjtr { get; set; }
        public long Idbkusts { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bkusts IdbkustsNavigation { get; set; }
        public Spjtr IdspjtrNavigation { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class BkuUpdateValid
    {
        public long Idbku { get; set; }
        public string Jenis { get; set; }
        public DateTime? Tglvalidbku { get; set; }
    }
    public class JurnalDetView
    {
        public string Kdper { get; set; }
        public string Nmper { get; set; }
        public decimal? Nilaid { get; set; }
        public decimal? Nilaik { get; set; }
        public decimal? Nilnol { get; set; }
        public string Kdkegunit { get; set; }

    }
}
