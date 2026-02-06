using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SpjGetsParam
    {
        [Required]
        public long Idunit { get; set; }
        public long? Idbend { get; set; }
        public string Kdstatus { get; set; }
    }
    public class SpjGetsForLpjParam
    {
        [Required]
        public long Idlpj { get; set; }
        [Required]
        public long Idunit { get; set; }
        public long? Idbend { get; set; }
        public string Kdstatus { get; set; }
    }
    public class SpjPost
    {
        public long Idspj { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Nospj { get; set; }
        public long? Idttd { get; set; }
        [Required]
        public int Idxkode { get; set; }
        public long? Idbend { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        public DateTime? Tglspj { get; set; }
        public DateTime? Tglbuku { get; set; }
        public string Nosah { get; set; }
        public DateTime? Tglsah { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Keterangan { get; set; }
        public string Verifikasi { get; set; }
        public bool? Valid { get; set; }
    }
    public class BpkspjPost
    {
        [Required]
        public long Idspj { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public long? Idbend { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public List<long> Idbpk { get; set; }
    }
    public class SpjtrPost
    {
        public long Idspjtr { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Nospj { get; set; }
        public long? Idttd { get; set; }
        [Required]
        public int Idxkode { get; set; }
        public long? Idbend { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        public DateTime? Tglspj { get; set; }
        public DateTime? Tglbuku { get; set; }
        public string Nosah { get; set; }
        public DateTime? Tglsah { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Keterangan { get; set; }
        public bool? Sah { get; set; }
        public string Sahby { get; set; }
        public string Ketsah { get; set; }
    }
}
