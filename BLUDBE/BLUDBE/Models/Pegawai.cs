using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Pegawai
    {
        public Pegawai()
        {
            Atasbend = new HashSet<Atasbend>();
            Bend = new HashSet<Bend>();
            Dpakegiatan = new HashSet<Dpakegiatan>();
            Jabttd = new HashSet<Jabttd>();
            Kegunit = new HashSet<Kegunit>();
            Ppk = new HashSet<Ppk>();
            Rkasah = new HashSet<Rkasah>();
            Rkatapdb = new HashSet<Rkatapdb>();
            Rkatapdd = new HashSet<Rkatapdd>();
            Rkatapddetb = new HashSet<Rkatapddetb>();
            Rkatapddetd = new HashSet<Rkatapddetd>();
            Rkatapddetr = new HashSet<Rkatapddetr>();
            Rkatapdr = new HashSet<Rkatapdr>();
            Webuser = new HashSet<Webuser>();
        }

        public long Idpeg { get; set; }
        public string Nip { get; set; }
        public long Idunit { get; set; }
        public string Kdgol { get; set; }
        public string Nama { get; set; }
        public string Alamat { get; set; }
        public string Jabatan { get; set; }
        public string Pddk { get; set; }
        public string Npwp { get; set; }
        public bool? Staktif { get; set; }
        public bool? Stvalid { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Daftunit IdunitNavigation { get; set; }
        public Golongan KdgolNavigation { get; set; }
        public Kpa Kpa { get; set; }
        public ICollection<Atasbend> Atasbend { get; set; }
        public ICollection<Bend> Bend { get; set; }
        public ICollection<Dpakegiatan> Dpakegiatan { get; set; }
        public ICollection<Jabttd> Jabttd { get; set; }
        public ICollection<Kegunit> Kegunit { get; set; }
        public ICollection<Ppk> Ppk { get; set; }
        public ICollection<Rkasah> Rkasah { get; set; }
        public ICollection<Rkatapdb> Rkatapdb { get; set; }
        public ICollection<Rkatapdd> Rkatapdd { get; set; }
        public ICollection<Rkatapddetb> Rkatapddetb { get; set; }
        public ICollection<Rkatapddetd> Rkatapddetd { get; set; }
        public ICollection<Rkatapddetr> Rkatapddetr { get; set; }
        public ICollection<Rkatapdr> Rkatapdr { get; set; }
        public ICollection<Webuser> Webuser { get; set; }
    }
}
