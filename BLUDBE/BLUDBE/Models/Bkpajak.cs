using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bkpajak
    {
        public Bkpajak()
        {
            Bkpajakdetstr = new HashSet<Bkpajakdetstr>();
            Npdpjk = new HashSet<Npdpjk>();
        }

        public long Idbkpajak { get; set; }
        public long Idunit { get; set; }
        public long Idbend { get; set; }
        public string Nobkpajak { get; set; }
        public int Idttd { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Tglbkpajak { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglvalid { get; set; }
        public long? Kdrilis { get; set; }
        public int? Stkirim { get; set; }
        public int? Stcair { get; set; }
        public int? Idtransfer { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Zkode IdttdNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public Jcair StcairNavigation { get; set; }
        public Jkirim StkirimNavigation { get; set; }
        public ICollection<Bkpajakdetstr> Bkpajakdetstr { get; set; }
        public ICollection<Npdpjk> Npdpjk { get; set; }
    }
}
