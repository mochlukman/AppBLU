using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Dto
{
    public class BktmemdetViewDto
    {
        public long Idbmdet { get; set; }
        public long Idbm { get; set; }
        public long Idrek { get; set; }
        public long Idkeg { get; set; }
        public string Kdpers { get; set; }
        public decimal? Nilai { get; set; }
        public string Tname { get; set; }
        public string Jenis { get; set; }
        public string Kdper { get; set; }
        public string Nmper { get; set; }
    }
}
