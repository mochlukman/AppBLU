using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bkusts
    {
        public Bkusts()
        {
            Bkustsspjtr = new HashSet<Bkustsspjtr>();
        }

        public long Idbkusts { get; set; }
        public string Nobkuskpd { get; set; }
        public long? Idunit { get; set; }
        public long? Idttd { get; set; }
        public DateTime? Tglbkuskpd { get; set; }
        public long Idsts { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglvalid { get; set; }
        public long? Idbend { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Sts IdstsNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public ICollection<Bkustsspjtr> Bkustsspjtr { get; set; }
    }
}
