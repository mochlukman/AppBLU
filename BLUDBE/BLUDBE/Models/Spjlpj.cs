using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Spjlpj
    {
        public long Idspjlpj { get; set; }
        public long Idspj { get; set; }
        public long Idlpj { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Lpj IdlpjNavigation { get; set; }
        public Spj IdspjNavigation { get; set; }
    }
}
