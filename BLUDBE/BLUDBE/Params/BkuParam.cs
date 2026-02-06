using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class BkuParam1
    {
        [Required]
        public long Idunit { get; set; }
        [Required]
        public long Idbend { get; set; }
        public string Jenis { get; set; }
        [Required]
        public DateTime Tgl1 { get; set; }
        [Required]
        public DateTime Tgl2 { get; set; }
        public string Nodok { get; set; }
    }
    public class BkuParam2
    {
        [Required]
        public long Idunit { get; set; }
        public long Idbend { get; set; }
        public string Jenis { get; set; }
        [Required]
        public DateTime Tgl1 { get; set; }
        [Required]
        public DateTime Tgl2 { get; set; }
        public string Nodok { get; set; }
        public string JurnalType { get; set; }
    }
    public class BkuParamRef
    {
        [Required]
        public long Idunit { get; set; }
        [Required]
        public long Idbend { get; set; }
    }
    public class BkuPost
    {
        [Required]
        public long Idbku { get; set; }
        [Required]
        public string Nobku { get; set; }
        [Required]
        public long? Idunit { get; set; }
        public DateTime? Tglbku { get; set; }
        [Required]
        public long Idref { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglvalid { get; set; }
        [Required]
        public long? Idbend { get; set; }
        [Required]
        public string Jenis { get; set; }
    }
    public class BkutbpspjtrPost
    {
        [Required]
        public long Idspjtr { get; set; }
        [Required]
        public List<long> Idbkutbp { get; set; }
    }
    public class BkustsspjtrPost
    {
        [Required]
        public long Idspjtr { get; set; }
        [Required]
        public List<long> Idbkusts { get; set; }
    }
    public class BkuJurnalParam
    {
        [Required]
        public long Idunit { get; set; }
        public string Jenis { get; set; }
        public string Nobukti { get; set; }
        public string JenisJurnal { get; set; }
    }
    public class JurnalParam1
    {
        [Required]
        public string Nobbantu { get; set; }
        [Required]
        public DateTime Tgl1 { get; set; }
        [Required]
        public DateTime Tgl2 { get; set; }
    }
    public class JurnalAyat1
    {
        public string Jenis { get; set; }
        public string Nobukti { get; set; }
        public string JenisJurnal { get; set; }
    }
    public class JurnalKonsolidatorUpdateValid
    {
        public long Idbku { get; set; }
        public string Jenis { get; set; }
        public DateTime? Tglvalid { get; set; }
    }
}
