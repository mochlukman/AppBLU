using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SppdetrpPost
    {
        public long Idsppdetrp { get; set; }
        [Required]
        public long Idsppdetr { get; set; }
        [Required]
        public long Idpajak { get; set; }
        public decimal? Nilai { get; set; }
        public string Keterangan { get; set; }
        public string Idbilling { get; set; }
        public DateTime? Tglbilling { get; set; }
        public string Ntpn { get; set; }
        public string Ntb { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
