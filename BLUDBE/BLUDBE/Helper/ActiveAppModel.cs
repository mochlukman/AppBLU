using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Helper
{
    public class ActiveAppModel
    {
        public string Cpuid { get; set; }
        public string Aplikasi { get; set; }
        public string Serial { get; set; }
        public string Publickey { get; set; }
        public DateTime? Tglberlaku { get; set; }
        public string Tipe { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
