using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Tbp
    {
        public Tbp()
        {
            Bkutbp = new HashSet<Bkutbp>();
            Tbpdetb = new HashSet<Tbpdetb>();
            Tbpdetd = new HashSet<Tbpdetd>();
            Tbpdetr = new HashSet<Tbpdetr>();
            Tbpdett = new HashSet<Tbpdett>();
        }

        public long Idtbp { get; set; }
        public long Idunit { get; set; }
        public string Notbp { get; set; }
        public long? Idbend1 { get; set; }
        public string Kdstatus { get; set; }
        public long? Idbend2 { get; set; }
        public int Idxkode { get; set; }
        public DateTime? Tgltbp { get; set; }
        public string Penyetor { get; set; }
        public string Alamat { get; set; }
        public string Uraitbp { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public string Ketvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Bend Idbend1Navigation { get; set; }
        public Bend Idbend2Navigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public Skptbp Skptbp { get; set; }
        public Tbpsts Tbpsts { get; set; }
        public ICollection<Bkutbp> Bkutbp { get; set; }
        public ICollection<Tbpdetb> Tbpdetb { get; set; }
        public ICollection<Tbpdetd> Tbpdetd { get; set; }
        public ICollection<Tbpdetr> Tbpdetr { get; set; }
        public ICollection<Tbpdett> Tbpdett { get; set; }
    }
}
