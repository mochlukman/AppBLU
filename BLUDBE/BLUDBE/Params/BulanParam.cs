using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class BulanPost
    {
        public int Idbulan { get; set; }
        [Required]
        public int Kdperiode { get; set; }
        public string KetBulan { get; set; }
    }
}
