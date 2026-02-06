using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jurnal
    {
        public long Id { get; set; }
        public string Jbku { get; set; }
        public string Kdstatus { get; set; }
        public long? Idunit { get; set; }
        public string Nobkuskpd { get; set; }
        public string Nobukti { get; set; }
        public DateTime? Tglbukti { get; set; }
        public string Uraian { get; set; }
        public long? Idprgrm { get; set; }
        public long? Idkeg { get; set; }
        public long? Idbend { get; set; }
        public string JnsJurnal { get; set; }
        public int? Jnsakund { get; set; }
        public int? Idrekd { get; set; }
        public string Kdperd { get; set; }
        public string Nmperd { get; set; }
        public decimal? Nilaid { get; set; }
        public int? Jnsakunk { get; set; }
        public int? Idrekk { get; set; }
        public string Kdperk { get; set; }
        public string Nmperk { get; set; }
        public decimal? Nilaik { get; set; }
        public int Jurnal1 { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Createdate { get; set; }
    }
}
