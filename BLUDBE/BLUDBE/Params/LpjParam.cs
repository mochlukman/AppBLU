using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class LpjGetsParam
    {
        [Required]
        public long Idunit { get; set; }
        public long? Idbend { get; set; }
    }
    public class LpjPost
    {
        public long Idlpj { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Nolpj { get; set; }
        public long? Idttd { get; set; }
        [Required]
        public int Idxkode { get; set; }
        public long? Idbend { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Tgllpj { get; set; }
        public DateTime? Tglbuku { get; set; }
        public string Nosah { get; set; }
        public DateTime? Tglsah { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Keterangan { get; set; }
        public string Verifikasi { get; set; }
    }
    public class SpjlpjPost
    {
        [Required]
        public long Idlpj { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public long? Idbend { get; set; }
        [Required]
        public List<long> Idspj { get; set; }
    }
}
