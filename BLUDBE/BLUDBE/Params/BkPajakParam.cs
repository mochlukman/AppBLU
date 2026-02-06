using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class BkpajakPost
    {
        public long Idbkpajak { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public long Idbend { get; set; }
        [Required]
        public string Nobkpajak { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public DateTime? Tglbkpajak { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglvalid { get; set; }
    }
    public class BkpajakdetstrPost
    {
        public long Idbkpajakdetstr { get; set; }
        public long Idbpkpajakstr { get; set; }
        [Required]
        public long? Idpajak { get; set; }
        [Required]
        public long Idbkpajak { get; set; }
        public string Idbilling { get; set; }
        public DateTime? Tglidbilling { get; set; }
        public DateTime? Tglexpire { get; set; }
        public string Ntpn { get; set; }
        public string Ntb { get; set; }
    }
}
