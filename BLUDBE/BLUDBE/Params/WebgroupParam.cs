using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class WebgroupPost
    {
        public long Groupid { get; set; }
        [Required]
        public string Nmgroup { get; set; }
        public string Ket { get; set; }
    }
}
