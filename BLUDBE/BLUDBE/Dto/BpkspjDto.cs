using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class BpkspjView
    {
        public long Idbpkspj { get; set; }
        public long Idbpk { get; set; }
        public long Idspj { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public Bpk IdbpkNavigation { get; set; }
        public decimal? Nilai { get; set; }
    }
}
