using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class PaguskpdView
    {
        public long Idpaguskpd { get; set; }
        public long Idunit { get; set; }
        public string Kdunit { get; set; }
        public string Nmunit { get; set; }
        public string Kdtahap { get; set; }
        public decimal? Nilaiup { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public Tahap KdtahapNavigation { get; set; }
    }
}
