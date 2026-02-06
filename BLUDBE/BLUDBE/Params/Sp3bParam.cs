using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class Sp3bGet
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
        public bool forSp2b { get; set; }
    }
    public class Sp3bPost
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
    }
}
