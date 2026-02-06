using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class TbplGet
    {
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public int Idxkode { get; set; }
    }
    public class TbplPost
    {
        public long Idtbpl { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Notbpl { get; set; }
        public long? Idbend { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public int Idxkode { get; set; }
        public DateTime? Tgltbpl { get; set; }
        public string Penyetor { get; set; }
        public string Alamat { get; set; }
        public string Uraitbpl { get; set; }
        public DateTime? Tglvalid { get; set; }
        public long? Kdrilis { get; set; }
        public int? Stkirim { get; set; }
        public int? Stcair { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
