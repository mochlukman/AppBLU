using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class PanjardetView
    {
        public long Idpanjardet { get; set; }
        public long Idpanjar { get; set; }
        public long Idkeg { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Panjar IdpanjarNavigation { get; set; }
        public Mkegiatan Kegiatan { get; set; }
        public Jtrnlkas IdnojetraNavigation { get; set; }
    }
    public class PanjardetPost
    {
        public long Idpanjardet { get; set; }
        [Required]
        public long Idpanjar { get; set; }
        [Required]
        public long Idkeg { get; set; }
        public decimal? Nilai { get; set; }
        [Required]
        public int Idnojetra { get; set; }
    }
}
