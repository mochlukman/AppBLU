using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SetrapbdrbaPost
    {
        [Required]
        public long Idrekapbd { get; set; }
        public List<long> Idrekrba { get; set; }
    }
}
