using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Tbpl
    {
        public Tbpl()
        {
            Npdtbpl = new HashSet<Npdtbpl>();
            Tbpldet = new HashSet<Tbpldet>();
        }

        public long Idtbpl { get; set; }
        public long Idunit { get; set; }
        public string Notbpl { get; set; }
        public long? Idbend { get; set; }
        public string Kdstatus { get; set; }
        public int Idxkode { get; set; }
        public DateTime? Tgltbpl { get; set; }
        public string Penyetor { get; set; }
        public string Alamat { get; set; }
        public string Uraitbpl { get; set; }
        public DateTime? Tglvalid { get; set; }
        public long? Kdrilis { get; set; }
        public int? Stkirim { get; set; }
        public int? Stcair { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public Zkode IdxkodeNavigation { get; set; }
        public Jcair StcairNavigation { get; set; }
        public Jkirim StkirimNavigation { get; set; }
        public ICollection<Npdtbpl> Npdtbpl { get; set; }
        public ICollection<Tbpldet> Tbpldet { get; set; }
    }
}
