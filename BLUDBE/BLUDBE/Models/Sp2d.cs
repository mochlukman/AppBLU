using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Sp2d
    {
        public Sp2d()
        {
            Bkuk = new HashSet<Bkuk>();
            Sp2dbpk = new HashSet<Sp2dbpk>();
            Sp2dcheckdok = new HashSet<Sp2dcheckdok>();
            Sp2ddetb = new HashSet<Sp2ddetb>();
            Sp2ddetd = new HashSet<Sp2ddetd>();
            Sp2ddetr = new HashSet<Sp2ddetr>();
            Sp2dntpn = new HashSet<Sp2dntpn>();
        }

        public long Idsp2d { get; set; }
        public string Nosp2d { get; set; }
        public long Idunit { get; set; }
        public string Kdstatus { get; set; }
        public long? Idspm { get; set; }
        public string Nospm { get; set; }
        public long? Idbend { get; set; }
        public long? Idphk3 { get; set; }
        public long? Idttd { get; set; }
        public long? Idppk { get; set; }
        public int? Idxkode { get; set; }
        public string Noreg { get; set; }
        public long? Idkeg { get; set; }
        public string Ketotor { get; set; }
        public long? Idkontrak { get; set; }
        public string Keperluan { get; set; }
        public string Penolakan { get; set; }
        public string Validasi { get; set; }
        public string Verifikasi { get; set; }
        public DateTime? Tglvalid { get; set; }
        public DateTime? Tglsp2d { get; set; }
        public DateTime? Tglspm { get; set; }
        public string Nobbantu { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Bend IdbendNavigation { get; set; }
        public Kontrak IdkontrakNavigation { get; set; }
        public Ppk IdppkNavigation { get; set; }
        public Spm IdspmNavigation { get; set; }
        public Jabttd IdttdNavigation { get; set; }
        public Zkode IdxkodeNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public Bkbkas NobbantuNavigation { get; set; }
        public Bkusp2d Bkusp2d { get; set; }
        public Dpdet Dpdet { get; set; }
        public ICollection<Bkuk> Bkuk { get; set; }
        public ICollection<Sp2dbpk> Sp2dbpk { get; set; }
        public ICollection<Sp2dcheckdok> Sp2dcheckdok { get; set; }
        public ICollection<Sp2ddetb> Sp2ddetb { get; set; }
        public ICollection<Sp2ddetd> Sp2ddetd { get; set; }
        public ICollection<Sp2ddetr> Sp2ddetr { get; set; }
        public ICollection<Sp2dntpn> Sp2dntpn { get; set; }
    }
}
