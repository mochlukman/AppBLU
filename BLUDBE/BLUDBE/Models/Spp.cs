using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Spp
    {
        public Spp()
        {
            Spjspp = new HashSet<Spjspp>();
            Spm = new HashSet<Spm>();
            Sppbpk = new HashSet<Sppbpk>();
            Sppcheckdok = new HashSet<Sppcheckdok>();
            Sppdetb = new HashSet<Sppdetb>();
            Sppdetd = new HashSet<Sppdetd>();
            Sppdetr = new HashSet<Sppdetr>();
            Spptag = new HashSet<Spptag>();
        }

        public long Idspp { get; set; }
        public long Idunit { get; set; }
        public string Nospp { get; set; }
        public string Kdstatus { get; set; }
        public int Idbulan { get; set; }
        public long? Idbend { get; set; }
        public long? Idphk3 { get; set; }
        public int Idxkode { get; set; }
        public long? Idkeg { get; set; }
        public string Noreg { get; set; }
        public string Ketotor { get; set; }
        public long? Idkontrak { get; set; }
        public string Keperluan { get; set; }
        public string Penolakan { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Tglspp { get; set; }
        public bool? Status { get; set; }
        public string Validasi { get; set; }
        public string Verifikasi { get; set; }
        public bool? Valid { get; set; }
        public decimal? Nilaiup { get; set; }
        public string Validby { get; set; }
        public DateTime? Tglaprove { get; set; }
        public string Approveby { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Bulan IdbulanNavigation { get; set; }
        public Kontrak IdkontrakNavigation { get; set; }
        public Daftphk3 Idphk3Navigation { get; set; }
        public Daftunit IdunitNavigation { get; set; }
        public Zkode IdxkodeNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public ICollection<Spjspp> Spjspp { get; set; }
        public ICollection<Spm> Spm { get; set; }
        public ICollection<Sppbpk> Sppbpk { get; set; }
        public ICollection<Sppcheckdok> Sppcheckdok { get; set; }
        public ICollection<Sppdetb> Sppdetb { get; set; }
        public ICollection<Sppdetd> Sppdetd { get; set; }
        public ICollection<Sppdetr> Sppdetr { get; set; }
        public ICollection<Spptag> Spptag { get; set; }
    }
}
