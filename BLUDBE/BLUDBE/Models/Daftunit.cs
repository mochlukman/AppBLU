using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Daftunit
    {
        public Daftunit()
        {
            Adendum = new HashSet<Adendum>();
            Atasbend = new HashSet<Atasbend>();
            Berita = new HashSet<Berita>();
            Bkbank = new HashSet<Bkbank>();
            Bkbkas = new HashSet<Bkbkas>();
            Bkpajak = new HashSet<Bkpajak>();
            Bktmem = new HashSet<Bktmem>();
            Bkubank = new HashSet<Bkubank>();
            Bkubpk = new HashSet<Bkubpk>();
            Bkupajak = new HashSet<Bkupajak>();
            Bkupanjar = new HashSet<Bkupanjar>();
            Bkusp2d = new HashSet<Bkusp2d>();
            Bkusts = new HashSet<Bkusts>();
            Bkutbp = new HashSet<Bkutbp>();
            Bpk = new HashSet<Bpk>();
            Bpkpajakstr = new HashSet<Bpkpajakstr>();
            Daftphk3 = new HashSet<Daftphk3>();
            Dpa = new HashSet<Dpa>();
            Dpaprogram = new HashSet<Dpaprogram>();
            Lpj = new HashSet<Lpj>();
            Pegawai = new HashSet<Pegawai>();
            Pgrmunit = new HashSet<Pgrmunit>();
            Ppk = new HashSet<Ppk>();
            Profilunit = new HashSet<Profilunit>();
            Prognosisb = new HashSet<Prognosisb>();
            Prognosisd = new HashSet<Prognosisd>();
            Prognosisr = new HashSet<Prognosisr>();
            Rkasah = new HashSet<Rkasah>();
            Saldoawallak = new HashSet<Saldoawallak>();
            Saldoawallo = new HashSet<Saldoawallo>();
            Saldoawallra = new HashSet<Saldoawallra>();
            Saldoawalnrc = new HashSet<Saldoawalnrc>();
            Skp = new HashSet<Skp>();
            Sp3b = new HashSet<Sp3b>();
            Spd = new HashSet<Spd>();
            Spj = new HashSet<Spj>();
            Spjapbd = new HashSet<Spjapbd>();
            Spp = new HashSet<Spp>();
            Sts = new HashSet<Sts>();
            Tbp = new HashSet<Tbp>();
            Tbpl = new HashSet<Tbpl>();
            Urusanunit = new HashSet<Urusanunit>();
            Userskpd = new HashSet<Userskpd>();
            Webuser = new HashSet<Webuser>();
        }

        public long Idunit { get; set; }
        public long? Idpemda { get; set; }
        public long? Idurus { get; set; }
        public string Kdunit { get; set; }
        public string Nmunit { get; set; }
        public int Kdlevel { get; set; }
        public string Type { get; set; }
        public string Akrounit { get; set; }
        public string Alamat { get; set; }
        public string Telepon { get; set; }
        public int? Staktif { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Dafturus IdurusNavigation { get; set; }
        public Struunit KdlevelNavigation { get; set; }
        public ICollection<Adendum> Adendum { get; set; }
        public ICollection<Atasbend> Atasbend { get; set; }
        public ICollection<Berita> Berita { get; set; }
        public ICollection<Bkbank> Bkbank { get; set; }
        public ICollection<Bkbkas> Bkbkas { get; set; }
        public ICollection<Bkpajak> Bkpajak { get; set; }
        public ICollection<Bktmem> Bktmem { get; set; }
        public ICollection<Bkubank> Bkubank { get; set; }
        public ICollection<Bkubpk> Bkubpk { get; set; }
        public ICollection<Bkupajak> Bkupajak { get; set; }
        public ICollection<Bkupanjar> Bkupanjar { get; set; }
        public ICollection<Bkusp2d> Bkusp2d { get; set; }
        public ICollection<Bkusts> Bkusts { get; set; }
        public ICollection<Bkutbp> Bkutbp { get; set; }
        public ICollection<Bpk> Bpk { get; set; }
        public ICollection<Bpkpajakstr> Bpkpajakstr { get; set; }
        public ICollection<Daftphk3> Daftphk3 { get; set; }
        public ICollection<Dpa> Dpa { get; set; }
        public ICollection<Dpaprogram> Dpaprogram { get; set; }
        public ICollection<Lpj> Lpj { get; set; }
        public ICollection<Pegawai> Pegawai { get; set; }
        public ICollection<Pgrmunit> Pgrmunit { get; set; }
        public ICollection<Ppk> Ppk { get; set; }
        public ICollection<Profilunit> Profilunit { get; set; }
        public ICollection<Prognosisb> Prognosisb { get; set; }
        public ICollection<Prognosisd> Prognosisd { get; set; }
        public ICollection<Prognosisr> Prognosisr { get; set; }
        public ICollection<Rkasah> Rkasah { get; set; }
        public ICollection<Saldoawallak> Saldoawallak { get; set; }
        public ICollection<Saldoawallo> Saldoawallo { get; set; }
        public ICollection<Saldoawallra> Saldoawallra { get; set; }
        public ICollection<Saldoawalnrc> Saldoawalnrc { get; set; }
        public ICollection<Skp> Skp { get; set; }
        public ICollection<Sp3b> Sp3b { get; set; }
        public ICollection<Spd> Spd { get; set; }
        public ICollection<Spj> Spj { get; set; }
        public ICollection<Spjapbd> Spjapbd { get; set; }
        public ICollection<Spp> Spp { get; set; }
        public ICollection<Sts> Sts { get; set; }
        public ICollection<Tbp> Tbp { get; set; }
        public ICollection<Tbpl> Tbpl { get; set; }
        public ICollection<Urusanunit> Urusanunit { get; set; }
        public ICollection<Userskpd> Userskpd { get; set; }
        public ICollection<Webuser> Webuser { get; set; }
    }
}
