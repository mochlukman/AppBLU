using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class PanjarGet
    {
        [Required]
        public long Idunit { get; set; }
        [Required]
        public long? Idbend { get; set; }
        [Required]
        public int Idxkode { get; set; }
        [Required]
        public string Kdstatus { get; set; }
    }
    public class PanjarPost
    {
        public long Idpanjar { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Nopanjar { get; set; }
        [Required]
        public long? Idbend { get; set; }
        public long? Idpeg { get; set; }
        [Required]
        public int Idxkode { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        public string Referensi { get; set; }
        public bool? Sttunai { get; set; }
        public bool? Stbank { get; set; }
        public DateTime? Tglpanjar { get; set; }
        [Required]
        public string Uraian { get; set; }
        public bool? Valid { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Validby { get; set; }
    }
    public class PanjarGetUrutPost
    {
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public long? Idbend { get; set; }
    }
}
