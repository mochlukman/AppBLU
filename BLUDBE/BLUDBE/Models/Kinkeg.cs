using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Kinkeg
    {
        public long Idkinkeg { get; set; }
        public long? Idkinkegx { get; set; }
        public long Idkegunit { get; set; }
        public string Kdjkk { get; set; }
        public string Nomor { get; set; }
        public string Tolokur { get; set; }
        public decimal? Target { get; set; }
        public string Satuan { get; set; }
        public string Keterangan { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Kegunit IdkegunitNavigation { get; set; }
        public Jkinkeg KdjkkNavigation { get; set; }
    }
}
