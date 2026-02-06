using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SpjapbdGet
    {
        public long Idspjapbd { get; set; }
        public long Idunit { get; set; }
        public long Idkeg { get; set; }
        public string Nospj { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Tglspj { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public string Keterangan { get; set; }
    }
    public class SpjapbdPost
    {
        public long Idspjapbd { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public long Idkeg { get; set; }
        public string Nospj { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Tglspj { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public string Keterangan { get; set; }
    }
}
