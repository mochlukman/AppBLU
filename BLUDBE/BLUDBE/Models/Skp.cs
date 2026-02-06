using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Skp
    {
        public Skp()
        {
            Skpdet = new HashSet<Skpdet>();
            Skpsts = new HashSet<Skpsts>();
            Skptbp = new HashSet<Skptbp>();
        }

        public long Idskp { get; set; }
        public long Idunit { get; set; }
        public string Noskp { get; set; }
        public string Kdstatus { get; set; }
        public long? Idbend { get; set; }
        public string Npwpd { get; set; }
        public int Idxkode { get; set; }
        public DateTime? Tglskp { get; set; }
        public string Penyetor { get; set; }
        public string Alamat { get; set; }
        public string Uraiskp { get; set; }
        public DateTime? Tgltempo { get; set; }
        public decimal? Bunga { get; set; }
        public decimal? Kenaikan { get; set; }
        public long? Idphk3 { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Daftphk3 Idphk3Navigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public ICollection<Skpdet> Skpdet { get; set; }
        public ICollection<Skpsts> Skpsts { get; set; }
        public ICollection<Skptbp> Skptbp { get; set; }
    }
}
