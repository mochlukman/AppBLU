using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Npd
    {
        public Npd()
        {
            Npdbpk = new HashSet<Npdbpk>();
            Npdpjk = new HashSet<Npdpjk>();
            Npdsts = new HashSet<Npdsts>();
            Npdtbpl = new HashSet<Npdtbpl>();
        }

        public long Idnpd { get; set; }
        public string Nonpd { get; set; }
        public long Idunit { get; set; }
        public long Idbend { get; set; }
        public string Idtrans { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglnpd { get; set; }
        public DateTime? Tglkirim { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Jtrans IdtransNavigation { get; set; }
        public ICollection<Npdbpk> Npdbpk { get; set; }
        public ICollection<Npdpjk> Npdpjk { get; set; }
        public ICollection<Npdsts> Npdsts { get; set; }
        public ICollection<Npdtbpl> Npdtbpl { get; set; }
    }
}
