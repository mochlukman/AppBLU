using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Spm
    {
        public Spm()
        {
            Sp2d = new HashSet<Sp2d>();
            Spmcheckdok = new HashSet<Spmcheckdok>();
            Spmdetb = new HashSet<Spmdetb>();
            Spmdetd = new HashSet<Spmdetd>();
        }

        public long Idspm { get; set; }
        public long Idunit { get; set; }
        public string Nospm { get; set; }
        public string Kdstatus { get; set; }
        public long Idbend { get; set; }
        public long Idspp { get; set; }
        public long? Idphk3 { get; set; }
        public int Idxkode { get; set; }
        public string Noreg { get; set; }
        public long? Idkeg { get; set; }
        public string Ketotor { get; set; }
        public long? Idkontrak { get; set; }
        public string Keperluan { get; set; }
        public string Penolakan { get; set; }
        public decimal? Nilaiup { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Tglspm { get; set; }
        public DateTime? Tglspp { get; set; }
        public bool? Status { get; set; }
        public string Validasi { get; set; }
        public string Verifikasi { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public DateTime? Tglaprove { get; set; }
        public string Approveby { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Kontrak IdkontrakNavigation { get; set; }
        public Daftphk3 Idphk3Navigation { get; set; }
        public Spp IdsppNavigation { get; set; }
        public Zkode IdxkodeNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public ICollection<Sp2d> Sp2d { get; set; }
        public ICollection<Spmcheckdok> Spmcheckdok { get; set; }
        public ICollection<Spmdetb> Spmdetb { get; set; }
        public ICollection<Spmdetd> Spmdetd { get; set; }
    }
}
