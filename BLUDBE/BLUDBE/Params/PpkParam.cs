using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class PpkGet
    {
        public long Idppk { get; set; }
        public long? Idunit { get; set; }
        public long Idpeg { get; set; }
    }
    public class PpkPost
    {
        public long Idppk { get; set; }
        public long? Idunit { get; set; }
        [Required]
        public long Idpeg { get; set; }
    }
}
