using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class StsGet
    {
        [Required]
        public long Idunit { get; set; }
        public long? Idbend { get; set; }
        public int Idxkode { get; set; }
        public string Kdstatus { get; set; }
    }
    public class StsGetForBkuBud
    {
        public long Idunit { get; set; }
        public long? Idbend { get; set; }
        public int Idxkode { get; set; }
        public string Kdstatus { get; set; }
    }
    public class StsPost
    {
        public long Idsts { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Nosts { get; set; }
        public long? Idbend { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public int Idxkode { get; set; }
        [Required]
        public string Nobbantu { get; set; }
        public DateTime? Tglsts { get; set; }
        public string Uraian { get; set; }
        public bool? Valid { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Validby { get; set; }
        public string Ketvalid { get; set; }
        public long? Kdrilis { get; set; }
        public int? Stkirim { get; set; }
        public int? Stcair { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long Idskp { get; set; }
        public decimal? Nilaiup { get; set; }
    }
    public class StsdetdPost
    {
        public long Idstsdetd { get; set; }
        [Required]
        public long Idsts { get; set; }
        [Required]
        public List<long> Idrek { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class StsdetdUpdate
    {
        [Required]
        public long Idstsdetd { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class TbpstsPost
    {
        [Required]
        public long Idtbp { get; set; }
        [Required]
        public long Idsts { get; set; }
    }
    public class StsdetbPost
    {
        public long Idstsdetb { get; set; }
        [Required]
        public long Idsts { get; set; }
        [Required]
        public List<long> Idrek { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class StsdetbUpdate
    {
        [Required]
        public long Idstsdetb { get; set; }
        public decimal? Nilai { get; set; }
        public long Idsts { get; set; }
        public long Idrek { get; set; }
    }
    public class StsdettPost
    {
        public long Idstsdett { get; set; }
        [Required]
        public long Idsts { get; set; }
        [Required]
        public string Nobbantu { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class StsdettUpdate
    {
        [Required]
        public long Idstsdett { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class StsdetrPost
    {
        public long Idstsdetr { get; set; }
        [Required]
        public long Idsts { get; set; }
        [Required]
        public long? Idkeg { get; set; }
        [Required]
        public long Idrek { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
    }
}
