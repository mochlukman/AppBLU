using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Bend
    {
        public Bend()
        {
            Bendkpa = new HashSet<Bendkpa>();
            Bkbank = new HashSet<Bkbank>();
            Bkpajak = new HashSet<Bkpajak>();
            Bkubank = new HashSet<Bkubank>();
            Bkubpk = new HashSet<Bkubpk>();
            Bkupajak = new HashSet<Bkupajak>();
            Bkupanjar = new HashSet<Bkupanjar>();
            Bkusp2d = new HashSet<Bkusp2d>();
            Bkusts = new HashSet<Bkusts>();
            Bkutbp = new HashSet<Bkutbp>();
            Bpk = new HashSet<Bpk>();
            Bpkpajakstr = new HashSet<Bpkpajakstr>();
            Npd = new HashSet<Npd>();
            Panjar = new HashSet<Panjar>();
            Skp = new HashSet<Skp>();
            Sp2d = new HashSet<Sp2d>();
            Spj = new HashSet<Spj>();
            Spm = new HashSet<Spm>();
            Spp = new HashSet<Spp>();
            Sts = new HashSet<Sts>();
            TbpIdbend1Navigation = new HashSet<Tbp>();
            TbpIdbend2Navigation = new HashSet<Tbp>();
            Tbpdett = new HashSet<Tbpdett>();
            Tbpl = new HashSet<Tbpl>();
        }

        public long Idbend { get; set; }
        public long? Idpemda { get; set; }
        public string Jnsbend { get; set; }
        public long Idpeg { get; set; }
        public long Idbank { get; set; }
        public string Nmcabbank { get; set; }
        public string Rekbend { get; set; }
        public string Npwpbend { get; set; }
        public string Jabbend { get; set; }
        public decimal? Saldobankup { get; set; }
        public decimal? Saldobankpajak { get; set; }
        public decimal? Saldotunaiup { get; set; }
        public decimal? Saldotunaipajak { get; set; }
        public DateTime? Tglstopbend { get; set; }
        public string Warganegara { get; set; }
        public string Stpendududuk { get; set; }
        public int? Staktif { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Daftbank IdbankNavigation { get; set; }
        public Pegawai IdpegNavigation { get; set; }
        public Jbend JnsbendNavigation { get; set; }
        public Nrcbend Nrcbend { get; set; }
        public ICollection<Bendkpa> Bendkpa { get; set; }
        public ICollection<Bkbank> Bkbank { get; set; }
        public ICollection<Bkpajak> Bkpajak { get; set; }
        public ICollection<Bkubank> Bkubank { get; set; }
        public ICollection<Bkubpk> Bkubpk { get; set; }
        public ICollection<Bkupajak> Bkupajak { get; set; }
        public ICollection<Bkupanjar> Bkupanjar { get; set; }
        public ICollection<Bkusp2d> Bkusp2d { get; set; }
        public ICollection<Bkusts> Bkusts { get; set; }
        public ICollection<Bkutbp> Bkutbp { get; set; }
        public ICollection<Bpk> Bpk { get; set; }
        public ICollection<Bpkpajakstr> Bpkpajakstr { get; set; }
        public ICollection<Npd> Npd { get; set; }
        public ICollection<Panjar> Panjar { get; set; }
        public ICollection<Skp> Skp { get; set; }
        public ICollection<Sp2d> Sp2d { get; set; }
        public ICollection<Spj> Spj { get; set; }
        public ICollection<Spm> Spm { get; set; }
        public ICollection<Spp> Spp { get; set; }
        public ICollection<Sts> Sts { get; set; }
        public ICollection<Tbp> TbpIdbend1Navigation { get; set; }
        public ICollection<Tbp> TbpIdbend2Navigation { get; set; }
        public ICollection<Tbpdett> Tbpdett { get; set; }
        public ICollection<Tbpl> Tbpl { get; set; }
    }
}
