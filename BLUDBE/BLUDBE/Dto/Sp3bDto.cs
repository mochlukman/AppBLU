using BLUDBE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Dto
{
    public class Sp3bView
    {
        public long Idsp3b { get; set; }
        public long Idunit { get; set; }
        public string Nosp3b { get; set; }
        public DateTime? Tglsp3b { get; set; }
        public string Uraisp3b { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Validby { get; set; }
        public long? Keybend { get; set; }
        public bool? Valid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long Idsp3bdet { get; set; }
        public string Nospj { get; set; }
        public decimal? Nilai { get; set; }
        public long? Idrek { get; set; }
        public long? Idjnsakun { get; set; }

        public Daftrekening IdrekNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
    }
}
