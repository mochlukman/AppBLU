using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class ActivateParam
    {
        [Required]
        public string Serial { get; set; }
    }
}
