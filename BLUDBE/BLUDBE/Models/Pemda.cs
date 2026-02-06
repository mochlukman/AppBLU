using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Pemda
    {
        public long Idpemda { get; set; }
        public string Configid { get; set; }
        public string Configval { get; set; }
        public string Configdes { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
