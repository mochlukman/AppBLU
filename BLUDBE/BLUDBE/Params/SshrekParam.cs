using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SshrekPost
    {
        [Required]
        public long Idssh { get; set; }
        [Required]
        public List<long>Idrek { get; set; }
        public string Kdssh { get; set; }
    }
}
