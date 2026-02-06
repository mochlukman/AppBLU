using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class AdendumPost
    {
        public long Idadd { get; set; }
        [Required]
        public long? Idunit { get; set; }
        [Required]
        public long? Idkeg { get; set; }
        [Required]
        public string Noadd { get; set; }
        public DateTime? Tgladd { get; set; }
        public long? Idkontrak { get; set; }
        public decimal? Nilaiawal { get; set; }
        public decimal? Nilaiadd { get; set; }
    }
}
