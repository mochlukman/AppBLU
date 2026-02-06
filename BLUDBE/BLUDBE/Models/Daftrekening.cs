using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Daftrekening
    {
        public Daftrekening()
        {
            Beritadetr = new HashSet<Beritadetr>();
            Bkbkas = new HashSet<Bkbkas>();
            Bktmemdetb = new HashSet<Bktmemdetb>();
            Bktmemdetd = new HashSet<Bktmemdetd>();
            Bktmemdetn = new HashSet<Bktmemdetn>();
            Bktmemdetr = new HashSet<Bktmemdetr>();
            Bpkdetr = new HashSet<Bpkdetr>();
            Dpab = new HashSet<Dpab>();
            Dpad = new HashSet<Dpad>();
            Dpar = new HashSet<Dpar>();
            Jbend = new HashSet<Jbend>();
            Nrcbend = new HashSet<Nrcbend>();
            Prognosisb = new HashSet<Prognosisb>();
            Prognosisd = new HashSet<Prognosisd>();
            Prognosisr = new HashSet<Prognosisr>();
            Rkab = new HashSet<Rkab>();
            Rkad = new HashSet<Rkad>();
            Rkar = new HashSet<Rkar>();
            Saldoawallo = new HashSet<Saldoawallo>();
            Saldoawallra = new HashSet<Saldoawallra>();
            Saldoawalnrc = new HashSet<Saldoawalnrc>();
            Setblak = new HashSet<Setblak>();
            SetdapbdrbaIdrekapbdNavigation = new HashSet<Setdapbdrba>();
            SetdapbdrbaIdrekrbaNavigation = new HashSet<Setdapbdrba>();
            Setdlak = new HashSet<Setdlak>();
            SetdlraloIdrekloNavigation = new HashSet<Setdlralo>();
            SetdlraloIdreklraNavigation = new HashSet<Setdlralo>();
            SetkdpIdrekbmNavigation = new HashSet<Setkdp>();
            SetkdpIdrekkdpNavigation = new HashSet<Setkdp>();
            SetkorolariIdrekNavigation = new HashSet<Setkorolari>();
            SetkorolariIdreknrcNavigation = new HashSet<Setkorolari>();
            Setmappfk = new HashSet<Setmappfk>();
            SetnrcmapIdrekasetNavigation = new HashSet<Setnrcmap>();
            SetnrcmapIdrekhutangNavigation = new HashSet<Setnrcmap>();
            SetpendbljIdrekdNavigation = new HashSet<Setpendblj>();
            SetpendbljIdrekrNavigation = new HashSet<Setpendblj>();
            SetrapbdrbaIdrekapbdNavigation = new HashSet<Setrapbdrba>();
            SetrapbdrbaIdrekrbaNavigation = new HashSet<Setrapbdrba>();
            Setrlak = new HashSet<Setrlak>();
            SetrlraloIdrekloNavigation = new HashSet<Setrlralo>();
            SetrlraloIdreklraNavigation = new HashSet<Setrlralo>();
            Setum = new HashSet<Setum>();
            SetupdloIdrekloNavigation = new HashSet<Setupdlo>();
            SetupdloIdreknrcNavigation = new HashSet<Setupdlo>();
            SetuprloIdrekloNavigation = new HashSet<Setuprlo>();
            SetuprloIdreknrcNavigation = new HashSet<Setuprlo>();
            Skpdet = new HashSet<Skpdet>();
            Sp2ddetb = new HashSet<Sp2ddetb>();
            Sp2ddetd = new HashSet<Sp2ddetd>();
            Sp2ddetr = new HashSet<Sp2ddetr>();
            Sp3bdet = new HashSet<Sp3bdet>();
            Spddetb = new HashSet<Spddetb>();
            Spddetr = new HashSet<Spddetr>();
            Spjapbddet = new HashSet<Spjapbddet>();
            Spmdetb = new HashSet<Spmdetb>();
            Spmdetd = new HashSet<Spmdetd>();
            Sppdetb = new HashSet<Sppdetb>();
            Sppdetd = new HashSet<Sppdetd>();
            Sppdetr = new HashSet<Sppdetr>();
            Sshrek = new HashSet<Sshrek>();
            Stsdetb = new HashSet<Stsdetb>();
            Stsdetd = new HashSet<Stsdetd>();
            Stsdetr = new HashSet<Stsdetr>();
            Tagihandet = new HashSet<Tagihandet>();
            Tbpdetb = new HashSet<Tbpdetb>();
            Tbpdetd = new HashSet<Tbpdetd>();
            Tbpdetr = new HashSet<Tbpdetr>();
        }

        public long Idrek { get; set; }
        public string Kdper { get; set; }
        public string Nmper { get; set; }
        public int Mtglevel { get; set; }
        public int Kdkhusus { get; set; }
        public int Jnsrek { get; set; }
        public long? Idjnsakun { get; set; }
        public string Type { get; set; }
        public int? Staktif { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Jnsakun IdjnsakunNavigation { get; set; }
        public Jrek JnsrekNavigation { get; set; }
        public Khususrek KdkhususNavigation { get; set; }
        public ICollection<Beritadetr> Beritadetr { get; set; }
        public ICollection<Bkbkas> Bkbkas { get; set; }
        public ICollection<Bktmemdetb> Bktmemdetb { get; set; }
        public ICollection<Bktmemdetd> Bktmemdetd { get; set; }
        public ICollection<Bktmemdetn> Bktmemdetn { get; set; }
        public ICollection<Bktmemdetr> Bktmemdetr { get; set; }
        public ICollection<Bpkdetr> Bpkdetr { get; set; }
        public ICollection<Dpab> Dpab { get; set; }
        public ICollection<Dpad> Dpad { get; set; }
        public ICollection<Dpar> Dpar { get; set; }
        public ICollection<Jbend> Jbend { get; set; }
        public ICollection<Nrcbend> Nrcbend { get; set; }
        public ICollection<Prognosisb> Prognosisb { get; set; }
        public ICollection<Prognosisd> Prognosisd { get; set; }
        public ICollection<Prognosisr> Prognosisr { get; set; }
        public ICollection<Rkab> Rkab { get; set; }
        public ICollection<Rkad> Rkad { get; set; }
        public ICollection<Rkar> Rkar { get; set; }
        public ICollection<Saldoawallo> Saldoawallo { get; set; }
        public ICollection<Saldoawallra> Saldoawallra { get; set; }
        public ICollection<Saldoawalnrc> Saldoawalnrc { get; set; }
        public ICollection<Setblak> Setblak { get; set; }
        public ICollection<Setdapbdrba> SetdapbdrbaIdrekapbdNavigation { get; set; }
        public ICollection<Setdapbdrba> SetdapbdrbaIdrekrbaNavigation { get; set; }
        public ICollection<Setdlak> Setdlak { get; set; }
        public ICollection<Setdlralo> SetdlraloIdrekloNavigation { get; set; }
        public ICollection<Setdlralo> SetdlraloIdreklraNavigation { get; set; }
        public ICollection<Setkdp> SetkdpIdrekbmNavigation { get; set; }
        public ICollection<Setkdp> SetkdpIdrekkdpNavigation { get; set; }
        public ICollection<Setkorolari> SetkorolariIdrekNavigation { get; set; }
        public ICollection<Setkorolari> SetkorolariIdreknrcNavigation { get; set; }
        public ICollection<Setmappfk> Setmappfk { get; set; }
        public ICollection<Setnrcmap> SetnrcmapIdrekasetNavigation { get; set; }
        public ICollection<Setnrcmap> SetnrcmapIdrekhutangNavigation { get; set; }
        public ICollection<Setpendblj> SetpendbljIdrekdNavigation { get; set; }
        public ICollection<Setpendblj> SetpendbljIdrekrNavigation { get; set; }
        public ICollection<Setrapbdrba> SetrapbdrbaIdrekapbdNavigation { get; set; }
        public ICollection<Setrapbdrba> SetrapbdrbaIdrekrbaNavigation { get; set; }
        public ICollection<Setrlak> Setrlak { get; set; }
        public ICollection<Setrlralo> SetrlraloIdrekloNavigation { get; set; }
        public ICollection<Setrlralo> SetrlraloIdreklraNavigation { get; set; }
        public ICollection<Setum> Setum { get; set; }
        public ICollection<Setupdlo> SetupdloIdrekloNavigation { get; set; }
        public ICollection<Setupdlo> SetupdloIdreknrcNavigation { get; set; }
        public ICollection<Setuprlo> SetuprloIdrekloNavigation { get; set; }
        public ICollection<Setuprlo> SetuprloIdreknrcNavigation { get; set; }
        public ICollection<Skpdet> Skpdet { get; set; }
        public ICollection<Sp2ddetb> Sp2ddetb { get; set; }
        public ICollection<Sp2ddetd> Sp2ddetd { get; set; }
        public ICollection<Sp2ddetr> Sp2ddetr { get; set; }
        public ICollection<Sp3bdet> Sp3bdet { get; set; }
        public ICollection<Spddetb> Spddetb { get; set; }
        public ICollection<Spddetr> Spddetr { get; set; }
        public ICollection<Spjapbddet> Spjapbddet { get; set; }
        public ICollection<Spmdetb> Spmdetb { get; set; }
        public ICollection<Spmdetd> Spmdetd { get; set; }
        public ICollection<Sppdetb> Sppdetb { get; set; }
        public ICollection<Sppdetd> Sppdetd { get; set; }
        public ICollection<Sppdetr> Sppdetr { get; set; }
        public ICollection<Sshrek> Sshrek { get; set; }
        public ICollection<Stsdetb> Stsdetb { get; set; }
        public ICollection<Stsdetd> Stsdetd { get; set; }
        public ICollection<Stsdetr> Stsdetr { get; set; }
        public ICollection<Tagihandet> Tagihandet { get; set; }
        public ICollection<Tbpdetb> Tbpdetb { get; set; }
        public ICollection<Tbpdetd> Tbpdetd { get; set; }
        public ICollection<Tbpdetr> Tbpdetr { get; set; }
    }
}
