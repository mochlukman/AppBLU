using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jurnalhed
    {
        public long Idjurnalhed { get; set; }
        public string Jbku { get; set; }
        public string Kdstatus { get; set; }
        public string JnsJurnal { get; set; }
        public long? Idunit { get; set; }
        public string Nobkuskpd { get; set; }
        public string Nobukti { get; set; }
        public DateTime? Tglbukti { get; set; }
        public string Uraian { get; set; }
        public long? Idbend { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Stpost { get; set; }
        public DateTime? Createdate { get; set; }
    }
}
