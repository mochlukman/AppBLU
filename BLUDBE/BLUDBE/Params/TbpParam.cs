using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class TbpGet
    {
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public int Idxkode { get; set; }
        public long? Idbend { get; set; }
        public bool Isvalid { get; set; }
        public bool ExceptTbpsts { get; set; } //gunakan ketika data yang di ambil selain yang udah ada di table tbp-sts
    }
    public class TbpPost
    {
        public long Idtbp { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Notbp { get; set; }
        public long? Idbend1 { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        public long? Idbend2 { get; set; }
        [Required]
        public int Idxkode { get; set; }
        public DateTime? Tgltbp { get; set; }
        public string Penyetor { get; set; }
        public string Alamat { get; set; }
        public string Uraitbp { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public string Ketvalid { get; set; }
        public long Idskp { get; set; }
    }
    public class TbpdettGet
    {
        [Required]
        public long Idtbp { get; set; }
    }
    public class TbpdettPost
    {
        public long Idtbpdett { get; set; }
        [Required]
        public long Idtbp { get; set; }
        [Required]
        public List<long> Idbend { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class TbpdettUpdate
    {
        [Required]
        public long Idtbpdett { get; set; }
        public long Idtbp { get; set; }
        [Required]
        public decimal? Nilai { get; set; }
    }
    public class TbpdettkegPost
    {
        public long Idtbpdettkeg { get; set; }
        [Required]
        public long Idtbpdett { get; set; }
        [Required]
        public long Idkeg { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class TbpdetdPost
    {
        public long Idtbpdetd { get; set; }
        [Required]
        public long Idtbp { get; set; }
        [Required]
        public List<long> Idrek { get; set; }
        public int Idnojetra { get; set; }
        public List<decimal?> Nilai { get; set; }
    }
    public class TbpdetdUpdate
    {
        [Required]
        public long Idtbpdetd { get; set; }
        public decimal? Nilai { get; set; }
    }
}
