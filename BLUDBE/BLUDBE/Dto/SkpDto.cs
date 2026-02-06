using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class SkpView
    {
        public long Idskp { get; set; }
        public long Idunit { get; set; }
        public string Noskp { get; set; }
        public string Kdstatus { get; set; }
        public long? Idbend { get; set; }
        public string Npwpd { get; set; }
        public int Idxkode { get; set; }
        public long? Idphk3 { get; set; }
        public DateTime? Tglskp { get; set; }
        public string Penyetor { get; set; }
        public string Alamat { get; set; }
        public string Uraiskp { get; set; }
        public DateTime? Tgltempo { get; set; }
        public decimal? Bunga { get; set; }
        public decimal? Kenaikan { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public Daftphk3 Idphk3Navigation { get; set; }
        public ICollection<Skpdet> Skpdet { get; set; }
    }
}
