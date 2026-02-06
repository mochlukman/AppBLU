using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bkutbp
    {
        public Bkutbp()
        {
            Bkutbpspjtr = new HashSet<Bkutbpspjtr>();
        }

        public long Idbkutbp { get; set; }
        public string Nobkuskpd { get; set; }
        public long? Idunit { get; set; }
        public long? Idttd { get; set; }
        public DateTime? Tglbkuskpd { get; set; }
        public long Idtbp { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglvalid { get; set; }
        public long? Idbend { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Tbp IdtbpNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public ICollection<Bkutbpspjtr> Bkutbpspjtr { get; set; }
    }
}
