using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Dto
{
    public class DataTracking
    {
        public bool Canenter { get; set; }
        public int Active { get; set; }
        public string Title { get; set; }
        public string Desc { get; set; }
        public int Done { get; set; }  // 1 : belum, 2 : berlangsung, 3: finish
    }
}
