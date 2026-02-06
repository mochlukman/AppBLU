using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Daftbarang
    {
        public Daftbarang()
        {
            Ssh = new HashSet<Ssh>();
        }

        public long Idbrg { get; set; }
        public long? Idparent { get; set; }
        public string Kdbrg { get; set; }
        public string Nmbrg { get; set; }
        public int? Mtglevel { get; set; }
        public string Type { get; set; }
        public string Ket { get; set; }
        public DateTime? Createddate { get; set; }
        public string Createdby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Strurek MtglevelNavigation { get; set; }
        public ICollection<Ssh> Ssh { get; set; }
    }
}
