using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Webset
    {
        public long Idwebset { get; set; }
        public string Kdset { get; set; }
        public string Valset { get; set; }
        public string Valdesc { get; set; }
        public int? Modeentry { get; set; }
        public string Vallist { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
