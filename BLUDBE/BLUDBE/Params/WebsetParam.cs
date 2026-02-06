using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class WebsetPost
    {
        public long Idwebset { get; set; }
        [Required]
        public string Kdset { get; set; }
        public string Valset { get; set; }
        public string Valdesc { get; set; }
        public int? Modeentry { get; set; }
        public string Vallist { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
