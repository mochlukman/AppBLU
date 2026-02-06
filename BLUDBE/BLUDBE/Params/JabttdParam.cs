using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class JabttdPost
    {
        public long Idttd { get; set; }
        public long Idunit { get; set; }
        [Required]
        public long Idpeg { get; set; }
        [Required]
        public string Kddok { get; set; }
        public string Jabatan { get; set; }
        public string Noskpttd { get; set; }
        public DateTime? Tglskpttd { get; set; }
        public string Noskstopttd { get; set; }
        public DateTime? Tglskstopttd { get; set; }
    }
}
