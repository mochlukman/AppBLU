using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class JtrnlkasPost
    {
        [Required]
        public int Idnojetra { get; set; }
        [Required]
        public string Nmjetra { get; set; }
        [Required]
        public string Kdpers { get; set; }
    }
}
