using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SkpGet
    {
        public long Idunit { get; set; }
        public long? Idbend { get; set; }
        public int Idxkode { get; set; }
        public string Kdstatus { get; set; }
        public bool Istglvalid { get; set; }
    }
    public class SkpPost
    {
        public long Idskp { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Noskp { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public long? Idbend { get; set; }
        public string Npwpd { get; set; }
        public int Idxkode { get; set; }
        public DateTime? Tglskp { get; set; }
        public string Penyetor { get; set; }
        public string Alamat { get; set; }
        public long? Idphk3 { get; set; }
        public string Uraiskp { get; set; }
        public DateTime? Tgltempo { get; set; }
        public decimal? Bunga { get; set; }
        public decimal? Kenaikan { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
    }
    public class SkpdetPost
    {
        public long Idskpdet { get; set; }
        [Required]
        public long Idskp { get; set; }
        [Required]
        public List<long> Idrek { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class SkpdetUpdate
    {
        [Required]
        public long Idskpdet { get; set; }
        public decimal? Nilai { get; set; }
    }
}
