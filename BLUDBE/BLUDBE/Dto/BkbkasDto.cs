using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class BkbkasView
    {
        public string Nobbantu { get; set; }
        public long Idunit { get; set; }
        public long Idrek { get; set; }
        public long Idbank { get; set; }
        public string Nmbkas { get; set; }
        public string Norek { get; set; }
        public decimal? Saldo { get; set; }
        public Daftbank IdbankNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
    }
}
