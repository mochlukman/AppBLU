using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class DpGet
    {
        public int? Idxkode { get; set; }
        public long? Idttd { get; set; }
    }
    public class DpPost
    {
        public long Iddp { get; set; }
        [Required]
        public string Nodp { get; set; }
        [Required]
        public int? Idxkode { get; set; }
        [Required]
        public long? Idttd { get; set; }
        public DateTime? Tgldp { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglvalid { get; set; }
    }
    public class DpdetPost
    {
        public long Iddpdet { get; set; }
        [Required]
        public long Iddp { get; set; }
        [Required]
        public List<long> Idsp2d { get; set; }
    }
}
