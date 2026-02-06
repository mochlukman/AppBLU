using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class SpjlpjView
    {
        public long Idspjlpj { get; set; }
        public long Idspj { get; set; }
        public long Idlpj { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public Spj IdspjNavigation { get; set; }
        public decimal? Nilai { get; set; }
    }
}
