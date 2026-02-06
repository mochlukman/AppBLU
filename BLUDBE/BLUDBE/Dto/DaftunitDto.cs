using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class DaftunitView
    {
        public long Idunit { get; set; }
        public long? Idpemda { get; set; }
        public long? Idurus { get; set; }
        public string Kdunit { get; set; }
        public string Nmunit { get; set; }
        public int Kdlevel { get; set; }
        public string Type { get; set; }
        public string Akrounit { get; set; }
        public string Alamat { get; set; }
        public string Telepon { get; set; }
        public int? Staktif { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public Dafturus IdurusNavigation { get; set; }
        public Struunit KdlevelNavigation { get; set; }
    }
}
