using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jbank
    {
        public long Idbank { get; set; }
        public string Kdbank { get; set; }
        public string Nmbank { get; set; }
        public string Uraian { get; set; }
        public string Alamat { get; set; }
        public string Akronim { get; set; }
        public DateTime? Datecreate { get; set; }
    }
}
