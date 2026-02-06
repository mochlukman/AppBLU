using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class BkbankGet
    {
        public long Idunit { get; set; }
        public long Idbend { get; set; }
        public string Kdstatus { get; set; }
    }
    public class BkbankPost
    {
        public long Idbkbank { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public long Idbend { get; set; }
        [Required]
        public string Nobuku { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        public DateTime? Tglbuku { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
    }
    public class BkbankdetPost
    {
        public long Idbankdet { get; set; }
        [Required]
        public long Idbkbank { get; set; }
        [Required]
        public int Idnojetra { get; set; }
        [Required]
        public decimal? Nilai { get; set; }
    }
}
