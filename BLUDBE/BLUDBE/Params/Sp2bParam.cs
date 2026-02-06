using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class Sp2bGet
    {
        public long Idsp2b { get; set; }
        public string Nosp2b { get; set; }
        public long? Idunit { get; set; }
        public DateTime? Tglsp2b { get; set; }
        public string Uraian { get; set; }
        public string Validby { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
    }
    public class Sp2bPost
    {
        public long Idsp2b { get; set; }
        public string Nosp2b { get; set; }
        public long? Idunit { get; set; }
        public DateTime? Tglsp2b { get; set; }
        public string Uraian { get; set; }
        public string Validby { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
    }
}
