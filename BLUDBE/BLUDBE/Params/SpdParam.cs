using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SpdPost
    {
        public long Idspd { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Nospd { get; set; }
        public DateTime? Tglspd { get; set; }
        [Required]
        public int Idbulan1 { get; set; }
        [Required]
        public int Idbulan2 { get; set; }
        [Required]
        public int Idxkode { get; set; }
        public long? Idttd { get; set; }
        public string Keterangan { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long Idkeg { get; set; }
        public bool Transfer { get; set; }
        public bool? Valid { get; set; }
    }
    public class SpddetrUpdate
    {
        [Required]
        public long Idspddetr { get; set; }
        public long Idspd { get; set; }
        public decimal? Nilai { get; set; }
    }
}
