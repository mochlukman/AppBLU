using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bkud
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
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
