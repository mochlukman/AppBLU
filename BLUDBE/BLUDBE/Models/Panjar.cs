using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Panjar
    {
        public Panjar()
        {
            Bkupanjar = new HashSet<Bkupanjar>();
            Panjardet = new HashSet<Panjardet>();
        }

        public long Idpanjar { get; set; }
        public long Idunit { get; set; }
        public string Nopanjar { get; set; }
        public long? Idbend { get; set; }
        public long? Idpeg { get; set; }
        public int Idxkode { get; set; }
        public string Kdstatus { get; set; }
        public bool? Sttunai { get; set; }
        public bool? Stbank { get; set; }
        public DateTime? Tglpanjar { get; set; }
        public string Uraian { get; set; }
        public string Referensi { get; set; }
        public bool? Valid { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Validby { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Zkode IdxkodeNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public ICollection<Bkupanjar> Bkupanjar { get; set; }
        public ICollection<Panjardet> Panjardet { get; set; }
    }
}
