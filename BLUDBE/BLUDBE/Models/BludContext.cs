using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BLUDBE.Models
{
    public partial class BludContext : DbContext
    {
        public BludContext()
        {
        }

        public BludContext(DbContextOptions<BludContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Adendum> Adendum { get; set; }
        public virtual DbSet<Atasbend> Atasbend { get; set; }
        public virtual DbSet<Bend> Bend { get; set; }
        public virtual DbSet<Bendkpa> Bendkpa { get; set; }
        public virtual DbSet<Berita> Berita { get; set; }
        public virtual DbSet<Beritadetr> Beritadetr { get; set; }
        public virtual DbSet<Beritapot> Beritapot { get; set; }
        public virtual DbSet<Bkbank> Bkbank { get; set; }
        public virtual DbSet<Bkbankdet> Bkbankdet { get; set; }
        public virtual DbSet<Bkbkas> Bkbkas { get; set; }
        public virtual DbSet<Bkpajak> Bkpajak { get; set; }
        public virtual DbSet<Bkpajakdetstr> Bkpajakdetstr { get; set; }
        public virtual DbSet<Bktmem> Bktmem { get; set; }
        public virtual DbSet<Bktmemdetb> Bktmemdetb { get; set; }
        public virtual DbSet<Bktmemdetd> Bktmemdetd { get; set; }
        public virtual DbSet<Bktmemdetn> Bktmemdetn { get; set; }
        public virtual DbSet<Bktmemdetr> Bktmemdetr { get; set; }
        public virtual DbSet<Bkubank> Bkubank { get; set; }
        public virtual DbSet<Bkubpk> Bkubpk { get; set; }
        public virtual DbSet<Bkud> Bkud { get; set; }
        public virtual DbSet<Bkuk> Bkuk { get; set; }
        public virtual DbSet<Bkupajak> Bkupajak { get; set; }
        public virtual DbSet<Bkupanjar> Bkupanjar { get; set; }
        public virtual DbSet<Bkusp2d> Bkusp2d { get; set; }
        public virtual DbSet<Bkusts> Bkusts { get; set; }
        public virtual DbSet<Bkustsspjtr> Bkustsspjtr { get; set; }
        public virtual DbSet<Bkutbp> Bkutbp { get; set; }
        public virtual DbSet<Bkutbpspjtr> Bkutbpspjtr { get; set; }
        public virtual DbSet<Bpk> Bpk { get; set; }
        public virtual DbSet<Bpkdetr> Bpkdetr { get; set; }
        public virtual DbSet<Bpkdetrdana> Bpkdetrdana { get; set; }
        public virtual DbSet<Bpkpajak> Bpkpajak { get; set; }
        public virtual DbSet<Bpkpajakdet> Bpkpajakdet { get; set; }
        public virtual DbSet<Bpkpajakstr> Bpkpajakstr { get; set; }
        public virtual DbSet<Bpkpajakstrdet> Bpkpajakstrdet { get; set; }
        public virtual DbSet<Bpkspj> Bpkspj { get; set; }
        public virtual DbSet<Bulan> Bulan { get; set; }
        public virtual DbSet<Checkdok> Checkdok { get; set; }
        public virtual DbSet<Daftbank> Daftbank { get; set; }
        public virtual DbSet<Daftbarang> Daftbarang { get; set; }
        public virtual DbSet<Daftdok> Daftdok { get; set; }
        public virtual DbSet<Daftphk3> Daftphk3 { get; set; }
        public virtual DbSet<Daftrekapbd> Daftrekapbd { get; set; }
        public virtual DbSet<Daftrekening> Daftrekening { get; set; }
        public virtual DbSet<Daftreklak> Daftreklak { get; set; }
        public virtual DbSet<Daftreklra> Daftreklra { get; set; }
        public virtual DbSet<Daftunit> Daftunit { get; set; }
        public virtual DbSet<Daftunitphk3> Daftunitphk3 { get; set; }
        public virtual DbSet<Dafturus> Dafturus { get; set; }
        public virtual DbSet<Diskusipaket> Diskusipaket { get; set; }
        public virtual DbSet<Doksah> Doksah { get; set; }
        public virtual DbSet<Dp> Dp { get; set; }
        public virtual DbSet<Dpa> Dpa { get; set; }
        public virtual DbSet<Dpab> Dpab { get; set; }
        public virtual DbSet<Dpablnb> Dpablnb { get; set; }
        public virtual DbSet<Dpablnd> Dpablnd { get; set; }
        public virtual DbSet<Dpablnr> Dpablnr { get; set; }
        public virtual DbSet<Dpad> Dpad { get; set; }
        public virtual DbSet<Dpadanab> Dpadanab { get; set; }
        public virtual DbSet<Dpadanad> Dpadanad { get; set; }
        public virtual DbSet<Dpadanar> Dpadanar { get; set; }
        public virtual DbSet<Dpadetb> Dpadetb { get; set; }
        public virtual DbSet<Dpadetd> Dpadetd { get; set; }
        public virtual DbSet<Dpadetr> Dpadetr { get; set; }
        public virtual DbSet<Dpakegiatan> Dpakegiatan { get; set; }
        public virtual DbSet<Dpaprogram> Dpaprogram { get; set; }
        public virtual DbSet<Dpar> Dpar { get; set; }
        public virtual DbSet<Dpdet> Dpdet { get; set; }
        public virtual DbSet<Fungsi> Fungsi { get; set; }
        public virtual DbSet<Fungsinit> Fungsinit { get; set; }
        public virtual DbSet<Golongan> Golongan { get; set; }
        public virtual DbSet<Jabttd> Jabttd { get; set; }
        public virtual DbSet<Jakas> Jakas { get; set; }
        public virtual DbSet<Jbabapbd> Jbabapbd { get; set; }
        public virtual DbSet<Jbank> Jbank { get; set; }
        public virtual DbSet<Jbayar> Jbayar { get; set; }
        public virtual DbSet<Jbend> Jbend { get; set; }
        public virtual DbSet<Jbkas> Jbkas { get; set; }
        public virtual DbSet<Jbku> Jbku { get; set; }
        public virtual DbSet<Jbm> Jbm { get; set; }
        public virtual DbSet<Jcair> Jcair { get; set; }
        public virtual DbSet<Jdana> Jdana { get; set; }
        public virtual DbSet<Jdsrsko> Jdsrsko { get; set; }
        public virtual DbSet<Jkeg> Jkeg { get; set; }
        public virtual DbSet<Jkelola> Jkelola { get; set; }
        public virtual DbSet<Jkinkeg> Jkinkeg { get; set; }
        public virtual DbSet<Jkirim> Jkirim { get; set; }
        public virtual DbSet<Jnsakun> Jnsakun { get; set; }
        public virtual DbSet<Jnslak> Jnslak { get; set; }
        public virtual DbSet<Jnspajak> Jnspajak { get; set; }
        public virtual DbSet<Jpekerjaan> Jpekerjaan { get; set; }
        public virtual DbSet<Jperspektif> Jperspektif { get; set; }
        public virtual DbSet<Jrek> Jrek { get; set; }
        public virtual DbSet<Jsatuan> Jsatuan { get; set; }
        public virtual DbSet<Jstandar> Jstandar { get; set; }
        public virtual DbSet<Jtahun> Jtahun { get; set; }
        public virtual DbSet<Jtermorlun> Jtermorlun { get; set; }
        public virtual DbSet<Jtrans> Jtrans { get; set; }
        public virtual DbSet<Jtransfer> Jtransfer { get; set; }
        public virtual DbSet<Jtrnlkas> Jtrnlkas { get; set; }
        public virtual DbSet<Jurnal> Jurnal { get; set; }
        public virtual DbSet<Jurnaldet> Jurnaldet { get; set; }
        public virtual DbSet<Jurnalhed> Jurnalhed { get; set; }
        public virtual DbSet<Jusaha> Jusaha { get; set; }
        public virtual DbSet<Kabkota> Kabkota { get; set; }
        public virtual DbSet<Kecamatan> Kecamatan { get; set; }
        public virtual DbSet<Keginduk> Keginduk { get; set; }
        public virtual DbSet<Kegsbdana> Kegsbdana { get; set; }
        public virtual DbSet<Kegunit> Kegunit { get; set; }
        public virtual DbSet<Kelurahan> Kelurahan { get; set; }
        public virtual DbSet<Khususrek> Khususrek { get; set; }
        public virtual DbSet<Kinkeg> Kinkeg { get; set; }
        public virtual DbSet<Kinnon> Kinnon { get; set; }
        public virtual DbSet<Kontrak> Kontrak { get; set; }
        public virtual DbSet<Kontrakdetr> Kontrakdetr { get; set; }
        public virtual DbSet<Kpa> Kpa { get; set; }
        public virtual DbSet<Lpj> Lpj { get; set; }
        public virtual DbSet<Metodepengadaan> Metodepengadaan { get; set; }
        public virtual DbSet<Mkegiatan> Mkegiatan { get; set; }
        public virtual DbSet<Mpgrm> Mpgrm { get; set; }
        public virtual DbSet<Npd> Npd { get; set; }
        public virtual DbSet<Npdbpk> Npdbpk { get; set; }
        public virtual DbSet<Npdpjk> Npdpjk { get; set; }
        public virtual DbSet<Npdsts> Npdsts { get; set; }
        public virtual DbSet<Npdtbpl> Npdtbpl { get; set; }
        public virtual DbSet<Nrcbend> Nrcbend { get; set; }
        public virtual DbSet<Paguskpd> Paguskpd { get; set; }
        public virtual DbSet<Pajak> Pajak { get; set; }
        public virtual DbSet<Paketrup> Paketrup { get; set; }
        public virtual DbSet<Paketrupdet> Paketrupdet { get; set; }
        public virtual DbSet<Panjar> Panjar { get; set; }
        public virtual DbSet<Panjardet> Panjardet { get; set; }
        public virtual DbSet<Pegawai> Pegawai { get; set; }
        public virtual DbSet<Pemda> Pemda { get; set; }
        public virtual DbSet<Pgrmunit> Pgrmunit { get; set; }
        public virtual DbSet<Potongan> Potongan { get; set; }
        public virtual DbSet<Ppk> Ppk { get; set; }
        public virtual DbSet<Profil> Profil { get; set; }
        public virtual DbSet<Profilunit> Profilunit { get; set; }
        public virtual DbSet<Prognosisb> Prognosisb { get; set; }
        public virtual DbSet<Prognosisd> Prognosisd { get; set; }
        public virtual DbSet<Prognosisr> Prognosisr { get; set; }
        public virtual DbSet<Provinsi> Provinsi { get; set; }
        public virtual DbSet<Rkab> Rkab { get; set; }
        public virtual DbSet<Rkad> Rkad { get; set; }
        public virtual DbSet<Rkadanab> Rkadanab { get; set; }
        public virtual DbSet<Rkadanad> Rkadanad { get; set; }
        public virtual DbSet<Rkadanar> Rkadanar { get; set; }
        public virtual DbSet<Rkadetb> Rkadetb { get; set; }
        public virtual DbSet<Rkadetd> Rkadetd { get; set; }
        public virtual DbSet<Rkadetr> Rkadetr { get; set; }
        public virtual DbSet<Rkar> Rkar { get; set; }
        public virtual DbSet<Rkasah> Rkasah { get; set; }
        public virtual DbSet<Rkatapdb> Rkatapdb { get; set; }
        public virtual DbSet<Rkatapdd> Rkatapdd { get; set; }
        public virtual DbSet<Rkatapddetb> Rkatapddetb { get; set; }
        public virtual DbSet<Rkatapddetd> Rkatapddetd { get; set; }
        public virtual DbSet<Rkatapddetr> Rkatapddetr { get; set; }
        public virtual DbSet<Rkatapdr> Rkatapdr { get; set; }
        public virtual DbSet<Saldoawallak> Saldoawallak { get; set; }
        public virtual DbSet<Saldoawallo> Saldoawallo { get; set; }
        public virtual DbSet<Saldoawallra> Saldoawallra { get; set; }
        public virtual DbSet<Saldoawalnrc> Saldoawalnrc { get; set; }
        public virtual DbSet<Sasaranthn> Sasaranthn { get; set; }
        public virtual DbSet<Setblak> Setblak { get; set; }
        public virtual DbSet<Setdapbdrba> Setdapbdrba { get; set; }
        public virtual DbSet<Setdlak> Setdlak { get; set; }
        public virtual DbSet<Setdlralo> Setdlralo { get; set; }
        public virtual DbSet<Setkdp> Setkdp { get; set; }
        public virtual DbSet<Setkorolari> Setkorolari { get; set; }
        public virtual DbSet<Setmappfk> Setmappfk { get; set; }
        public virtual DbSet<Setnrcmap> Setnrcmap { get; set; }
        public virtual DbSet<Setpendblj> Setpendblj { get; set; }
        public virtual DbSet<Setrapbdrba> Setrapbdrba { get; set; }
        public virtual DbSet<Setrlak> Setrlak { get; set; }
        public virtual DbSet<Setrlralo> Setrlralo { get; set; }
        public virtual DbSet<Setum> Setum { get; set; }
        public virtual DbSet<Setupdlo> Setupdlo { get; set; }
        public virtual DbSet<Setuprlo> Setuprlo { get; set; }
        public virtual DbSet<Sifatkeg> Sifatkeg { get; set; }
        public virtual DbSet<Skp> Skp { get; set; }
        public virtual DbSet<Skpdet> Skpdet { get; set; }
        public virtual DbSet<Skpsts> Skpsts { get; set; }
        public virtual DbSet<Skptbp> Skptbp { get; set; }
        public virtual DbSet<Sp2b> Sp2b { get; set; }
        public virtual DbSet<Sp2bdet> Sp2bdet { get; set; }
        public virtual DbSet<Sp2d> Sp2d { get; set; }
        public virtual DbSet<Sp2dbpk> Sp2dbpk { get; set; }
        public virtual DbSet<Sp2dcheckdok> Sp2dcheckdok { get; set; }
        public virtual DbSet<Sp2ddetb> Sp2ddetb { get; set; }
        public virtual DbSet<Sp2ddetbdana> Sp2ddetbdana { get; set; }
        public virtual DbSet<Sp2ddetd> Sp2ddetd { get; set; }
        public virtual DbSet<Sp2ddetr> Sp2ddetr { get; set; }
        public virtual DbSet<Sp2ddetrdana> Sp2ddetrdana { get; set; }
        public virtual DbSet<Sp2ddetrp> Sp2ddetrp { get; set; }
        public virtual DbSet<Sp2dntpn> Sp2dntpn { get; set; }
        public virtual DbSet<Sp3b> Sp3b { get; set; }
        public virtual DbSet<Sp3bdet> Sp3bdet { get; set; }
        public virtual DbSet<Spd> Spd { get; set; }
        public virtual DbSet<Spddetb> Spddetb { get; set; }
        public virtual DbSet<Spddetr> Spddetr { get; set; }
        public virtual DbSet<Spj> Spj { get; set; }
        public virtual DbSet<Spjapbd> Spjapbd { get; set; }
        public virtual DbSet<Spjapbddet> Spjapbddet { get; set; }
        public virtual DbSet<Spjlpj> Spjlpj { get; set; }
        public virtual DbSet<Spjspp> Spjspp { get; set; }
        public virtual DbSet<Spjtr> Spjtr { get; set; }
        public virtual DbSet<Spm> Spm { get; set; }
        public virtual DbSet<Spmcheckdok> Spmcheckdok { get; set; }
        public virtual DbSet<Spmdetb> Spmdetb { get; set; }
        public virtual DbSet<Spmdetd> Spmdetd { get; set; }
        public virtual DbSet<Spp> Spp { get; set; }
        public virtual DbSet<Sppbpk> Sppbpk { get; set; }
        public virtual DbSet<Sppcheckdok> Sppcheckdok { get; set; }
        public virtual DbSet<Sppdetb> Sppdetb { get; set; }
        public virtual DbSet<Sppdetbdana> Sppdetbdana { get; set; }
        public virtual DbSet<Sppdetd> Sppdetd { get; set; }
        public virtual DbSet<Sppdetr> Sppdetr { get; set; }
        public virtual DbSet<Sppdetrdana> Sppdetrdana { get; set; }
        public virtual DbSet<Sppdetrp> Sppdetrp { get; set; }
        public virtual DbSet<Sppdetrpot> Sppdetrpot { get; set; }
        public virtual DbSet<Spptag> Spptag { get; set; }
        public virtual DbSet<Ssh> Ssh { get; set; }
        public virtual DbSet<Sshrek> Sshrek { get; set; }
        public virtual DbSet<Stattrs> Stattrs { get; set; }
        public virtual DbSet<Stdharga> Stdharga { get; set; }
        public virtual DbSet<Strurek> Strurek { get; set; }
        public virtual DbSet<Struunit> Struunit { get; set; }
        public virtual DbSet<Sts> Sts { get; set; }
        public virtual DbSet<Stsdetb> Stsdetb { get; set; }
        public virtual DbSet<Stsdetd> Stsdetd { get; set; }
        public virtual DbSet<Stsdetr> Stsdetr { get; set; }
        public virtual DbSet<Stsdett> Stsdett { get; set; }
        public virtual DbSet<Tagihan> Tagihan { get; set; }
        public virtual DbSet<Tagihandet> Tagihandet { get; set; }
        public virtual DbSet<Tahap> Tahap { get; set; }
        public virtual DbSet<Tahapsah> Tahapsah { get; set; }
        public virtual DbSet<Tahun> Tahun { get; set; }
        public virtual DbSet<Tbp> Tbp { get; set; }
        public virtual DbSet<Tbpdetb> Tbpdetb { get; set; }
        public virtual DbSet<Tbpdetd> Tbpdetd { get; set; }
        public virtual DbSet<Tbpdetr> Tbpdetr { get; set; }
        public virtual DbSet<Tbpdett> Tbpdett { get; set; }
        public virtual DbSet<Tbpdettkeg> Tbpdettkeg { get; set; }
        public virtual DbSet<Tbpl> Tbpl { get; set; }
        public virtual DbSet<Tbpldet> Tbpldet { get; set; }
        public virtual DbSet<Tbpldetkeg> Tbpldetkeg { get; set; }
        public virtual DbSet<Tbpsts> Tbpsts { get; set; }
        public virtual DbSet<Urusanunit> Urusanunit { get; set; }
        public virtual DbSet<Userkegiatan> Userkegiatan { get; set; }
        public virtual DbSet<Userskpd> Userskpd { get; set; }
        public virtual DbSet<Webapp> Webapp { get; set; }
        public virtual DbSet<Webgroup> Webgroup { get; set; }
        public virtual DbSet<Webotor> Webotor { get; set; }
        public virtual DbSet<Webrole> Webrole { get; set; }
        public virtual DbSet<Webset> Webset { get; set; }
        public virtual DbSet<Webuser> Webuser { get; set; }
        public virtual DbSet<Zkode> Zkode { get; set; }

        // Unable to generate entity type for table 'dbo.rincTBP'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.OTOKOROLARIR'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.MENUBOK'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.MAPMENUBOK'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.SKPPKDSPP'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.SKSTOPBEND'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.spjspptes'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.rkalama'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.RKAJBRlama'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.DAFTREKSAL'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.SALDOAWALSAL'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.SETMAPKEGBOK'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.JWILAYAH'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.BASTRSPCT$'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Adendum>(entity =>
            {
                entity.HasKey(e => e.Idadd);

                entity.ToTable("ADENDUM");

                entity.Property(e => e.Idadd).HasColumnName("IDADD");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idkontrak).HasColumnName("IDKONTRAK");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nilaiadd)
                    .HasColumnName("NILAIADD")
                    .HasColumnType("money");

                entity.Property(e => e.Nilaiawal)
                    .HasColumnName("NILAIAWAL")
                    .HasColumnType("money");

                entity.Property(e => e.Noadd)
                    .HasColumnName("NOADD")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tgladd)
                    .HasColumnName("TGLADD")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdkegNavigation)
                    .WithMany(p => p.Adendum)
                    .HasForeignKey(d => d.Idkeg)
                    .HasConstraintName("FK_ADENDUM_MKEGIATAN");

                entity.HasOne(d => d.IdkontrakNavigation)
                    .WithMany(p => p.Adendum)
                    .HasForeignKey(d => d.Idkontrak)
                    .HasConstraintName("FK_ADENDUM_KONTRAK");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Adendum)
                    .HasForeignKey(d => d.Idunit)
                    .HasConstraintName("FK_ADENDUM_DAFTUNIT");
            });

            modelBuilder.Entity<Atasbend>(entity =>
            {
                entity.HasKey(e => e.Idpa);

                entity.ToTable("ATASBEND");

                entity.Property(e => e.Idpa).HasColumnName("IDPA");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Atasbend)
                    .HasForeignKey(d => d.Idpeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ATASBEND_PEGAWAI");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Atasbend)
                    .HasForeignKey(d => d.Idunit)
                    .HasConstraintName("FK_ATASBEND_DAFTUNIT");
            });

            modelBuilder.Entity<Bend>(entity =>
            {
                entity.HasKey(e => e.Idbend)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("BEND");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbank).HasColumnName("IDBANK");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idpemda).HasColumnName("IDPEMDA");

                entity.Property(e => e.Jabbend)
                    .IsRequired()
                    .HasColumnName("JABBEND")
                    .HasMaxLength(100);

                entity.Property(e => e.Jnsbend)
                    .IsRequired()
                    .HasColumnName("JNSBEND")
                    .HasMaxLength(2);

                entity.Property(e => e.Nmcabbank)
                    .HasColumnName("NMCABBANK")
                    .HasMaxLength(100);

                entity.Property(e => e.Npwpbend)
                    .IsRequired()
                    .HasColumnName("NPWPBEND")
                    .HasMaxLength(50);

                entity.Property(e => e.Rekbend)
                    .IsRequired()
                    .HasColumnName("REKBEND")
                    .HasMaxLength(50);

                entity.Property(e => e.Saldobankpajak)
                    .HasColumnName("SALDOBANKPAJAK")
                    .HasColumnType("money");

                entity.Property(e => e.Saldobankup)
                    .HasColumnName("SALDOBANKUP")
                    .HasColumnType("money");

                entity.Property(e => e.Saldotunaipajak)
                    .HasColumnName("SALDOTUNAIPAJAK")
                    .HasColumnType("money");

                entity.Property(e => e.Saldotunaiup)
                    .HasColumnName("SALDOTUNAIUP")
                    .HasColumnType("money");

                entity.Property(e => e.Staktif)
                    .HasColumnName("STAKTIF")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Stpendududuk)
                    .HasColumnName("STPENDUDUDUK")
                    .HasMaxLength(100);

                entity.Property(e => e.Tglstopbend)
                    .HasColumnName("TGLSTOPBEND")
                    .HasColumnType("datetime");

                entity.Property(e => e.Warganegara)
                    .HasColumnName("WARGANEGARA")
                    .HasMaxLength(100);

                entity.HasOne(d => d.IdbankNavigation)
                    .WithMany(p => p.Bend)
                    .HasForeignKey(d => d.Idbank)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BEND_DAFTBANK");

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Bend)
                    .HasForeignKey(d => d.Idpeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BEND_PEGAWAI");

                entity.HasOne(d => d.JnsbendNavigation)
                    .WithMany(p => p.Bend)
                    .HasForeignKey(d => d.Jnsbend)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BEND_JBEND");
            });

            modelBuilder.Entity<Bendkpa>(entity =>
            {
                entity.HasKey(e => e.Idbendkpa);

                entity.ToTable("BENDKPA");

                entity.HasIndex(e => e.Idbendkpa)
                    .HasName("UCID_BENDKPA")
                    .IsUnique();

                entity.Property(e => e.Idbendkpa).HasColumnName("IDBENDKPA");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Bendkpa)
                    .HasForeignKey(d => d.Idbend)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BENDKPA_BEND");
            });

            modelBuilder.Entity<Berita>(entity =>
            {
                entity.HasKey(e => e.Idberita);

                entity.ToTable("BERITA");

                entity.HasIndex(e => new { e.Idunit, e.Noberita, e.Idkeg })
                    .HasName("UC_BERITA")
                    .IsUnique();

                entity.Property(e => e.Idberita).HasColumnName("IDBERITA");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idkontrak).HasColumnName("IDKONTRAK");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Kdstatus)
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Noberita)
                    .IsRequired()
                    .HasColumnName("NOBERITA")
                    .HasMaxLength(100);

                entity.Property(e => e.Tglba)
                    .HasColumnName("TGLBA")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.UraiBerita)
                    .HasColumnName("URAI_BERITA")
                    .HasMaxLength(512);

                entity.HasOne(d => d.IdkontrakNavigation)
                    .WithMany(p => p.Berita)
                    .HasForeignKey(d => d.Idkontrak)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BERITA_KONTRAK");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Berita)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BERITA_UNIT");
            });

            modelBuilder.Entity<Beritadetr>(entity =>
            {
                entity.HasKey(e => e.Idberitadet);

                entity.ToTable("BERITADETR");

                entity.Property(e => e.Idberitadet).HasColumnName("IDBERITADET");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idberita).HasColumnName("IDBERITA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdberitaNavigation)
                    .WithMany(p => p.Beritadetr)
                    .HasForeignKey(d => d.Idberita)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BERITADETR_BERITA1");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Beritadetr)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BERITADETR_BERITA");
            });

            modelBuilder.Entity<Beritapot>(entity =>
            {
                entity.HasKey(e => e.Idberitapot);

                entity.ToTable("BERITAPOT");

                entity.HasIndex(e => new { e.Idberita, e.Idrek })
                    .HasName("UC_BERITAPOT")
                    .IsUnique();

                entity.Property(e => e.Idberitapot).HasColumnName("IDBERITAPOT");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idberita).HasColumnName("IDBERITA");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idsp2d).HasColumnName("IDSP2D");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");
            });

            modelBuilder.Entity<Bkbank>(entity =>
            {
                entity.HasKey(e => e.Idbkbank);

                entity.ToTable("BKBANK");

                entity.HasIndex(e => new { e.Idunit, e.Nobuku })
                    .HasName("UC_BKBANK")
                    .IsUnique();

                entity.Property(e => e.Idbkbank).HasColumnName("IDBKBANK");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Kdstatus)
                    .IsRequired()
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Nobuku)
                    .IsRequired()
                    .HasColumnName("NOBUKU")
                    .HasMaxLength(100);

                entity.Property(e => e.Tglbuku)
                    .HasColumnName("TGLBUKU")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(254);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Bkbank)
                    .HasForeignKey(d => d.Idbend)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKBANK_BEND");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Bkbank)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKBANK_DAFTUNIT");

                entity.HasOne(d => d.KdstatusNavigation)
                    .WithMany(p => p.Bkbank)
                    .HasForeignKey(d => d.Kdstatus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKBANK_STATTRS");
            });

            modelBuilder.Entity<Bkbankdet>(entity =>
            {
                entity.HasKey(e => e.Idbankdet);

                entity.ToTable("BKBANKDET");

                entity.HasIndex(e => new { e.Idbkbank, e.Idnojetra })
                    .HasName("UC_BKBANKDET")
                    .IsUnique();

                entity.Property(e => e.Idbankdet).HasColumnName("IDBANKDET");

                entity.Property(e => e.Idbkbank).HasColumnName("IDBKBANK");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdbkbankNavigation)
                    .WithMany(p => p.Bkbankdet)
                    .HasForeignKey(d => d.Idbkbank)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKBANKDET_BKBANK");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Bkbankdet)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKBANKDET_JTRNLKAS");
            });

            modelBuilder.Entity<Bkbkas>(entity =>
            {
                entity.HasKey(e => e.Nobbantu);

                entity.ToTable("BKBKAS");

                entity.Property(e => e.Nobbantu)
                    .HasColumnName("NOBBANTU")
                    .HasMaxLength(10)
                    .ValueGeneratedNever();

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbank).HasColumnName("IDBANK");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nmbkas)
                    .HasColumnName("NMBKAS")
                    .HasMaxLength(50);

                entity.Property(e => e.Norek)
                    .HasColumnName("NOREK")
                    .HasMaxLength(30);

                entity.Property(e => e.Saldo)
                    .HasColumnName("SALDO")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Bkbkas)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKBKAS_DAFTREK");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Bkbkas)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKBKAS_DAFTUNIT");
            });

            modelBuilder.Entity<Bkpajak>(entity =>
            {
                entity.HasKey(e => e.Idbkpajak);

                entity.ToTable("BKPAJAK");

                entity.Property(e => e.Idbkpajak).HasColumnName("IDBKPAJAK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idtransfer).HasColumnName("IDTRANSFER");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Kdrilis).HasColumnName("KDRILIS");

                entity.Property(e => e.Kdstatus)
                    .IsRequired()
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Nobkpajak)
                    .IsRequired()
                    .HasColumnName("NOBKPAJAK")
                    .HasMaxLength(100);

                entity.Property(e => e.Stcair).HasColumnName("STCAIR");

                entity.Property(e => e.Stkirim).HasColumnName("STKIRIM");

                entity.Property(e => e.Tglbkpajak)
                    .HasColumnName("TGLBKPAJAK")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(254);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Bkpajak)
                    .HasForeignKey(d => d.Idbend)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKPAJAK_BEND");

                entity.HasOne(d => d.IdttdNavigation)
                    .WithMany(p => p.Bkpajak)
                    .HasForeignKey(d => d.Idttd)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKPAJAK_ZKODE");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Bkpajak)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKPAJAK_UNIT");

                entity.HasOne(d => d.KdstatusNavigation)
                    .WithMany(p => p.Bkpajak)
                    .HasForeignKey(d => d.Kdstatus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKPAJAK_STATTRS");

                entity.HasOne(d => d.StcairNavigation)
                    .WithMany(p => p.Bkpajak)
                    .HasForeignKey(d => d.Stcair)
                    .HasConstraintName("FK_BKPAJAK_JCAIR");

                entity.HasOne(d => d.StkirimNavigation)
                    .WithMany(p => p.Bkpajak)
                    .HasForeignKey(d => d.Stkirim)
                    .HasConstraintName("FK_BKPAJAK_JKIRIM");
            });

            modelBuilder.Entity<Bkpajakdetstr>(entity =>
            {
                entity.HasKey(e => e.Idbkpajakdetstr);

                entity.ToTable("BKPAJAKDETSTR");

                entity.HasIndex(e => new { e.Idbkpajak, e.Idbpkpajakstr, e.Idpajak })
                    .HasName("UC_BKPAJAKDETSTR")
                    .IsUnique();

                entity.Property(e => e.Idbkpajakdetstr).HasColumnName("IDBKPAJAKDETSTR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbilling)
                    .HasColumnName("IDBILLING")
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Idbkpajak).HasColumnName("IDBKPAJAK");

                entity.Property(e => e.Idbpkpajakstr).HasColumnName("IDBPKPAJAKSTR");

                entity.Property(e => e.Idpajak).HasColumnName("IDPAJAK");

                entity.Property(e => e.Ntb)
                    .HasColumnName("NTB")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Ntpn)
                    .HasColumnName("NTPN")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Tglexpire)
                    .HasColumnName("TGLEXPIRE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglidbilling)
                    .HasColumnName("TGLIDBILLING")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdbkpajakNavigation)
                    .WithMany(p => p.Bkpajakdetstr)
                    .HasForeignKey(d => d.Idbkpajak)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKPAJAKDETSTR_BKPAJAK");

                entity.HasOne(d => d.IdpajakNavigation)
                    .WithMany(p => p.Bkpajakdetstr)
                    .HasForeignKey(d => d.Idpajak)
                    .HasConstraintName("FK_BKPAJAKDETSTR_PAJAK");
            });

            modelBuilder.Entity<Bktmem>(entity =>
            {
                entity.HasKey(e => e.Idbm)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("BKTMEM");

                entity.HasIndex(e => new { e.Idunit, e.Nobm })
                    .HasName("UC1_BKTMEM")
                    .IsUnique();

                entity.Property(e => e.Idbm).HasColumnName("IDBM");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjbm).HasColumnName("IDJBM");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nobm)
                    .IsRequired()
                    .HasColumnName("NOBM")
                    .HasMaxLength(50);

                entity.Property(e => e.Referensi)
                    .HasColumnName("REFERENSI")
                    .HasMaxLength(200);

                entity.Property(e => e.Tglbm)
                    .HasColumnName("TGLBM")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdjbmNavigation)
                    .WithMany(p => p.Bktmem)
                    .HasForeignKey(d => d.Idjbm)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKTMEM_JBM");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Bktmem)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKTMEM_DAFTUNIT");
            });

            modelBuilder.Entity<Bktmemdetb>(entity =>
            {
                entity.HasKey(e => e.Idbmdetb);

                entity.ToTable("BKTMEMDETB");

                entity.HasIndex(e => new { e.Idbm, e.Idrek })
                    .HasName("UC1_BKTMEMDETB")
                    .IsUnique();

                entity.Property(e => e.Idbmdetb).HasColumnName("IDBMDETB");

                entity.Property(e => e.Idbm).HasColumnName("IDBM");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Kdpers)
                    .IsRequired()
                    .HasColumnName("KDPERS")
                    .HasMaxLength(3);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdbmNavigation)
                    .WithMany(p => p.Bktmemdetb)
                    .HasForeignKey(d => d.Idbm)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKTMEMDETB_BKTMEM");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Bktmemdetb)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKTMEMDETB_DAFTREKENING");
            });

            modelBuilder.Entity<Bktmemdetd>(entity =>
            {
                entity.HasKey(e => e.Idbmdetd);

                entity.ToTable("BKTMEMDETD");

                entity.HasIndex(e => new { e.Idbm, e.Idrek })
                    .HasName("IX_BKTMEMDETD")
                    .IsUnique();

                entity.Property(e => e.Idbmdetd).HasColumnName("IDBMDETD");

                entity.Property(e => e.Idbm).HasColumnName("IDBM");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Kdpers)
                    .IsRequired()
                    .HasColumnName("KDPERS")
                    .HasMaxLength(3);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdbmNavigation)
                    .WithMany(p => p.Bktmemdetd)
                    .HasForeignKey(d => d.Idbm)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKTMEMDETD_BKTMEM");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Bktmemdetd)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKTMEMDETD_DAFTREKENING");
            });

            modelBuilder.Entity<Bktmemdetn>(entity =>
            {
                entity.HasKey(e => e.Idbmdetn);

                entity.ToTable("BKTMEMDETN");

                entity.HasIndex(e => new { e.Idbm, e.Idrek })
                    .HasName("UC1_BKTMEMDETN")
                    .IsUnique();

                entity.Property(e => e.Idbmdetn).HasColumnName("IDBMDETN");

                entity.Property(e => e.Idbm).HasColumnName("IDBM");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Kdpers)
                    .IsRequired()
                    .HasColumnName("KDPERS")
                    .HasMaxLength(3);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdbmNavigation)
                    .WithMany(p => p.Bktmemdetn)
                    .HasForeignKey(d => d.Idbm)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKTMEMDETN_BKTMEM");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Bktmemdetn)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKTMEMDETN_DAFTREKENING");
            });

            modelBuilder.Entity<Bktmemdetr>(entity =>
            {
                entity.HasKey(e => e.Idbmdetr);

                entity.ToTable("BKTMEMDETR");

                entity.HasIndex(e => new { e.Idbm, e.Idkeg, e.Idrek })
                    .HasName("UC1_BKTMEMDETR")
                    .IsUnique();

                entity.Property(e => e.Idbmdetr).HasColumnName("IDBMDETR");

                entity.Property(e => e.Idbm).HasColumnName("IDBM");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Kdpers)
                    .IsRequired()
                    .HasColumnName("KDPERS")
                    .HasMaxLength(3);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdbmNavigation)
                    .WithMany(p => p.Bktmemdetr)
                    .HasForeignKey(d => d.Idbm)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKTMEMDETR_BKTMEM");

                entity.HasOne(d => d.IdkegNavigation)
                    .WithMany(p => p.Bktmemdetr)
                    .HasForeignKey(d => d.Idkeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKTMEMDETR_MKEGIATAN");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Bktmemdetr)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKTMEMDETR_DAFTREKENING");
            });

            modelBuilder.Entity<Bkubank>(entity =>
            {
                entity.HasKey(e => e.Idbkubank)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("BKUBANK");

                entity.HasIndex(e => new { e.Idunit, e.Nobkuskpd })
                    .HasName("UC1_BKUBANK")
                    .IsUnique();

                entity.Property(e => e.Idbkubank).HasColumnName("IDBKUBANK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idbkbank).HasColumnName("IDBKBANK");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nobkuskpd)
                    .IsRequired()
                    .HasColumnName("NOBKUSKPD")
                    .HasMaxLength(30);

                entity.Property(e => e.Tglbkuskpd)
                    .HasColumnName("TGLBKUSKPD")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Bkubank)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_BKUBANK_BEND");

                entity.HasOne(d => d.IdbkbankNavigation)
                    .WithMany(p => p.Bkubank)
                    .HasForeignKey(d => d.Idbkbank)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKUBANK_BKBANK");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Bkubank)
                    .HasForeignKey(d => d.Idunit)
                    .HasConstraintName("FK_BKUBANK_DAFTUNIT");
            });

            modelBuilder.Entity<Bkubpk>(entity =>
            {
                entity.HasKey(e => e.Idbkubpk)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("BKUBPK");

                entity.HasIndex(e => new { e.Idunit, e.Nobkuskpd })
                    .HasName("UC1_BKUBPK")
                    .IsUnique();

                entity.Property(e => e.Idbkubpk).HasColumnName("IDBKUBPK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idbpk).HasColumnName("IDBPK");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nobkuskpd)
                    .IsRequired()
                    .HasColumnName("NOBKUSKPD")
                    .HasMaxLength(30);

                entity.Property(e => e.Tglbkuskpd)
                    .HasColumnName("TGLBKUSKPD")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Bkubpk)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_BKUBPK_BEND");

                entity.HasOne(d => d.IdbpkNavigation)
                    .WithMany(p => p.Bkubpk)
                    .HasForeignKey(d => d.Idbpk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKUBPK_BPK");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Bkubpk)
                    .HasForeignKey(d => d.Idunit)
                    .HasConstraintName("FK_BKUBPK_DAFTUNIT");
            });

            modelBuilder.Entity<Bkud>(entity =>
            {
                entity.HasKey(e => e.Idbkud);

                entity.ToTable("BKUD");

                entity.Property(e => e.Idbkud).HasColumnName("IDBKUD");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbkas).HasColumnName("IDBKAS");

                entity.Property(e => e.Idkas).HasColumnName("IDKAS");

                entity.Property(e => e.Idsts).HasColumnName("IDSTS");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nobbantu)
                    .HasColumnName("NOBBANTU")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Nobukas)
                    .HasColumnName("NOBUKAS")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Nobukti)
                    .HasColumnName("NOBUKTI")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Tglkas)
                    .HasColumnName("TGLKAS")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(1024);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Bkuk>(entity =>
            {
                entity.HasKey(e => e.Idbkuk);

                entity.ToTable("BKUK");

                entity.Property(e => e.Idbkuk).HasColumnName("IDBKUK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbkas).HasColumnName("IDBKAS");

                entity.Property(e => e.Idkas).HasColumnName("IDKAS");

                entity.Property(e => e.Idsp2d).HasColumnName("IDSP2D");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nobbantu)
                    .HasColumnName("NOBBANTU")
                    .HasMaxLength(10);

                entity.Property(e => e.Nobukas)
                    .HasColumnName("NOBUKAS")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Nobukti)
                    .HasColumnName("NOBUKTI")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tglkas)
                    .HasColumnName("TGLKAS")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(1024);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Idsp2dNavigation)
                    .WithMany(p => p.Bkuk)
                    .HasForeignKey(d => d.Idsp2d)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKUK_SP2D");
            });

            modelBuilder.Entity<Bkupajak>(entity =>
            {
                entity.HasKey(e => e.Idbkupajak)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("BKUPAJAK");

                entity.HasIndex(e => new { e.Idunit, e.Nobkuskpd, e.Idbend })
                    .HasName("UC1_BKUPAJAK")
                    .IsUnique();

                entity.Property(e => e.Idbkupajak).HasColumnName("IDBKUPAJAK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idbpkpajak).HasColumnName("IDBPKPAJAK");

                entity.Property(e => e.Idbpkpajakstr).HasColumnName("IDBPKPAJAKSTR");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nobkuskpd)
                    .IsRequired()
                    .HasColumnName("NOBKUSKPD")
                    .HasMaxLength(30);

                entity.Property(e => e.Tglbkuskpd)
                    .HasColumnName("TGLBKUSKPD")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Bkupajak)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_BKUPAJAK_BEND");

                entity.HasOne(d => d.IdbpkpajakNavigation)
                    .WithMany(p => p.Bkupajak)
                    .HasForeignKey(d => d.Idbpkpajak)
                    .HasConstraintName("FK_BKUPAJAK_BPKPAJAK");

                entity.HasOne(d => d.IdbpkpajakstrNavigation)
                    .WithMany(p => p.Bkupajak)
                    .HasForeignKey(d => d.Idbpkpajakstr)
                    .HasConstraintName("FK_BKUPAJAK_BPKPAJAKSTR");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Bkupajak)
                    .HasForeignKey(d => d.Idunit)
                    .HasConstraintName("FK_BKUPAJAK_DAFTUNIT");
            });

            modelBuilder.Entity<Bkupanjar>(entity =>
            {
                entity.HasKey(e => e.Idbkupanjar)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("BKUPANJAR");

                entity.HasIndex(e => new { e.Idunit, e.Nobkuskpd })
                    .HasName("UC1_BKUPANJAR")
                    .IsUnique();

                entity.Property(e => e.Idbkupanjar).HasColumnName("IDBKUPANJAR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idpanjar).HasColumnName("IDPANJAR");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nobkuskpd)
                    .IsRequired()
                    .HasColumnName("NOBKUSKPD")
                    .HasMaxLength(30);

                entity.Property(e => e.Tglbkuskpd)
                    .HasColumnName("TGLBKUSKPD")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Bkupanjar)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_BKUPANJAR_BEND");

                entity.HasOne(d => d.IdpanjarNavigation)
                    .WithMany(p => p.Bkupanjar)
                    .HasForeignKey(d => d.Idpanjar)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKUPANJAR_PANJAR");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Bkupanjar)
                    .HasForeignKey(d => d.Idunit)
                    .HasConstraintName("FK_BKUPANJAR_DAFTUNIT");
            });

            modelBuilder.Entity<Bkusp2d>(entity =>
            {
                entity.HasKey(e => e.Idbkusp2d)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("BKUSP2D");

                entity.Property(e => e.Idbkusp2d)
                    .HasColumnName("IDBKUSP2D")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idsp2d).HasColumnName("IDSP2D");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nobkuskpd)
                    .IsRequired()
                    .HasColumnName("NOBKUSKPD")
                    .HasMaxLength(30);

                entity.Property(e => e.Tglbkuskpd)
                    .HasColumnName("TGLBKUSKPD")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Bkusp2d)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_BKUSP2D_BEND");

                entity.HasOne(d => d.Idbkusp2dNavigation)
                    .WithOne(p => p.Bkusp2d)
                    .HasForeignKey<Bkusp2d>(d => d.Idbkusp2d)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKUSP2D_SP2D");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Bkusp2d)
                    .HasForeignKey(d => d.Idunit)
                    .HasConstraintName("FK_BKUSP2D_DAFTUNIT");
            });

            modelBuilder.Entity<Bkusts>(entity =>
            {
                entity.HasKey(e => e.Idbkusts)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("BKUSTS");

                entity.HasIndex(e => new { e.Idunit, e.Nobkuskpd })
                    .HasName("UC1_BKUSTS")
                    .IsUnique();

                entity.Property(e => e.Idbkusts).HasColumnName("IDBKUSTS");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idsts).HasColumnName("IDSTS");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nobkuskpd)
                    .IsRequired()
                    .HasColumnName("NOBKUSKPD")
                    .HasMaxLength(30);

                entity.Property(e => e.Tglbkuskpd)
                    .HasColumnName("TGLBKUSKPD")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Bkusts)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_BKUSTS_BEND");

                entity.HasOne(d => d.IdstsNavigation)
                    .WithMany(p => p.Bkusts)
                    .HasForeignKey(d => d.Idsts)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKUSTS_STS");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Bkusts)
                    .HasForeignKey(d => d.Idunit)
                    .HasConstraintName("FK_BKUSTS_DAFTUNIT");
            });

            modelBuilder.Entity<Bkustsspjtr>(entity =>
            {
                entity.HasKey(e => e.Idbkustsspjtr);

                entity.ToTable("BKUSTSSPJTR");

                entity.Property(e => e.Idbkustsspjtr).HasColumnName("IDBKUSTSSPJTR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbkusts).HasColumnName("IDBKUSTS");

                entity.Property(e => e.Idspjtr).HasColumnName("IDSPJTR");

                entity.HasOne(d => d.IdbkustsNavigation)
                    .WithMany(p => p.Bkustsspjtr)
                    .HasForeignKey(d => d.Idbkusts)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKUSTSSPJTR_BKUSTS");

                entity.HasOne(d => d.IdspjtrNavigation)
                    .WithMany(p => p.Bkustsspjtr)
                    .HasForeignKey(d => d.Idspjtr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKUSTSSPJTR_SPJTR");
            });

            modelBuilder.Entity<Bkutbp>(entity =>
            {
                entity.HasKey(e => e.Idbkutbp)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("BKUTBP");

                entity.HasIndex(e => new { e.Idunit, e.Nobkuskpd })
                    .HasName("UC1_BKUTBP")
                    .IsUnique();

                entity.Property(e => e.Idbkutbp).HasColumnName("IDBKUTBP");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idtbp).HasColumnName("IDTBP");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nobkuskpd)
                    .IsRequired()
                    .HasColumnName("NOBKUSKPD")
                    .HasMaxLength(30);

                entity.Property(e => e.Tglbkuskpd)
                    .HasColumnName("TGLBKUSKPD")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Bkutbp)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_BKUTBP_BEND");

                entity.HasOne(d => d.IdtbpNavigation)
                    .WithMany(p => p.Bkutbp)
                    .HasForeignKey(d => d.Idtbp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKUTBP_TBP");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Bkutbp)
                    .HasForeignKey(d => d.Idunit)
                    .HasConstraintName("FK_BKUTBP_DAFTUNIT");
            });

            modelBuilder.Entity<Bkutbpspjtr>(entity =>
            {
                entity.HasKey(e => e.Idbkutbpspjtr);

                entity.ToTable("BKUTBPSPJTR");

                entity.Property(e => e.Idbkutbpspjtr).HasColumnName("IDBKUTBPSPJTR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbkutbp).HasColumnName("IDBKUTBP");

                entity.Property(e => e.Idspjtr).HasColumnName("IDSPJTR");

                entity.HasOne(d => d.IdbkutbpNavigation)
                    .WithMany(p => p.Bkutbpspjtr)
                    .HasForeignKey(d => d.Idbkutbp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKUTBPSPJTR_BKUTBP");

                entity.HasOne(d => d.IdspjtrNavigation)
                    .WithMany(p => p.Bkutbpspjtr)
                    .HasForeignKey(d => d.Idspjtr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BKUTBPSPJTR_SPJTR");
            });

            modelBuilder.Entity<Bpk>(entity =>
            {
                entity.HasKey(e => e.Idbpk)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("BPK");

                entity.HasIndex(e => new { e.Idunit, e.Nobpk })
                    .HasName("UC_BPK")
                    .IsUnique();

                entity.Property(e => e.Idbpk).HasColumnName("IDBPK");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idjbayar)
                    .HasColumnName("IDJBAYAR")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Idjtransfer).HasColumnName("IDJTRANSFER");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idphk3).HasColumnName("IDPHK3");

                entity.Property(e => e.Idtagihan).HasColumnName("IDTAGIHAN");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdrilis).HasColumnName("KDRILIS");

                entity.Property(e => e.Kdstatus)
                    .IsRequired()
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Nobpk)
                    .IsRequired()
                    .HasColumnName("NOBPK")
                    .HasMaxLength(100);

                entity.Property(e => e.Noref)
                    .HasColumnName("NOREF")
                    .HasMaxLength(36);

                entity.Property(e => e.Penerima)
                    .HasColumnName("PENERIMA")
                    .HasMaxLength(254);

                entity.Property(e => e.Stcair)
                    .HasColumnName("STCAIR")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Stkirim)
                    .HasColumnName("STKIRIM")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Tglbpk)
                    .HasColumnName("TGLBPK")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraibpk)
                    .HasColumnName("URAIBPK")
                    .HasMaxLength(254);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Verifikasi)
                    .HasColumnName("VERIFIKASI")
                    .HasMaxLength(1024);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Bpk)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_BPK_BEND");

                entity.HasOne(d => d.IdjbayarNavigation)
                    .WithMany(p => p.Bpk)
                    .HasForeignKey(d => d.Idjbayar)
                    .HasConstraintName("FK_BPK_JBAYAR");

                entity.HasOne(d => d.IdjtransferNavigation)
                    .WithMany(p => p.Bpk)
                    .HasForeignKey(d => d.Idjtransfer)
                    .HasConstraintName("FK_BPK_JTRANSFER");

                entity.HasOne(d => d.Idphk3Navigation)
                    .WithMany(p => p.Bpk)
                    .HasForeignKey(d => d.Idphk3)
                    .HasConstraintName("FK_BPK_DAFTPHK3");

                entity.HasOne(d => d.IdtagihanNavigation)
                    .WithMany(p => p.Bpk)
                    .HasForeignKey(d => d.Idtagihan)
                    .HasConstraintName("FK_BPK_TAGIHAN");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Bpk)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPK_UNIT");

                entity.HasOne(d => d.IdxkodeNavigation)
                    .WithMany(p => p.Bpk)
                    .HasForeignKey(d => d.Idxkode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPK_ZKODE");

                entity.HasOne(d => d.KdstatusNavigation)
                    .WithMany(p => p.Bpk)
                    .HasForeignKey(d => d.Kdstatus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPK_STATTRS");

                entity.HasOne(d => d.StcairNavigation)
                    .WithMany(p => p.Bpk)
                    .HasForeignKey(d => d.Stcair)
                    .HasConstraintName("FK_BPK_CAIR");

                entity.HasOne(d => d.StkirimNavigation)
                    .WithMany(p => p.Bpk)
                    .HasForeignKey(d => d.Stkirim)
                    .HasConstraintName("FK_BPK_KIRIM");
            });

            modelBuilder.Entity<Bpkdetr>(entity =>
            {
                entity.HasKey(e => e.Idbpkdetr);

                entity.ToTable("BPKDETR");

                entity.HasIndex(e => new { e.Idbpk, e.Idkeg, e.Idrek })
                    .HasName("UC_BPKDETR")
                    .IsUnique();

                entity.Property(e => e.Idbpkdetr).HasColumnName("IDBPKDETR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbpk).HasColumnName("IDBPK");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdbpkNavigation)
                    .WithMany(p => p.Bpkdetr)
                    .HasForeignKey(d => d.Idbpk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPKDETR_BPK");

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Bpkdetr)
                    .HasForeignKey(d => d.Idjdana)
                    .HasConstraintName("FK_BPKDETR_JDANA");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Bpkdetr)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPKDETR_JTRLNKAS");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Bpkdetr)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPKDETR_DAFTREKENING");
            });

            modelBuilder.Entity<Bpkdetrdana>(entity =>
            {
                entity.HasKey(e => e.Idbpkdetrdana);

                entity.ToTable("BPKDETRDANA");

                entity.HasIndex(e => new { e.Idbpkdetr, e.Idjdana })
                    .HasName("UC_BPKDETRDANA")
                    .IsUnique();

                entity.Property(e => e.Idbpkdetrdana).HasColumnName("IDBPKDETRDANA");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbpkdetr).HasColumnName("IDBPKDETR");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdbpkdetrNavigation)
                    .WithMany(p => p.Bpkdetrdana)
                    .HasForeignKey(d => d.Idbpkdetr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPKDETRDANA_BPKDETR");

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Bpkdetrdana)
                    .HasForeignKey(d => d.Idjdana)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPKDETRDANA_JDANA");
            });

            modelBuilder.Entity<Bpkpajak>(entity =>
            {
                entity.HasKey(e => e.Idbpkpajak)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("BPKPAJAK");

                entity.Property(e => e.Idbpkpajak).HasColumnName("IDBPKPAJAK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbpk).HasColumnName("IDBPK");

                entity.Property(e => e.Kdstatus)
                    .IsRequired()
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Nomor)
                    .HasColumnName("NOMOR")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Tanggal)
                    .HasColumnName("TANGGAL")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdbpkNavigation)
                    .WithMany(p => p.Bpkpajak)
                    .HasForeignKey(d => d.Idbpk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPKPAJAK_BPK");

                entity.HasOne(d => d.KdstatusNavigation)
                    .WithMany(p => p.Bpkpajak)
                    .HasForeignKey(d => d.Kdstatus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPKPAJAK_STATTRS");
            });

            modelBuilder.Entity<Bpkpajakdet>(entity =>
            {
                entity.HasKey(e => e.Idbpkpajakdet);

                entity.ToTable("BPKPAJAKDET");

                entity.Property(e => e.Idbpkpajakdet).HasColumnName("IDBPKPAJAKDET");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbilling)
                    .HasColumnName("IDBILLING")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Idbpkpajak).HasColumnName("IDBPKPAJAK");

                entity.Property(e => e.Idpajak).HasColumnName("IDPAJAK");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Ntb)
                    .HasColumnName("NTB")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Ntpn)
                    .HasColumnName("NTPN")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Tglbilling)
                    .HasColumnName("TGLBILLING")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdbpkpajakNavigation)
                    .WithMany(p => p.Bpkpajakdet)
                    .HasForeignKey(d => d.Idbpkpajak)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPKPAJAKDET_BPKPAJAK");

                entity.HasOne(d => d.IdpajakNavigation)
                    .WithMany(p => p.Bpkpajakdet)
                    .HasForeignKey(d => d.Idpajak)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPKPAJAKDET_PAJAK");
            });

            modelBuilder.Entity<Bpkpajakstr>(entity =>
            {
                entity.HasKey(e => e.Idbpkpajakstr);

                entity.ToTable("BPKPAJAKSTR");

                entity.Property(e => e.Idbpkpajakstr).HasColumnName("IDBPKPAJAKSTR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Kdstatus)
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Nomor)
                    .HasColumnName("NOMOR")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tanggal)
                    .HasColumnName("TANGGAL")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Bpkpajakstr)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_BPKPAJAKSTR_BEND");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Bpkpajakstr)
                    .HasForeignKey(d => d.Idunit)
                    .HasConstraintName("FK_BPKPAJAKSTR_DAFTUNIT");

                entity.HasOne(d => d.KdstatusNavigation)
                    .WithMany(p => p.Bpkpajakstr)
                    .HasForeignKey(d => d.Kdstatus)
                    .HasConstraintName("FK_BPKPAJAKSTR_STATTRS");
            });

            modelBuilder.Entity<Bpkpajakstrdet>(entity =>
            {
                entity.HasKey(e => e.Idbpkpajakstrdet);

                entity.ToTable("BPKPAJAKSTRDET");

                entity.Property(e => e.Idbpkpajakstrdet).HasColumnName("IDBPKPAJAKSTRDET");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbpkpajak).HasColumnName("IDBPKPAJAK");

                entity.Property(e => e.Idbpkpajakstr).HasColumnName("IDBPKPAJAKSTR");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdbpkpajakNavigation)
                    .WithMany(p => p.Bpkpajakstrdet)
                    .HasForeignKey(d => d.Idbpkpajak)
                    .HasConstraintName("FK_BPKPAJAKSTRDET_BPKPAJAK");

                entity.HasOne(d => d.IdbpkpajakstrNavigation)
                    .WithMany(p => p.Bpkpajakstrdet)
                    .HasForeignKey(d => d.Idbpkpajakstr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPKPAJAKSTRDET_BPKPAJAKSTR");
            });

            modelBuilder.Entity<Bpkspj>(entity =>
            {
                entity.HasKey(e => e.Idbpkspj);

                entity.ToTable("BPKSPJ");

                entity.Property(e => e.Idbpkspj).HasColumnName("IDBPKSPJ");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbpk).HasColumnName("IDBPK");

                entity.Property(e => e.Idspj).HasColumnName("IDSPJ");

                entity.HasOne(d => d.IdbpkNavigation)
                    .WithMany(p => p.Bpkspj)
                    .HasForeignKey(d => d.Idbpk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPKSPJ_BPK");

                entity.HasOne(d => d.IdspjNavigation)
                    .WithMany(p => p.Bpkspj)
                    .HasForeignKey(d => d.Idspj)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BPKSPJ_SPJ");
            });

            modelBuilder.Entity<Bulan>(entity =>
            {
                entity.HasKey(e => e.Idbulan);

                entity.ToTable("BULAN");

                entity.Property(e => e.Idbulan)
                    .HasColumnName("IDBULAN")
                    .ValueGeneratedNever();

                entity.Property(e => e.Alokas)
                    .HasColumnName("ALOKAS")
                    .HasMaxLength(10);

                entity.Property(e => e.Kdperiode).HasColumnName("KDPERIODE");

                entity.Property(e => e.KetBulan)
                    .HasColumnName("KET_BULAN")
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<Checkdok>(entity =>
            {
                entity.HasKey(e => e.Idcheck);

                entity.ToTable("CHECKDOK");

                entity.Property(e => e.Idcheck).HasColumnName("IDCHECK");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdxkodeNavigation)
                    .WithMany(p => p.Checkdok)
                    .HasForeignKey(d => d.Idxkode)
                    .HasConstraintName("FK_CHECKDOK_ZKODE");
            });

            modelBuilder.Entity<Daftbank>(entity =>
            {
                entity.HasKey(e => e.Idbank);

                entity.ToTable("DAFTBANK");

                entity.Property(e => e.Idbank).HasColumnName("IDBANK");

                entity.Property(e => e.Akbank)
                    .HasColumnName("AKBANK")
                    .HasMaxLength(100);

                entity.Property(e => e.Alamat)
                    .HasColumnName("ALAMAT")
                    .HasMaxLength(512);

                entity.Property(e => e.Cabang)
                    .HasColumnName("CABANG")
                    .HasMaxLength(512);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Kdbank)
                    .IsRequired()
                    .HasColumnName("KDBANK")
                    .HasMaxLength(10);

                entity.Property(e => e.Telepon)
                    .HasColumnName("TELEPON")
                    .HasMaxLength(512);
            });

            modelBuilder.Entity<Daftbarang>(entity =>
            {
                entity.HasKey(e => e.Idbrg);

                entity.ToTable("DAFTBARANG");

                entity.Property(e => e.Idbrg)
                    .HasColumnName("IDBRG")
                    .ValueGeneratedNever();

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idparent).HasColumnName("IDPARENT");

                entity.Property(e => e.Kdbrg)
                    .IsRequired()
                    .HasColumnName("KDBRG")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Ket)
                    .HasColumnName("KET")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.Mtglevel).HasColumnName("MTGLEVEL");

                entity.Property(e => e.Nmbrg)
                    .HasColumnName("NMBRG")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasColumnName("TYPE")
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.MtglevelNavigation)
                    .WithMany(p => p.Daftbarang)
                    .HasPrincipalKey(p => p.Mtglevel)
                    .HasForeignKey(d => d.Mtglevel)
                    .HasConstraintName("FK_DAFTBARANG_STRUREK");
            });

            modelBuilder.Entity<Daftdok>(entity =>
            {
                entity.HasKey(e => e.Kddok)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("DAFTDOK");

                entity.HasIndex(e => e.Iddaftdok)
                    .HasName("UC_DAFTDOK")
                    .IsUnique();

                entity.Property(e => e.Kddok)
                    .HasColumnName("KDDOK")
                    .HasMaxLength(10)
                    .ValueGeneratedNever();

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Iddaftdok)
                    .HasColumnName("IDDAFTDOK")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Ket)
                    .HasColumnName("KET")
                    .HasMaxLength(200);

                entity.Property(e => e.Nmdok)
                    .IsRequired()
                    .HasColumnName("NMDOK")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Daftphk3>(entity =>
            {
                entity.HasKey(e => e.Idphk3)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("DAFTPHK3");

                entity.HasIndex(e => e.Idphk3)
                    .HasName("UCID_DAFTPHK3")
                    .IsUnique();

                entity.Property(e => e.Idphk3).HasColumnName("IDPHK3");

                entity.Property(e => e.Alamat)
                    .HasColumnName("ALAMAT")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Alamatbank)
                    .HasColumnName("ALAMATBANK")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Cabangbank)
                    .IsRequired()
                    .HasColumnName("CABANGBANK")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbank).HasColumnName("IDBANK");

                entity.Property(e => e.Idjusaha).HasColumnName("IDJUSAHA");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Namapemilik)
                    .HasColumnName("NAMAPEMILIK")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Nminst)
                    .IsRequired()
                    .HasColumnName("NMINST")
                    .HasMaxLength(200);

                entity.Property(e => e.Nmphk3)
                    .IsRequired()
                    .HasColumnName("NMPHK3")
                    .HasMaxLength(200);

                entity.Property(e => e.Norekbank)
                    .IsRequired()
                    .HasColumnName("NOREKBANK")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Npwp)
                    .IsRequired()
                    .HasColumnName("NPWP")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Stpenduduk)
                    .HasColumnName("STPENDUDUK")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Stvalid)
                    .HasColumnName("STVALID")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Telepon)
                    .HasColumnName("TELEPON")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Warganegara)
                    .HasColumnName("WARGANEGARA")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdbankNavigation)
                    .WithMany(p => p.Daftphk3)
                    .HasForeignKey(d => d.Idbank)
                    .HasConstraintName("FK_DAFTPHK3_DAFTBANK");

                entity.HasOne(d => d.IdjusahaNavigation)
                    .WithMany(p => p.Daftphk3)
                    .HasForeignKey(d => d.Idjusaha)
                    .HasConstraintName("FK_DAFTPHK3_JUSAHA");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Daftphk3)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_DAFTPHK3_DAFTUNIT");
            });

            modelBuilder.Entity<Daftrekapbd>(entity =>
            {
                entity.HasKey(e => e.Idrek);

                entity.ToTable("DAFTREKAPBD");

                entity.HasIndex(e => e.Kdper)
                    .HasName("UC_DAFTREKAPBD")
                    .IsUnique();

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Kdkhusus).HasColumnName("KDKHUSUS");

                entity.Property(e => e.Kdper)
                    .IsRequired()
                    .HasColumnName("KDPER")
                    .HasMaxLength(50);

                entity.Property(e => e.Mtglevel).HasColumnName("MTGLEVEL");

                entity.Property(e => e.Nlraawal)
                    .HasColumnName("NLRAAWAL")
                    .HasColumnType("money");

                entity.Property(e => e.Nmper)
                    .IsRequired()
                    .HasColumnName("NMPER")
                    .HasMaxLength(512);

                entity.Property(e => e.Nprognosis)
                    .HasColumnName("NPROGNOSIS")
                    .HasColumnType("money");

                entity.Property(e => e.Staktif).HasColumnName("STAKTIF");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("TYPE")
                    .HasMaxLength(2);
            });

            modelBuilder.Entity<Daftrekening>(entity =>
            {
                entity.HasKey(e => e.Idrek);

                entity.ToTable("DAFTREKENING");

                entity.HasIndex(e => e.Idrek)
                    .HasName("UCID_DAFTREKENING")
                    .IsUnique();

                entity.HasIndex(e => new { e.Kdper, e.Idjnsakun })
                    .HasName("UC1_DAFTREKENING")
                    .IsUnique();

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjnsakun).HasColumnName("IDJNSAKUN");

                entity.Property(e => e.Jnsrek).HasColumnName("JNSREK");

                entity.Property(e => e.Kdkhusus)
                    .HasColumnName("KDKHUSUS")
                    .HasDefaultValueSql("('1')");

                entity.Property(e => e.Kdper)
                    .IsRequired()
                    .HasColumnName("KDPER")
                    .HasMaxLength(50);

                entity.Property(e => e.Mtglevel).HasColumnName("MTGLEVEL");

                entity.Property(e => e.Nmper)
                    .IsRequired()
                    .HasColumnName("NMPER")
                    .HasMaxLength(512);

                entity.Property(e => e.Staktif)
                    .HasColumnName("STAKTIF")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("TYPE")
                    .HasMaxLength(2);

                entity.HasOne(d => d.IdjnsakunNavigation)
                    .WithMany(p => p.Daftrekening)
                    .HasForeignKey(d => d.Idjnsakun)
                    .HasConstraintName("FK_DAFTREKENING_JNSAKUN");

                entity.HasOne(d => d.JnsrekNavigation)
                    .WithMany(p => p.Daftrekening)
                    .HasForeignKey(d => d.Jnsrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DAFTREKENING_JREK");

                entity.HasOne(d => d.KdkhususNavigation)
                    .WithMany(p => p.Daftrekening)
                    .HasForeignKey(d => d.Kdkhusus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DAFTREKENING_KHUSUSREK");
            });

            modelBuilder.Entity<Daftreklak>(entity =>
            {
                entity.HasKey(e => e.Idrek);

                entity.ToTable("DAFTREKLAK");

                entity.HasIndex(e => e.Idrek)
                    .HasName("UCID_DAFTREKLAK")
                    .IsUnique();

                entity.HasIndex(e => e.Kdper)
                    .HasName("UC1_DAFTREKLAK")
                    .IsUnique();

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjnslak).HasColumnName("IDJNSLAK");

                entity.Property(e => e.Kdkhusus).HasColumnName("KDKHUSUS");

                entity.Property(e => e.Kdper)
                    .IsRequired()
                    .HasColumnName("KDPER")
                    .HasMaxLength(50);

                entity.Property(e => e.Mtglevel).HasColumnName("MTGLEVEL");

                entity.Property(e => e.Nlakawal)
                    .HasColumnName("NLAKAWAL")
                    .HasColumnType("money");

                entity.Property(e => e.Nmper)
                    .IsRequired()
                    .HasColumnName("NMPER")
                    .HasMaxLength(512);

                entity.Property(e => e.Staktif).HasColumnName("STAKTIF");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("TYPE")
                    .HasMaxLength(2);

                entity.HasOne(d => d.IdjnslakNavigation)
                    .WithMany(p => p.Daftreklak)
                    .HasForeignKey(d => d.Idjnslak)
                    .HasConstraintName("FK_DAFTREKLAK_JNSLAK");
            });

            modelBuilder.Entity<Daftreklra>(entity =>
            {
                entity.HasKey(e => e.Idrek);

                entity.ToTable("DAFTREKLRA");

                entity.HasIndex(e => e.Idrek)
                    .HasName("UCID_DAFTREKLRA")
                    .IsUnique();

                entity.HasIndex(e => e.Kdper)
                    .HasName("UC1_DAFTREKLRA")
                    .IsUnique();

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Kdkhusus).HasColumnName("KDKHUSUS");

                entity.Property(e => e.Kdper)
                    .IsRequired()
                    .HasColumnName("KDPER")
                    .HasMaxLength(50);

                entity.Property(e => e.Mtglevel).HasColumnName("MTGLEVEL");

                entity.Property(e => e.Nlraawal)
                    .HasColumnName("NLRAAWAL")
                    .HasColumnType("money");

                entity.Property(e => e.Nmper)
                    .IsRequired()
                    .HasColumnName("NMPER")
                    .HasMaxLength(512);

                entity.Property(e => e.Nprognosis)
                    .HasColumnName("NPROGNOSIS")
                    .HasColumnType("money");

                entity.Property(e => e.Staktif).HasColumnName("STAKTIF");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("TYPE")
                    .HasMaxLength(2);
            });

            modelBuilder.Entity<Daftunit>(entity =>
            {
                entity.HasKey(e => e.Idunit);

                entity.ToTable("DAFTUNIT");

                entity.HasIndex(e => e.Kdunit)
                    .HasName("UC2_DAFTUNIT")
                    .IsUnique();

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Akrounit)
                    .HasColumnName("AKROUNIT")
                    .HasMaxLength(200);

                entity.Property(e => e.Alamat)
                    .HasColumnName("ALAMAT")
                    .HasMaxLength(200);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idpemda).HasColumnName("IDPEMDA");

                entity.Property(e => e.Idurus).HasColumnName("IDURUS");

                entity.Property(e => e.Kdlevel).HasColumnName("KDLEVEL");

                entity.Property(e => e.Kdunit)
                    .IsRequired()
                    .HasColumnName("KDUNIT")
                    .HasMaxLength(50);

                entity.Property(e => e.Nmunit)
                    .IsRequired()
                    .HasColumnName("NMUNIT")
                    .HasMaxLength(500);

                entity.Property(e => e.Staktif)
                    .HasColumnName("STAKTIF")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Telepon)
                    .HasColumnName("TELEPON")
                    .HasMaxLength(200);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("TYPE")
                    .HasMaxLength(5);

                entity.HasOne(d => d.IdurusNavigation)
                    .WithMany(p => p.Daftunit)
                    .HasForeignKey(d => d.Idurus)
                    .HasConstraintName("FK_DAFTUNIT_DAFTURUS");

                entity.HasOne(d => d.KdlevelNavigation)
                    .WithMany(p => p.Daftunit)
                    .HasForeignKey(d => d.Kdlevel)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DAFTUNIT_STRUUNIT");
            });

            modelBuilder.Entity<Daftunitphk3>(entity =>
            {
                entity.HasKey(e => new { e.Unitkey, e.Kdp3 });

                entity.ToTable("DAFTUNITPHK3");

                entity.HasIndex(e => e.Id)
                    .HasName("IX_DAFTUNITPHK3")
                    .IsUnique();

                entity.Property(e => e.Unitkey)
                    .HasColumnName("UNITKEY")
                    .HasMaxLength(36);

                entity.Property(e => e.Kdp3)
                    .HasColumnName("KDP3")
                    .HasMaxLength(36);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Dafturus>(entity =>
            {
                entity.HasKey(e => e.Idurus);

                entity.ToTable("DAFTURUS");

                entity.HasIndex(e => e.Kdurus)
                    .HasName("UC2_DAFTURUS")
                    .IsUnique();

                entity.Property(e => e.Idurus)
                    .HasColumnName("IDURUS")
                    .ValueGeneratedNever();

                entity.Property(e => e.Akrounit)
                    .HasColumnName("AKROUNIT")
                    .HasMaxLength(200);

                entity.Property(e => e.Alamat)
                    .HasColumnName("ALAMAT")
                    .HasMaxLength(200);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Kdlevel).HasColumnName("KDLEVEL");

                entity.Property(e => e.Kdurus)
                    .IsRequired()
                    .HasColumnName("KDURUS")
                    .HasMaxLength(50);

                entity.Property(e => e.Nmurus)
                    .IsRequired()
                    .HasColumnName("NMURUS")
                    .HasMaxLength(500);

                entity.Property(e => e.Staktif).HasColumnName("STAKTIF");

                entity.Property(e => e.Telepon)
                    .HasColumnName("TELEPON")
                    .HasMaxLength(200);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("TYPE")
                    .HasMaxLength(5);

                entity.HasOne(d => d.KdlevelNavigation)
                    .WithMany(p => p.Dafturus)
                    .HasForeignKey(d => d.Kdlevel)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DAFTURUS_STRUUNIT");
            });

            modelBuilder.Entity<Diskusipaket>(entity =>
            {
                entity.HasKey(e => e.Iddiskusipaket);

                entity.ToTable("DISKUSIPAKET");

                entity.Property(e => e.Iddiskusipaket).HasColumnName("IDDISKUSIPAKET");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idrup).HasColumnName("IDRUP");

                entity.Property(e => e.Komentar).HasColumnName("KOMENTAR");

                entity.Property(e => e.Sender)
                    .HasColumnName("SENDER")
                    .HasMaxLength(10);

                entity.HasOne(d => d.IdrupNavigation)
                    .WithMany(p => p.Diskusipaket)
                    .HasForeignKey(d => d.Idrup)
                    .HasConstraintName("FK_DISKUSIPAKET_PAKETRUP");
            });

            modelBuilder.Entity<Doksah>(entity =>
            {
                entity.HasKey(e => e.Kddoksah)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("DOKSAH");

                entity.Property(e => e.Kddoksah)
                    .HasColumnName("KDDOKSAH")
                    .HasMaxLength(3)
                    .ValueGeneratedNever();

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Ket)
                    .IsRequired()
                    .HasColumnName("KET")
                    .HasMaxLength(100);

                entity.Property(e => e.Nmdoksah)
                    .IsRequired()
                    .HasColumnName("NMDOKSAH")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Dp>(entity =>
            {
                entity.HasKey(e => e.Iddp);

                entity.ToTable("DP");

                entity.HasIndex(e => e.Nodp)
                    .HasName("UC_DP")
                    .IsUnique();

                entity.Property(e => e.Iddp).HasColumnName("IDDP");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Nodp)
                    .IsRequired()
                    .HasColumnName("NODP")
                    .HasMaxLength(50);

                entity.Property(e => e.Tgldp)
                    .HasColumnName("TGLDP")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Dpa>(entity =>
            {
                entity.HasKey(e => e.Iddpa);

                entity.ToTable("DPA");

                entity.HasIndex(e => e.Nodpa)
                    .HasName("UC1_DPA")
                    .IsUnique();

                entity.HasIndex(e => new { e.Idunit, e.Kdtahap })
                    .HasName("UC2_DPA")
                    .IsUnique();

                entity.Property(e => e.Iddpa).HasColumnName("IDDPA");

                entity.Property(e => e.Belanja)
                    .HasColumnName("BELANJA")
                    .HasColumnType("money");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Jdpa).HasColumnName("JDPA");

                entity.Property(e => e.Kdtahap)
                    .IsRequired()
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(5);

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(254);

                entity.Property(e => e.Nodpa)
                    .HasColumnName("NODPA")
                    .HasMaxLength(50);

                entity.Property(e => e.Nosah)
                    .HasColumnName("NOSAH")
                    .HasMaxLength(50);

                entity.Property(e => e.Pembiayaankr)
                    .HasColumnName("PEMBIAYAANKR")
                    .HasColumnType("money");

                entity.Property(e => e.Pembiayaantr)
                    .HasColumnName("PEMBIAYAANTR")
                    .HasColumnType("money");

                entity.Property(e => e.Pendapatan)
                    .HasColumnName("PENDAPATAN")
                    .HasColumnType("money");

                entity.Property(e => e.Sah).HasColumnName("SAH");

                entity.Property(e => e.Sahby)
                    .HasColumnName("SAHBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tgldpa)
                    .HasColumnName("TGLDPA")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglsah)
                    .HasColumnName("TGLSAH")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Dpa)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPA_DAFTUNIT");

                entity.HasOne(d => d.KdtahapNavigation)
                    .WithMany(p => p.Dpa)
                    .HasForeignKey(d => d.Kdtahap)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPA_TAHAP");
            });

            modelBuilder.Entity<Dpab>(entity =>
            {
                entity.HasKey(e => e.Iddpab);

                entity.ToTable("DPAB");

                entity.HasIndex(e => new { e.Iddpa, e.Idrek })
                    .HasName("UC_DPAB")
                    .IsUnique();

                entity.Property(e => e.Iddpab).HasColumnName("IDDPAB");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Iddpa).HasColumnName("IDDPA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Kdtahap)
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(5);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IddpaNavigation)
                    .WithMany(p => p.Dpab)
                    .HasForeignKey(d => d.Iddpa)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPAB_DPA");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Dpab)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPAB_DAFTREK");

                entity.HasOne(d => d.KdtahapNavigation)
                    .WithMany(p => p.Dpab)
                    .HasForeignKey(d => d.Kdtahap)
                    .HasConstraintName("FK_DPAB_TAHAP");
            });

            modelBuilder.Entity<Dpablnb>(entity =>
            {
                entity.HasKey(e => e.Iddpablnb);

                entity.ToTable("DPABLNB");

                entity.HasIndex(e => new { e.Iddpab, e.Idbulan })
                    .HasName("UC_DPABLNB")
                    .IsUnique();

                entity.Property(e => e.Iddpablnb).HasColumnName("IDDPABLNB");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbulan).HasColumnName("IDBULAN");

                entity.Property(e => e.Iddpab).HasColumnName("IDDPAB");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IddpabNavigation)
                    .WithMany(p => p.Dpablnb)
                    .HasForeignKey(d => d.Iddpab)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPABLNB_DPAB");
            });

            modelBuilder.Entity<Dpablnd>(entity =>
            {
                entity.HasKey(e => e.Iddpablnd);

                entity.ToTable("DPABLND");

                entity.HasIndex(e => new { e.Iddpad, e.Idbulan })
                    .HasName("UC_DPABLND")
                    .IsUnique();

                entity.Property(e => e.Iddpablnd).HasColumnName("IDDPABLND");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbulan).HasColumnName("IDBULAN");

                entity.Property(e => e.Iddpad).HasColumnName("IDDPAD");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IddpadNavigation)
                    .WithMany(p => p.Dpablnd)
                    .HasForeignKey(d => d.Iddpad)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPABLND_DPAD");
            });

            modelBuilder.Entity<Dpablnr>(entity =>
            {
                entity.HasKey(e => e.Iddpablnr);

                entity.ToTable("DPABLNR");

                entity.HasIndex(e => new { e.Iddpar, e.Idbulan })
                    .HasName("UC_DPABLNR")
                    .IsUnique();

                entity.Property(e => e.Iddpablnr).HasColumnName("IDDPABLNR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbulan).HasColumnName("IDBULAN");

                entity.Property(e => e.Iddpar).HasColumnName("IDDPAR");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IddparNavigation)
                    .WithMany(p => p.Dpablnr)
                    .HasForeignKey(d => d.Iddpar)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPABLNR_DPAR");
            });

            modelBuilder.Entity<Dpad>(entity =>
            {
                entity.HasKey(e => e.Iddpad);

                entity.ToTable("DPAD");

                entity.HasIndex(e => new { e.Iddpa, e.Idrek })
                    .HasName("UC_DPAD")
                    .IsUnique();

                entity.Property(e => e.Iddpad).HasColumnName("IDDPAD");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Iddpa).HasColumnName("IDDPA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Kdtahap)
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(5);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money")
                    .HasDefaultValueSql("((0))");

                entity.HasOne(d => d.IddpaNavigation)
                    .WithMany(p => p.Dpad)
                    .HasForeignKey(d => d.Iddpa)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPAD_DPA");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Dpad)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPAD_DAFTREK");

                entity.HasOne(d => d.KdtahapNavigation)
                    .WithMany(p => p.Dpad)
                    .HasForeignKey(d => d.Kdtahap)
                    .HasConstraintName("FK_DPAD_TAHAP");
            });

            modelBuilder.Entity<Dpadanab>(entity =>
            {
                entity.HasKey(e => e.Iddpadanab);

                entity.ToTable("DPADANAB");

                entity.HasIndex(e => new { e.Iddpab, e.Idjdana })
                    .HasName("UC_DPADANAB")
                    .IsUnique();

                entity.Property(e => e.Iddpadanab).HasColumnName("IDDPADANAB");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Iddpab).HasColumnName("IDDPAB");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IddpabNavigation)
                    .WithMany(p => p.Dpadanab)
                    .HasForeignKey(d => d.Iddpab)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPADANAB_DPAB");

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Dpadanab)
                    .HasForeignKey(d => d.Idjdana)
                    .HasConstraintName("FK_DPADANAB_JDANA");
            });

            modelBuilder.Entity<Dpadanad>(entity =>
            {
                entity.HasKey(e => e.Iddpadanad);

                entity.ToTable("DPADANAD");

                entity.HasIndex(e => new { e.Iddpad, e.Idjdana })
                    .HasName("UC_DPADANAD")
                    .IsUnique();

                entity.Property(e => e.Iddpadanad).HasColumnName("IDDPADANAD");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Iddpad).HasColumnName("IDDPAD");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IddpadNavigation)
                    .WithMany(p => p.Dpadanad)
                    .HasForeignKey(d => d.Iddpad)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPADANAD_DPAD");

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Dpadanad)
                    .HasForeignKey(d => d.Idjdana)
                    .HasConstraintName("FK_DPADANAD_JDANA");
            });

            modelBuilder.Entity<Dpadanar>(entity =>
            {
                entity.HasKey(e => e.Iddpadanar);

                entity.ToTable("DPADANAR");

                entity.HasIndex(e => new { e.Iddpar, e.Idjdana })
                    .HasName("UC_DPADANAR")
                    .IsUnique();

                entity.Property(e => e.Iddpadanar).HasColumnName("IDDPADANAR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Iddpar).HasColumnName("IDDPAR");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IddparNavigation)
                    .WithMany(p => p.Dpadanar)
                    .HasForeignKey(d => d.Iddpar)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPADANAR_DPAR");

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Dpadanar)
                    .HasForeignKey(d => d.Idjdana)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPADANAR_JDANA");
            });

            modelBuilder.Entity<Dpadetb>(entity =>
            {
                entity.HasKey(e => e.Iddpadetb);

                entity.ToTable("DPADETB");

                entity.Property(e => e.Iddpadetb).HasColumnName("IDDPADETB");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Ekspresi)
                    .HasColumnName("EKSPRESI")
                    .HasMaxLength(254);

                entity.Property(e => e.Iddpab).HasColumnName("IDDPAB");

                entity.Property(e => e.Iddpadetbduk).HasColumnName("IDDPADETBDUK");

                entity.Property(e => e.Idsatuan).HasColumnName("IDSATUAN");

                entity.Property(e => e.Idstdharga).HasColumnName("IDSTDHARGA");

                entity.Property(e => e.Inclsubtotal).HasColumnName("INCLSUBTOTAL");

                entity.Property(e => e.Jumbyek)
                    .HasColumnName("JUMBYEK")
                    .HasColumnType("money");

                entity.Property(e => e.Kdjabar)
                    .HasColumnName("KDJABAR")
                    .HasMaxLength(30);

                entity.Property(e => e.Satuan)
                    .HasColumnName("SATUAN")
                    .HasMaxLength(30);

                entity.Property(e => e.Subtotal)
                    .HasColumnName("SUBTOTAL")
                    .HasColumnType("money");

                entity.Property(e => e.Tarif)
                    .HasColumnName("TARIF")
                    .HasColumnType("money");

                entity.Property(e => e.Type)
                    .HasColumnName("TYPE")
                    .HasMaxLength(2);

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(1024);

                entity.HasOne(d => d.IddpabNavigation)
                    .WithMany(p => p.Dpadetb)
                    .HasForeignKey(d => d.Iddpab)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPADETB_DPAB");
            });

            modelBuilder.Entity<Dpadetd>(entity =>
            {
                entity.HasKey(e => e.Iddpadetd);

                entity.ToTable("DPADETD");

                entity.Property(e => e.Iddpadetd).HasColumnName("IDDPADETD");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Ekspresi)
                    .HasColumnName("EKSPRESI")
                    .HasMaxLength(254);

                entity.Property(e => e.Iddpad).HasColumnName("IDDPAD");

                entity.Property(e => e.Iddpadetdduk).HasColumnName("IDDPADETDDUK");

                entity.Property(e => e.Idsatuan).HasColumnName("IDSATUAN");

                entity.Property(e => e.Idstdharga).HasColumnName("IDSTDHARGA");

                entity.Property(e => e.Inclsubtotal).HasColumnName("INCLSUBTOTAL");

                entity.Property(e => e.Jumbyek)
                    .HasColumnName("JUMBYEK")
                    .HasColumnType("money");

                entity.Property(e => e.Kdjabar)
                    .HasColumnName("KDJABAR")
                    .HasMaxLength(30);

                entity.Property(e => e.Satuan)
                    .HasColumnName("SATUAN")
                    .HasMaxLength(30);

                entity.Property(e => e.Subtotal)
                    .HasColumnName("SUBTOTAL")
                    .HasColumnType("money");

                entity.Property(e => e.Tarif)
                    .HasColumnName("TARIF")
                    .HasColumnType("money");

                entity.Property(e => e.Type)
                    .HasColumnName("TYPE")
                    .HasMaxLength(2);

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(1024);

                entity.HasOne(d => d.IddpadNavigation)
                    .WithMany(p => p.Dpadetd)
                    .HasForeignKey(d => d.Iddpad)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPADETD_DPAD");
            });

            modelBuilder.Entity<Dpadetr>(entity =>
            {
                entity.HasKey(e => e.Iddpadetr);

                entity.ToTable("DPADETR");

                entity.Property(e => e.Iddpadetr).HasColumnName("IDDPADETR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Ekspresi)
                    .HasColumnName("EKSPRESI")
                    .HasMaxLength(254);

                entity.Property(e => e.Iddpadetrduk).HasColumnName("IDDPADETRDUK");

                entity.Property(e => e.Iddpar).HasColumnName("IDDPAR");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idsatuan).HasColumnName("IDSATUAN");

                entity.Property(e => e.Idssh).HasColumnName("IDSSH");

                entity.Property(e => e.Idstdharga).HasColumnName("IDSTDHARGA");

                entity.Property(e => e.Inclsubtotal).HasColumnName("INCLSUBTOTAL");

                entity.Property(e => e.Jumbyek)
                    .HasColumnName("JUMBYEK")
                    .HasColumnType("money");

                entity.Property(e => e.Kdjabar)
                    .HasColumnName("KDJABAR")
                    .HasMaxLength(30);

                entity.Property(e => e.Satuan)
                    .HasColumnName("SATUAN")
                    .HasMaxLength(30);

                entity.Property(e => e.Subtotal)
                    .HasColumnName("SUBTOTAL")
                    .HasColumnType("money");

                entity.Property(e => e.Tarif)
                    .HasColumnName("TARIF")
                    .HasColumnType("money");

                entity.Property(e => e.Type)
                    .HasColumnName("TYPE")
                    .HasMaxLength(2);

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(1024);

                entity.HasOne(d => d.IddparNavigation)
                    .WithMany(p => p.Dpadetr)
                    .HasForeignKey(d => d.Iddpar)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPADETR_DPAR");

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Dpadetr)
                    .HasForeignKey(d => d.Idjdana)
                    .HasConstraintName("FK_DPADETR_JDANA");

                entity.HasOne(d => d.IdsshNavigation)
                    .WithMany(p => p.Dpadetr)
                    .HasForeignKey(d => d.Idssh)
                    .HasConstraintName("FK_DPADETR_SSH");
            });

            modelBuilder.Entity<Dpakegiatan>(entity =>
            {
                entity.HasKey(e => e.Iddpakeg);

                entity.ToTable("DPAKEGIATAN");

                entity.Property(e => e.Iddpakeg).HasColumnName("IDDPAKEG");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Iddpapgrm).HasColumnName("IDDPAPGRM");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idprioda)
                    .HasColumnName("IDPRIODA")
                    .HasMaxLength(36);

                entity.Property(e => e.Idsas)
                    .HasColumnName("IDSAS")
                    .HasMaxLength(36);

                entity.Property(e => e.Idsifatkeg).HasColumnName("IDSIFATKEG");

                entity.Property(e => e.Ketkeg)
                    .HasColumnName("KETKEG")
                    .HasMaxLength(512);

                entity.Property(e => e.Lokasi)
                    .HasColumnName("LOKASI")
                    .HasMaxLength(512);

                entity.Property(e => e.Noprior).HasColumnName("NOPRIOR");

                entity.Property(e => e.Pagu)
                    .HasColumnName("PAGU")
                    .HasColumnType("money");

                entity.Property(e => e.Paguplus)
                    .HasColumnName("PAGUPLUS")
                    .HasColumnType("money");

                entity.Property(e => e.Pagutif)
                    .HasColumnName("PAGUTIF")
                    .HasColumnType("money");

                entity.Property(e => e.Sasaran)
                    .HasColumnName("SASARAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Satuan)
                    .HasColumnName("SATUAN")
                    .HasMaxLength(30);

                entity.Property(e => e.Target)
                    .HasColumnName("TARGET")
                    .HasMaxLength(10);

                entity.Property(e => e.Targetif)
                    .HasColumnName("TARGETIF")
                    .HasMaxLength(10);

                entity.Property(e => e.Targetp)
                    .HasColumnName("TARGETP")
                    .HasColumnType("money");

                entity.Property(e => e.Targetsen)
                    .HasColumnName("TARGETSEN")
                    .HasMaxLength(10);

                entity.Property(e => e.Tglakhir)
                    .HasColumnName("TGLAKHIR")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglawal)
                    .HasColumnName("TGLAWAL")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Volume)
                    .HasColumnName("VOLUME")
                    .HasMaxLength(10);

                entity.Property(e => e.Volume1)
                    .HasColumnName("VOLUME1")
                    .HasMaxLength(10);

                entity.HasOne(d => d.IddpapgrmNavigation)
                    .WithMany(p => p.Dpakegiatan)
                    .HasForeignKey(d => d.Iddpapgrm)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPAKEGIATAN_DPAPROGRAM");

                entity.HasOne(d => d.IdkegNavigation)
                    .WithMany(p => p.Dpakegiatan)
                    .HasForeignKey(d => d.Idkeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPAKEGIATAN_MKEGIATAN");

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Dpakegiatan)
                    .HasForeignKey(d => d.Idpeg)
                    .HasConstraintName("FK_DPAKEGIATAN_PEGAWAI");
            });

            modelBuilder.Entity<Dpaprogram>(entity =>
            {
                entity.HasKey(e => e.Iddpapgrm);

                entity.ToTable("DPAPROGRAM");

                entity.Property(e => e.Iddpapgrm).HasColumnName("IDDPAPGRM");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idprgrm).HasColumnName("IDPRGRM");

                entity.Property(e => e.Idprioda).HasColumnName("IDPRIODA");

                entity.Property(e => e.Idprionas).HasColumnName("IDPRIONAS");

                entity.Property(e => e.Idprioprov).HasColumnName("IDPRIOPROV");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdtahap)
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.Staktif).HasColumnName("STAKTIF");

                entity.Property(e => e.Stvalid).HasColumnName("STVALID");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdprgrmNavigation)
                    .WithMany(p => p.Dpaprogram)
                    .HasForeignKey(d => d.Idprgrm)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPAPROGRAM_MPGRM");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Dpaprogram)
                    .HasForeignKey(d => d.Idunit)
                    .HasConstraintName("FK_DPAPROGRAM_DAFTUNIT");
            });

            modelBuilder.Entity<Dpar>(entity =>
            {
                entity.HasKey(e => e.Iddpar);

                entity.ToTable("DPAR");

                entity.HasIndex(e => new { e.Idkeg, e.Idrek, e.Iddpa })
                    .HasName("UC_DPAR")
                    .IsUnique();

                entity.Property(e => e.Iddpar).HasColumnName("IDDPAR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Iddpa).HasColumnName("IDDPA");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Kdtahap)
                    .IsRequired()
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(5);

                entity.Property(e => e.Ls)
                    .HasColumnName("LS")
                    .HasColumnType("money");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Tu)
                    .HasColumnName("TU")
                    .HasColumnType("money");

                entity.Property(e => e.UpGu)
                    .HasColumnName("UP/GU")
                    .HasColumnType("money");

                entity.HasOne(d => d.IddpaNavigation)
                    .WithMany(p => p.Dpar)
                    .HasForeignKey(d => d.Iddpa)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPAR_DPA");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Dpar)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPAR_DAFTREK");
            });

            modelBuilder.Entity<Dpdet>(entity =>
            {
                entity.HasKey(e => e.Iddpdet);

                entity.ToTable("DPDET");

                entity.HasIndex(e => e.Idsp2d)
                    .HasName("UC_DPDET")
                    .IsUnique();

                entity.Property(e => e.Iddpdet).HasColumnName("IDDPDET");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Iddp).HasColumnName("IDDP");

                entity.Property(e => e.Idsp2d).HasColumnName("IDSP2D");

                entity.HasOne(d => d.IddpNavigation)
                    .WithMany(p => p.Dpdet)
                    .HasForeignKey(d => d.Iddp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPDET_DP");

                entity.HasOne(d => d.Idsp2dNavigation)
                    .WithOne(p => p.Dpdet)
                    .HasForeignKey<Dpdet>(d => d.Idsp2d)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DPDET_SP2D");
            });

            modelBuilder.Entity<Fungsi>(entity =>
            {
                entity.HasKey(e => e.Idfung);

                entity.ToTable("FUNGSI");

                entity.Property(e => e.Idfung).HasColumnName("IDFUNG");

                entity.Property(e => e.Kdfung)
                    .IsRequired()
                    .HasColumnName("KDFUNG")
                    .HasMaxLength(5);

                entity.Property(e => e.Nmfung)
                    .IsRequired()
                    .HasColumnName("NMFUNG")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Fungsinit>(entity =>
            {
                entity.HasKey(e => e.Idurus);

                entity.ToTable("FUNGSINIT");

                entity.Property(e => e.Idurus)
                    .HasColumnName("IDURUS")
                    .ValueGeneratedNever();

                entity.Property(e => e.Idfung).HasColumnName("IDFUNG");

                entity.Property(e => e.Idfungsiinit)
                    .HasColumnName("IDFUNGSIINIT")
                    .ValueGeneratedOnAdd();

                entity.HasOne(d => d.IdfungNavigation)
                    .WithMany(p => p.Fungsinit)
                    .HasForeignKey(d => d.Idfung)
                    .HasConstraintName("FK_FUNGSINIT_FUNGSI");

                entity.HasOne(d => d.IdurusNavigation)
                    .WithOne(p => p.Fungsinit)
                    .HasForeignKey<Fungsinit>(d => d.Idurus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FUNGSINIT_DAFTURUS");
            });

            modelBuilder.Entity<Golongan>(entity =>
            {
                entity.HasKey(e => e.Kdgol)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("GOLONGAN");

                entity.Property(e => e.Kdgol)
                    .HasColumnName("KDGOL")
                    .HasMaxLength(10)
                    .ValueGeneratedNever();

                entity.Property(e => e.Idgol)
                    .HasColumnName("IDGOL")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Nmgol)
                    .HasColumnName("NMGOL")
                    .HasMaxLength(50);

                entity.Property(e => e.Pangkat)
                    .HasColumnName("PANGKAT")
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Jabttd>(entity =>
            {
                entity.HasKey(e => e.Idttd);

                entity.ToTable("JABTTD");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Jabatan)
                    .HasColumnName("JABATAN")
                    .HasMaxLength(300);

                entity.Property(e => e.Kddok)
                    .IsRequired()
                    .HasColumnName("KDDOK")
                    .HasMaxLength(10);

                entity.Property(e => e.Noskpttd)
                    .HasColumnName("NOSKPTTD")
                    .HasMaxLength(30);

                entity.Property(e => e.Noskstopttd)
                    .HasColumnName("NOSKSTOPTTD")
                    .HasMaxLength(30);

                entity.Property(e => e.Tglskpttd)
                    .HasColumnName("TGLSKPTTD")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglskstopttd)
                    .HasColumnName("TGLSKSTOPTTD")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Jabttd)
                    .HasForeignKey(d => d.Idpeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_JABTTD_PEGAWAI");

                entity.HasOne(d => d.KddokNavigation)
                    .WithMany(p => p.Jabttd)
                    .HasForeignKey(d => d.Kddok)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_JABTTD_DAFTDOK");
            });

            modelBuilder.Entity<Jakas>(entity =>
            {
                entity.HasKey(e => e.Idkas)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("JAKAS");

                entity.Property(e => e.Idkas).HasColumnName("IDKAS");

                entity.Property(e => e.Kdakas)
                    .IsRequired()
                    .HasColumnName("KDAKAS")
                    .HasMaxLength(10);

                entity.Property(e => e.Labelkas)
                    .HasColumnName("LABELKAS")
                    .HasMaxLength(200);

                entity.Property(e => e.Nmakas)
                    .IsRequired()
                    .HasColumnName("NMAKAS")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Jbabapbd>(entity =>
            {
                entity.HasKey(e => e.Idbab);

                entity.ToTable("JBABAPBD");

                entity.Property(e => e.Idbab)
                    .HasColumnName("IDBAB")
                    .ValueGeneratedNever();

                entity.Property(e => e.Kdbab)
                    .IsRequired()
                    .HasColumnName("KDBAB")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Kdpers)
                    .HasColumnName("KDPERS")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Nmbab)
                    .HasColumnName("NMBAB")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasColumnName("STATUS")
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Jbank>(entity =>
            {
                entity.HasKey(e => e.Idbank);

                entity.ToTable("JBANK");

                entity.HasIndex(e => e.Kdbank)
                    .HasName("IX_JBANK")
                    .IsUnique();

                entity.Property(e => e.Idbank).HasColumnName("IDBANK");

                entity.Property(e => e.Akronim)
                    .HasColumnName("AKRONIM")
                    .HasMaxLength(200);

                entity.Property(e => e.Alamat)
                    .HasColumnName("ALAMAT")
                    .HasMaxLength(500);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Kdbank)
                    .IsRequired()
                    .HasColumnName("KDBANK")
                    .HasMaxLength(10);

                entity.Property(e => e.Nmbank)
                    .IsRequired()
                    .HasColumnName("NMBANK")
                    .HasMaxLength(500);

                entity.Property(e => e.Uraian)
                    .IsRequired()
                    .HasColumnName("URAIAN")
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<Jbayar>(entity =>
            {
                entity.HasKey(e => e.Idjbayar)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("JBAYAR");

                entity.HasIndex(e => e.Kdbayar)
                    .HasName("IX_JBAYAR")
                    .IsUnique();

                entity.Property(e => e.Idjbayar)
                    .HasColumnName("IDJBAYAR")
                    .ValueGeneratedNever();

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Kdbayar).HasColumnName("KDBAYAR");

                entity.Property(e => e.Uraianbayar)
                    .HasColumnName("URAIANBAYAR")
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Jbend>(entity =>
            {
                entity.HasKey(e => e.Jnsbend)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("JBEND");

                entity.Property(e => e.Jnsbend)
                    .HasColumnName("JNSBEND")
                    .HasMaxLength(2)
                    .ValueGeneratedNever();

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Uraibend)
                    .HasColumnName("URAIBEND")
                    .HasMaxLength(100);

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Jbend)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_JBEND_DAFTREK");
            });

            modelBuilder.Entity<Jbkas>(entity =>
            {
                entity.HasKey(e => e.Idbkas)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("JBKAS");

                entity.Property(e => e.Idbkas)
                    .HasColumnName("IDBKAS")
                    .ValueGeneratedNever();

                entity.Property(e => e.Nmbkas)
                    .HasColumnName("NMBKAS")
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Jbku>(entity =>
            {
                entity.HasKey(e => e.Idjbku)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("JBKU");

                entity.Property(e => e.Idjbku).HasColumnName("IDJBKU");

                entity.Property(e => e.Kdjbku)
                    .IsRequired()
                    .HasColumnName("KDJBKU")
                    .HasMaxLength(3);

                entity.Property(e => e.Lbljbku)
                    .HasColumnName("LBLJBKU")
                    .HasMaxLength(20);

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(254);
            });

            modelBuilder.Entity<Jbm>(entity =>
            {
                entity.HasKey(e => e.Idjbm);

                entity.ToTable("JBM");

                entity.HasIndex(e => e.Kdbm)
                    .HasName("UC1_JBM")
                    .IsUnique();

                entity.Property(e => e.Idjbm).HasColumnName("IDJBM");

                entity.Property(e => e.Kdbm)
                    .IsRequired()
                    .HasColumnName("KDBM")
                    .HasMaxLength(10);

                entity.Property(e => e.Nmbm)
                    .HasColumnName("NMBM")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Jcair>(entity =>
            {
                entity.HasKey(e => e.Stcair);

                entity.ToTable("JCAIR");

                entity.Property(e => e.Stcair)
                    .HasColumnName("STCAIR")
                    .ValueGeneratedNever();

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraicair)
                    .HasColumnName("URAICAIR")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Jdana>(entity =>
            {
                entity.HasKey(e => e.Idjdana)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("JDANA");

                entity.HasIndex(e => e.Idjdana)
                    .HasName("IX_JDANA")
                    .IsUnique();

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Kddana)
                    .IsRequired()
                    .HasColumnName("KDDANA")
                    .HasMaxLength(3);

                entity.Property(e => e.Ket)
                    .IsRequired()
                    .HasColumnName("KET")
                    .HasMaxLength(100);

                entity.Property(e => e.Nmdana)
                    .IsRequired()
                    .HasColumnName("NMDANA")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Jdsrsko>(entity =>
            {
                entity.HasKey(e => e.Kddsr)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("JDSRSKO");

                entity.Property(e => e.Kddsr)
                    .HasColumnName("KDDSR")
                    .HasMaxLength(10)
                    .ValueGeneratedNever();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Nmdsr)
                    .HasColumnName("NMDSR")
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Jkeg>(entity =>
            {
                entity.HasKey(e => e.Jnskeg);

                entity.ToTable("JKEG");

                entity.Property(e => e.Jnskeg)
                    .HasColumnName("JNSKEG")
                    .ValueGeneratedNever();

                entity.Property(e => e.Uraian)
                    .IsRequired()
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);
            });

            modelBuilder.Entity<Jkelola>(entity =>
            {
                entity.HasKey(e => e.Kdkelola);

                entity.ToTable("JKELOLA");

                entity.Property(e => e.Kdkelola)
                    .HasColumnName("KDKELOLA")
                    .HasMaxLength(2)
                    .ValueGeneratedNever();

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idjkelola)
                    .HasColumnName("IDJKELOLA")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Ketkelola)
                    .HasColumnName("KETKELOLA")
                    .HasMaxLength(100);

                entity.Property(e => e.Nmkelola)
                    .IsRequired()
                    .HasColumnName("NMKELOLA")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Jkinkeg>(entity =>
            {
                entity.HasKey(e => e.Kdjkk)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("JKINKEG");

                entity.Property(e => e.Kdjkk)
                    .HasColumnName("KDJKK")
                    .HasMaxLength(2)
                    .ValueGeneratedNever();

                entity.Property(e => e.Urjkk)
                    .IsRequired()
                    .HasColumnName("URJKK")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Jkirim>(entity =>
            {
                entity.HasKey(e => e.Stkirim);

                entity.ToTable("JKIRIM");

                entity.Property(e => e.Stkirim)
                    .HasColumnName("STKIRIM")
                    .ValueGeneratedNever();

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Uraikirim)
                    .HasColumnName("URAIKIRIM")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Jnsakun>(entity =>
            {
                entity.HasKey(e => e.Idjnsakun);

                entity.ToTable("JNSAKUN");

                entity.Property(e => e.Idjnsakun).HasColumnName("IDJNSAKUN");

                entity.Property(e => e.Kdpers)
                    .HasColumnName("KDPERS")
                    .HasMaxLength(1);

                entity.Property(e => e.Uraiakun)
                    .HasColumnName("URAIAKUN")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Jnslak>(entity =>
            {
                entity.HasKey(e => e.Idjnslak);

                entity.ToTable("JNSLAK");

                entity.Property(e => e.Idjnslak)
                    .HasColumnName("IDJNSLAK")
                    .ValueGeneratedNever();

                entity.Property(e => e.Uraijnslak)
                    .HasColumnName("URAIJNSLAK")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Jnspajak>(entity =>
            {
                entity.HasKey(e => e.Idjnspajak);

                entity.ToTable("JNSPAJAK");

                entity.Property(e => e.Idjnspajak).HasColumnName("IDJNSPAJAK");

                entity.Property(e => e.Kdjnspajak)
                    .HasColumnName("KDJNSPAJAK")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Nmjnspajak)
                    .HasColumnName("NMJNSPAJAK")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Jpekerjaan>(entity =>
            {
                entity.HasKey(e => e.Idjnspekerjaan);

                entity.ToTable("JPEKERJAAN");

                entity.Property(e => e.Idjnspekerjaan).HasColumnName("IDJNSPEKERJAAN");

                entity.Property(e => e.Uraian)
                    .IsRequired()
                    .HasColumnName("URAIAN")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Jperspektif>(entity =>
            {
                entity.HasKey(e => e.Idjperspektif)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("JPERSPEKTIF");

                entity.Property(e => e.Idjperspektif).HasColumnName("IDJPERSPEKTIF");

                entity.Property(e => e.Kdperspektif)
                    .IsRequired()
                    .HasColumnName("KDPERSPEKTIF")
                    .HasMaxLength(10);

                entity.Property(e => e.Ket)
                    .IsRequired()
                    .HasColumnName("KET")
                    .HasMaxLength(512);

                entity.Property(e => e.Nmperspektif)
                    .IsRequired()
                    .HasColumnName("NMPERSPEKTIF")
                    .HasMaxLength(512);
            });

            modelBuilder.Entity<Jrek>(entity =>
            {
                entity.HasKey(e => e.Jnsrek);

                entity.ToTable("JREK");

                entity.Property(e => e.Jnsrek)
                    .HasColumnName("JNSREK")
                    .ValueGeneratedNever();

                entity.Property(e => e.Uraian)
                    .IsRequired()
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);
            });

            modelBuilder.Entity<Jsatuan>(entity =>
            {
                entity.HasKey(e => e.Kdsatuan);

                entity.ToTable("JSATUAN");

                entity.Property(e => e.Kdsatuan)
                    .HasColumnName("KDSATUAN")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Idsatuan)
                    .HasColumnName("IDSATUAN")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Ket)
                    .HasColumnName("KET")
                    .HasMaxLength(100);

                entity.Property(e => e.Uraisatuan)
                    .HasColumnName("URAISATUAN")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Jstandar>(entity =>
            {
                entity.HasKey(e => e.Kdjnsstd)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("JSTANDAR");

                entity.Property(e => e.Kdjnsstd)
                    .HasColumnName("KDJNSSTD")
                    .HasMaxLength(10)
                    .ValueGeneratedNever();

                entity.Property(e => e.Idjstandar)
                    .HasColumnName("IDJSTANDAR")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Ket)
                    .HasColumnName("KET")
                    .HasMaxLength(512);

                entity.Property(e => e.Nmjnsstd)
                    .IsRequired()
                    .HasColumnName("NMJNSSTD")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Jtahun>(entity =>
            {
                entity.HasKey(e => e.Tahun)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("JTAHUN");

                entity.Property(e => e.Tahun)
                    .HasColumnName("TAHUN")
                    .ValueGeneratedNever();

                entity.Property(e => e.Idtahun)
                    .HasColumnName("IDTAHUN")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Nmtahun).HasColumnName("NMTAHUN");
            });

            modelBuilder.Entity<Jtermorlun>(entity =>
            {
                entity.HasKey(e => e.Idjtermorlun);

                entity.ToTable("JTERMORLUN");

                entity.Property(e => e.Idjtermorlun).HasColumnName("IDJTERMORLUN");

                entity.Property(e => e.Nmjtermorlun)
                    .IsRequired()
                    .HasColumnName("NMJTERMORLUN")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Jtrans>(entity =>
            {
                entity.HasKey(e => e.Idtrans);

                entity.ToTable("JTRANS");

                entity.Property(e => e.Idtrans)
                    .HasColumnName("IDTRANS")
                    .HasMaxLength(1)
                    .ValueGeneratedNever();

                entity.Property(e => e.Nmtrans)
                    .HasColumnName("NMTRANS")
                    .HasMaxLength(36);
            });

            modelBuilder.Entity<Jtransfer>(entity =>
            {
                entity.HasKey(e => e.Idjtransfer);

                entity.ToTable("JTRANSFER");

                entity.Property(e => e.Idjtransfer).HasColumnName("IDJTRANSFER");

                entity.Property(e => e.Flagsnom)
                    .HasColumnName("FLAGSNOM")
                    .HasMaxLength(20);

                entity.Property(e => e.Kdtransfer).HasColumnName("KDTRANSFER");

                entity.Property(e => e.Minnominal)
                    .HasColumnName("MINNOMINAL")
                    .HasColumnType("money");

                entity.Property(e => e.Nmtransfer)
                    .HasColumnName("NMTRANSFER")
                    .HasMaxLength(100);

                entity.Property(e => e.Uraiantrans)
                    .HasColumnName("URAIANTRANS")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Jtrnlkas>(entity =>
            {
                entity.HasKey(e => e.Idnojetra)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("JTRNLKAS");

                entity.Property(e => e.Idnojetra)
                    .HasColumnName("IDNOJETRA")
                    .ValueGeneratedNever();

                entity.Property(e => e.Kdpers)
                    .IsRequired()
                    .HasColumnName("KDPERS")
                    .HasMaxLength(1);

                entity.Property(e => e.Nmjetra)
                    .IsRequired()
                    .HasColumnName("NMJETRA")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Jurnal>(entity =>
            {
                entity.ToTable("JURNAL");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idprgrm).HasColumnName("IDPRGRM");

                entity.Property(e => e.Idrekd).HasColumnName("IDREKD");

                entity.Property(e => e.Idrekk).HasColumnName("IDREKK");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Jbku)
                    .HasColumnName("JBKU")
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.JnsJurnal)
                    .HasColumnName("JNS_JURNAL")
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.Jnsakund).HasColumnName("JNSAKUND");

                entity.Property(e => e.Jnsakunk).HasColumnName("JNSAKUNK");

                entity.Property(e => e.Jurnal1)
                    .HasColumnName("JURNAL")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Kdperd)
                    .HasColumnName("KDPERD")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Kdperk)
                    .HasColumnName("KDPERK")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Kdstatus)
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.Nilaid)
                    .HasColumnName("NILAID")
                    .HasColumnType("money");

                entity.Property(e => e.Nilaik)
                    .HasColumnName("NILAIK")
                    .HasColumnType("money")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Nmperd)
                    .HasColumnName("NMPERD")
                    .HasMaxLength(1024)
                    .IsUnicode(false);

                entity.Property(e => e.Nmperk)
                    .HasColumnName("NMPERK")
                    .HasMaxLength(1024)
                    .IsUnicode(false);

                entity.Property(e => e.Nobkuskpd)
                    .HasColumnName("NOBKUSKPD")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nobukti)
                    .HasColumnName("NOBUKTI")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Tglbukti)
                    .HasColumnName("TGLBUKTI")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(4096)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Jurnaldet>(entity =>
            {
                entity.HasKey(e => e.Idjurnaldet);

                entity.ToTable("JURNALDET");

                entity.Property(e => e.Idjurnaldet).HasColumnName("IDJURNALDET");

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjnsakun).HasColumnName("IDJNSAKUN");

                entity.Property(e => e.Idjurnalhed).HasColumnName("IDJURNALHED");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.JnsJurnal)
                    .HasColumnName("JNS_JURNAL")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Kdpers)
                    .HasColumnName("KDPERS")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");
            });

            modelBuilder.Entity<Jurnalhed>(entity =>
            {
                entity.HasKey(e => e.Idjurnalhed);

                entity.ToTable("JURNALHED");

                entity.Property(e => e.Idjurnalhed).HasColumnName("IDJURNALHED");

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Jbku)
                    .HasColumnName("JBKU")
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.JnsJurnal)
                    .HasColumnName("JNS_JURNAL")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Kdstatus)
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.Nobkuskpd)
                    .HasColumnName("NOBKUSKPD")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nobukti)
                    .HasColumnName("NOBUKTI")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Stpost).HasColumnName("STPOST");

                entity.Property(e => e.Tglbukti)
                    .HasColumnName("TGLBUKTI")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(4096)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Jusaha>(entity =>
            {
                entity.HasKey(e => e.Idjusaha);

                entity.ToTable("JUSAHA");

                entity.Property(e => e.Idjusaha).HasColumnName("IDJUSAHA");

                entity.Property(e => e.Akronim)
                    .HasColumnName("AKRONIM")
                    .HasMaxLength(10);

                entity.Property(e => e.Badanusaha)
                    .HasColumnName("BADANUSAHA")
                    .HasMaxLength(50);

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Kabkota>(entity =>
            {
                entity.HasKey(e => e.Idkabkota);

                entity.ToTable("KABKOTA");

                entity.Property(e => e.Idkabkota)
                    .HasColumnName("IDKABKOTA")
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Idjenis).HasColumnName("IDJENIS");

                entity.Property(e => e.Idprov)
                    .IsRequired()
                    .HasColumnName("IDPROV")
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.Nama)
                    .IsRequired()
                    .HasColumnName("NAMA")
                    .HasColumnType("text");
            });

            modelBuilder.Entity<Kecamatan>(entity =>
            {
                entity.HasKey(e => e.Idkec);

                entity.ToTable("KECAMATAN");

                entity.Property(e => e.Idkec)
                    .HasColumnName("IDKEC")
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Idkabkota)
                    .IsRequired()
                    .HasColumnName("IDKABKOTA")
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.Nama)
                    .IsRequired()
                    .HasColumnName("NAMA")
                    .HasColumnType("text");
            });

            modelBuilder.Entity<Keginduk>(entity =>
            {
                entity.HasKey(e => new { e.Idunit, e.Idkeg, e.Kdtahap });

                entity.ToTable("KEGINDUK");

                entity.HasIndex(e => e.Idkeginduk)
                    .HasName("UC_KEGINDUK")
                    .IsUnique();

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Kdtahap)
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(5);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idkeginduk)
                    .HasColumnName("IDKEGINDUK")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Idprgrm).HasColumnName("IDPRGRM");

                entity.Property(e => e.Indikator)
                    .HasColumnName("INDIKATOR")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Pagu)
                    .HasColumnName("PAGU")
                    .HasColumnType("money");

                entity.Property(e => e.Satuan)
                    .HasColumnName("SATUAN")
                    .HasMaxLength(30);

                entity.Property(e => e.Target).HasColumnName("TARGET");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<Kegsbdana>(entity =>
            {
                entity.HasKey(e => e.Idkegdana);

                entity.ToTable("KEGSBDANA");

                entity.HasIndex(e => new { e.Idkegunit, e.Idjdana })
                    .HasName("UC_KEGSBDANA")
                    .IsUnique();

                entity.Property(e => e.Idkegdana).HasColumnName("IDKEGDANA");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idkegdanax).HasColumnName("IDKEGDANAX");

                entity.Property(e => e.Idkegunit).HasColumnName("IDKEGUNIT");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Kegsbdana)
                    .HasForeignKey(d => d.Idjdana)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KEGSBDANA_JDANA");

                entity.HasOne(d => d.IdkegunitNavigation)
                    .WithMany(p => p.Kegsbdana)
                    .HasForeignKey(d => d.Idkegunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KEGSBDANA_KEGUNIT");
            });

            modelBuilder.Entity<Kegunit>(entity =>
            {
                entity.HasKey(e => e.Idkegunit);

                entity.ToTable("KEGUNIT");

                entity.HasIndex(e => new { e.Idpgrmunit, e.Idkeg })
                    .HasName("UC_KEGUNIT")
                    .IsUnique();

                entity.Property(e => e.Idkegunit).HasColumnName("IDKEGUNIT");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idkegunitx).HasColumnName("IDKEGUNITX");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idpgrmunit).HasColumnName("IDPGRMUNIT");

                entity.Property(e => e.Idprioda)
                    .HasColumnName("IDPRIODA")
                    .HasMaxLength(36);

                entity.Property(e => e.Idsas)
                    .HasColumnName("IDSAS")
                    .HasMaxLength(36);

                entity.Property(e => e.Idsifatkeg).HasColumnName("IDSIFATKEG");

                entity.Property(e => e.Ketkeg)
                    .HasColumnName("KETKEG")
                    .HasMaxLength(512);

                entity.Property(e => e.Lokasi)
                    .HasColumnName("LOKASI")
                    .HasMaxLength(512);

                entity.Property(e => e.Noprior).HasColumnName("NOPRIOR");

                entity.Property(e => e.Pagu)
                    .HasColumnName("PAGU")
                    .HasColumnType("money")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Pagumin1)
                    .HasColumnName("PAGUMIN1")
                    .HasColumnType("money")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Pagupls1)
                    .HasColumnName("PAGUPLS1")
                    .HasColumnType("money")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Paguplus)
                    .HasColumnName("PAGUPLUS")
                    .HasColumnType("money");

                entity.Property(e => e.Pagutif)
                    .HasColumnName("PAGUTIF")
                    .HasColumnType("money");

                entity.Property(e => e.Sasaran)
                    .HasColumnName("SASARAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Satuan)
                    .HasColumnName("SATUAN")
                    .HasMaxLength(30);

                entity.Property(e => e.Target)
                    .HasColumnName("TARGET")
                    .HasMaxLength(10);

                entity.Property(e => e.Targetif)
                    .HasColumnName("TARGETIF")
                    .HasMaxLength(10);

                entity.Property(e => e.Targetp)
                    .HasColumnName("TARGETP")
                    .HasColumnType("money")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Targetsen)
                    .HasColumnName("TARGETSEN")
                    .HasMaxLength(10);

                entity.Property(e => e.Tglakhir)
                    .HasColumnName("TGLAKHIR")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglawal)
                    .HasColumnName("TGLAWAL")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Volume)
                    .HasColumnName("VOLUME")
                    .HasMaxLength(10);

                entity.Property(e => e.Volume1)
                    .HasColumnName("VOLUME1")
                    .HasMaxLength(10);

                entity.HasOne(d => d.IdkegNavigation)
                    .WithMany(p => p.Kegunit)
                    .HasForeignKey(d => d.Idkeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KEGUNIT_MKEG");

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Kegunit)
                    .HasForeignKey(d => d.Idpeg)
                    .HasConstraintName("FK_KEGUNIT_PEGAWAI");

                entity.HasOne(d => d.IdpgrmunitNavigation)
                    .WithMany(p => p.Kegunit)
                    .HasForeignKey(d => d.Idpgrmunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KEGUNIT_PGRMUNIT");

                entity.HasOne(d => d.IdsifatkegNavigation)
                    .WithMany(p => p.Kegunit)
                    .HasForeignKey(d => d.Idsifatkeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KEGUNIT_SIFATKEG");
            });

            modelBuilder.Entity<Kelurahan>(entity =>
            {
                entity.HasKey(e => e.Idkel);

                entity.ToTable("KELURAHAN");

                entity.Property(e => e.Idkel)
                    .HasColumnName("IDKEL")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Idjenis).HasColumnName("IDJENIS");

                entity.Property(e => e.Idkec)
                    .HasColumnName("IDKEC")
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Nama)
                    .HasColumnName("NAMA")
                    .HasColumnType("text");
            });

            modelBuilder.Entity<Khususrek>(entity =>
            {
                entity.HasKey(e => e.Kdkhusus)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("KHUSUSREK");

                entity.Property(e => e.Kdkhusus)
                    .HasColumnName("KDKHUSUS")
                    .ValueGeneratedNever();

                entity.Property(e => e.Idkhususrek)
                    .HasColumnName("IDKHUSUSREK")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Nmkhusus)
                    .HasColumnName("NMKHUSUS")
                    .HasMaxLength(512);
            });

            modelBuilder.Entity<Kinkeg>(entity =>
            {
                entity.HasKey(e => e.Idkinkeg);

                entity.ToTable("KINKEG");

                entity.HasIndex(e => new { e.Idkegunit, e.Kdjkk })
                    .HasName("UC_KINKEG")
                    .IsUnique();

                entity.Property(e => e.Idkinkeg).HasColumnName("IDKINKEG");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idkegunit).HasColumnName("IDKEGUNIT");

                entity.Property(e => e.Idkinkegx).HasColumnName("IDKINKEGX");

                entity.Property(e => e.Kdjkk)
                    .IsRequired()
                    .HasColumnName("KDJKK")
                    .HasMaxLength(2);

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.Nomor)
                    .HasColumnName("NOMOR")
                    .HasMaxLength(10);

                entity.Property(e => e.Satuan)
                    .HasColumnName("SATUAN")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Target)
                    .HasColumnName("TARGET")
                    .HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Tolokur)
                    .HasColumnName("TOLOKUR")
                    .HasMaxLength(4096)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdkegunitNavigation)
                    .WithMany(p => p.Kinkeg)
                    .HasForeignKey(d => d.Idkegunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KINKEG_KEGUNIT");

                entity.HasOne(d => d.KdjkkNavigation)
                    .WithMany(p => p.Kinkeg)
                    .HasForeignKey(d => d.Kdjkk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KINKEG_JKINKEG");
            });

            modelBuilder.Entity<Kinnon>(entity =>
            {
                entity.HasKey(e => new { e.Kdjkk, e.Kdtahap, e.Idunit, e.Idxkode })
                    .ForSqlServerIsClustered(false);

                entity.ToTable("KINNON");

                entity.Property(e => e.Kdjkk)
                    .HasColumnName("KDJKK")
                    .HasMaxLength(2);

                entity.Property(e => e.Kdtahap)
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(3);

                entity.Property(e => e.Idunit)
                    .HasColumnName("IDUNIT")
                    .HasMaxLength(36);

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idkinnon)
                    .HasColumnName("IDKINNON")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Target)
                    .HasColumnName("TARGET")
                    .HasMaxLength(4096)
                    .IsUnicode(false);

                entity.Property(e => e.Tolokur)
                    .HasColumnName("TOLOKUR")
                    .HasMaxLength(4096)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdxkodeNavigation)
                    .WithMany(p => p.Kinnon)
                    .HasForeignKey(d => d.Idxkode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KINNON_ZKODE");

                entity.HasOne(d => d.KdjkkNavigation)
                    .WithMany(p => p.Kinnon)
                    .HasForeignKey(d => d.Kdjkk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KINNON_JKINKEG");
            });

            modelBuilder.Entity<Kontrak>(entity =>
            {
                entity.HasKey(e => e.Idkontrak)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("KONTRAK");

                entity.HasIndex(e => new { e.Idunit, e.Nokontrak })
                    .HasName("IX_KONTRAK")
                    .IsUnique();

                entity.Property(e => e.Idkontrak).HasColumnName("IDKONTRAK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idphk3).HasColumnName("IDPHK3");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Nokontrak)
                    .IsRequired()
                    .HasColumnName("NOKONTRAK")
                    .HasMaxLength(100);

                entity.Property(e => e.Tglakhirkontrak)
                    .HasColumnName("TGLAKHIRKONTRAK")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglkontrak)
                    .HasColumnName("TGLKONTRAK")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);

                entity.HasOne(d => d.IdkegNavigation)
                    .WithMany(p => p.Kontrak)
                    .HasForeignKey(d => d.Idkeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KONTRAK_MKEGIATAN");

                entity.HasOne(d => d.Idphk3Navigation)
                    .WithMany(p => p.Kontrak)
                    .HasForeignKey(d => d.Idphk3)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KONTRAK_PHK3");
            });

            modelBuilder.Entity<Kontrakdetr>(entity =>
            {
                entity.HasKey(e => e.Iddetkontrak);

                entity.ToTable("KONTRAKDETR");

                entity.Property(e => e.Iddetkontrak).HasColumnName("IDDETKONTRAK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbulan).HasColumnName("IDBULAN");

                entity.Property(e => e.Idjtermorlun).HasColumnName("IDJTERMORLUN");

                entity.Property(e => e.Idkontrak).HasColumnName("IDKONTRAK");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdjtermorlunNavigation)
                    .WithMany(p => p.Kontrakdetr)
                    .HasForeignKey(d => d.Idjtermorlun)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KONTRAKDETR_JTERMORLUN");

                entity.HasOne(d => d.IdkontrakNavigation)
                    .WithMany(p => p.Kontrakdetr)
                    .HasForeignKey(d => d.Idkontrak)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KONTRAKDETR_KONTRAK");
            });

            modelBuilder.Entity<Kpa>(entity =>
            {
                entity.HasKey(e => e.Idkpa);

                entity.ToTable("KPA");

                entity.HasIndex(e => e.Idpeg)
                    .HasName("UCID_KPA")
                    .IsUnique();

                entity.Property(e => e.Idkpa).HasColumnName("IDKPA");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Jabatan)
                    .HasColumnName("JABATAN")
                    .HasMaxLength(512);

                entity.HasOne(d => d.IdpegNavigation)
                    .WithOne(p => p.Kpa)
                    .HasForeignKey<Kpa>(d => d.Idpeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KPA_PEGAWAI");
            });

            modelBuilder.Entity<Lpj>(entity =>
            {
                entity.HasKey(e => e.Idlpj)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("LPJ");

                entity.Property(e => e.Idlpj).HasColumnName("IDLPJ");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdstatus)
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Nolpj)
                    .IsRequired()
                    .HasColumnName("NOLPJ")
                    .HasMaxLength(50);

                entity.Property(e => e.Nosah)
                    .HasColumnName("NOSAH")
                    .HasMaxLength(50);

                entity.Property(e => e.Tglbuku)
                    .HasColumnName("TGLBUKU")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tgllpj)
                    .HasColumnName("TGLLPJ")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglsah)
                    .HasColumnName("TGLSAH")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50);

                entity.Property(e => e.Verifikasi)
                    .HasColumnName("VERIFIKASI")
                    .HasMaxLength(512);

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Lpj)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LPJ_DAFTUNIT");
            });

            modelBuilder.Entity<Metodepengadaan>(entity =>
            {
                entity.HasKey(e => e.Idmetodepengadaan);

                entity.ToTable("METODEPENGADAAN");

                entity.Property(e => e.Idmetodepengadaan).HasColumnName("IDMETODEPENGADAAN");

                entity.Property(e => e.Kode)
                    .HasColumnName("KODE")
                    .HasMaxLength(50);

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Mkegiatan>(entity =>
            {
                entity.HasKey(e => e.Idkeg);

                entity.ToTable("MKEGIATAN");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idkeginduk).HasColumnName("IDKEGINDUK");

                entity.Property(e => e.Idprgrm).HasColumnName("IDPRGRM");

                entity.Property(e => e.Jnskeg).HasColumnName("JNSKEG");

                entity.Property(e => e.Kdperspektif).HasColumnName("KDPERSPEKTIF");

                entity.Property(e => e.Levelkeg).HasColumnName("LEVELKEG");

                entity.Property(e => e.Nmkegunit)
                    .IsRequired()
                    .HasColumnName("NMKEGUNIT")
                    .HasMaxLength(512);

                entity.Property(e => e.Nukeg)
                    .IsRequired()
                    .HasColumnName("NUKEG")
                    .HasMaxLength(30);

                entity.Property(e => e.Staktif)
                    .HasColumnName("STAKTIF")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Stvalid)
                    .HasColumnName("STVALID")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("TYPE")
                    .HasMaxLength(5);

                entity.HasOne(d => d.IdprgrmNavigation)
                    .WithMany(p => p.Mkegiatan)
                    .HasForeignKey(d => d.Idprgrm)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MKEGIATAN_MPGRM");

                entity.HasOne(d => d.JnskegNavigation)
                    .WithMany(p => p.Mkegiatan)
                    .HasForeignKey(d => d.Jnskeg)
                    .HasConstraintName("FK_MKEGIATAN_JKEG");
            });

            modelBuilder.Entity<Mpgrm>(entity =>
            {
                entity.HasKey(e => e.Idprgrm);

                entity.ToTable("MPGRM");

                entity.HasIndex(e => new { e.Idurus, e.Nuprgrm })
                    .HasName("UCID_MPGRM")
                    .IsUnique();

                entity.Property(e => e.Idprgrm).HasColumnName("IDPRGRM");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idprioda).HasColumnName("IDPRIODA");

                entity.Property(e => e.Idprionas).HasColumnName("IDPRIONAS");

                entity.Property(e => e.Idprioprov).HasColumnName("IDPRIOPROV");

                entity.Property(e => e.Idurus).HasColumnName("IDURUS");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Nmprgrm)
                    .IsRequired()
                    .HasColumnName("NMPRGRM")
                    .HasMaxLength(512);

                entity.Property(e => e.Nuprgrm)
                    .IsRequired()
                    .HasColumnName("NUPRGRM")
                    .HasMaxLength(5);

                entity.Property(e => e.Staktif)
                    .HasColumnName("STAKTIF")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Stvalid)
                    .HasColumnName("STVALID")
                    .HasDefaultValueSql("((0))");

                entity.HasOne(d => d.IdurusNavigation)
                    .WithMany(p => p.Mpgrm)
                    .HasForeignKey(d => d.Idurus)
                    .HasConstraintName("FK_MPGRM_DAFTURUS");

                entity.HasOne(d => d.IdxkodeNavigation)
                    .WithMany(p => p.Mpgrm)
                    .HasForeignKey(d => d.Idxkode)
                    .HasConstraintName("FK_MPGRM_ZKODE");
            });

            modelBuilder.Entity<Npd>(entity =>
            {
                entity.HasKey(e => e.Idnpd);

                entity.ToTable("NPD");

                entity.HasIndex(e => new { e.Idunit, e.Nonpd, e.Idtrans })
                    .HasName("UC_NPD")
                    .IsUnique();

                entity.Property(e => e.Idnpd).HasColumnName("IDNPD");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idtrans)
                    .HasColumnName("IDTRANS")
                    .HasMaxLength(1);

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nonpd)
                    .IsRequired()
                    .HasColumnName("NONPD")
                    .HasMaxLength(100);

                entity.Property(e => e.Tglkirim)
                    .HasColumnName("TGLKIRIM")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglnpd)
                    .HasColumnName("TGLNPD")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Npd)
                    .HasForeignKey(d => d.Idbend)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NPD_BEND");

                entity.HasOne(d => d.IdtransNavigation)
                    .WithMany(p => p.Npd)
                    .HasForeignKey(d => d.Idtrans)
                    .HasConstraintName("FK_NPD_JTRANS");
            });

            modelBuilder.Entity<Npdbpk>(entity =>
            {
                entity.HasKey(e => e.Idnpdbpk);

                entity.ToTable("NPDBPK");

                entity.HasIndex(e => new { e.Idnpd, e.Idbpk })
                    .HasName("UC_NPDBPK")
                    .IsUnique();

                entity.Property(e => e.Idnpdbpk).HasColumnName("IDNPDBPK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbpk).HasColumnName("IDBPK");

                entity.Property(e => e.Idnpd).HasColumnName("IDNPD");

                entity.Property(e => e.Tglkirim)
                    .HasColumnName("TGLKIRIM")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdbpkNavigation)
                    .WithMany(p => p.Npdbpk)
                    .HasForeignKey(d => d.Idbpk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NPDBPK_BPK");

                entity.HasOne(d => d.IdnpdNavigation)
                    .WithMany(p => p.Npdbpk)
                    .HasForeignKey(d => d.Idnpd)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NPDBPK_NPD");
            });

            modelBuilder.Entity<Npdpjk>(entity =>
            {
                entity.HasKey(e => e.Idnpdnpdpjk);

                entity.ToTable("NPDPJK");

                entity.HasIndex(e => new { e.Idnpd, e.Idbkpajak })
                    .HasName("UC_NPDPJK")
                    .IsUnique();

                entity.Property(e => e.Idnpdnpdpjk).HasColumnName("IDNPDNPDPJK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbkpajak).HasColumnName("IDBKPAJAK");

                entity.Property(e => e.Idnpd).HasColumnName("IDNPD");

                entity.Property(e => e.Tglkirim)
                    .HasColumnName("TGLKIRIM")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdbkpajakNavigation)
                    .WithMany(p => p.Npdpjk)
                    .HasForeignKey(d => d.Idbkpajak)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NPDPJK_BKPAJAK");

                entity.HasOne(d => d.IdnpdNavigation)
                    .WithMany(p => p.Npdpjk)
                    .HasForeignKey(d => d.Idnpd)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NPDPJK_NPD");
            });

            modelBuilder.Entity<Npdsts>(entity =>
            {
                entity.HasKey(e => e.Idnpdsts);

                entity.ToTable("NPDSTS");

                entity.HasIndex(e => new { e.Idnpd, e.Idsts })
                    .HasName("UC_NPDSTS")
                    .IsUnique();

                entity.Property(e => e.Idnpdsts).HasColumnName("IDNPDSTS");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idnpd).HasColumnName("IDNPD");

                entity.Property(e => e.Idsts).HasColumnName("IDSTS");

                entity.Property(e => e.Tglkirim)
                    .HasColumnName("TGLKIRIM")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdnpdNavigation)
                    .WithMany(p => p.Npdsts)
                    .HasForeignKey(d => d.Idnpd)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NPDSTS_NPD");

                entity.HasOne(d => d.IdstsNavigation)
                    .WithMany(p => p.Npdsts)
                    .HasForeignKey(d => d.Idsts)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NPDSTS_STS");
            });

            modelBuilder.Entity<Npdtbpl>(entity =>
            {
                entity.HasKey(e => e.Idnpdtbpl);

                entity.ToTable("NPDTBPL");

                entity.HasIndex(e => new { e.Idnpd, e.Idtbpl })
                    .HasName("UC_NPDTBPL")
                    .IsUnique();

                entity.Property(e => e.Idnpdtbpl).HasColumnName("IDNPDTBPL");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idnpd).HasColumnName("IDNPD");

                entity.Property(e => e.Idtbpl).HasColumnName("IDTBPL");

                entity.Property(e => e.Tglkirim)
                    .HasColumnName("TGLKIRIM")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdnpdNavigation)
                    .WithMany(p => p.Npdtbpl)
                    .HasForeignKey(d => d.Idnpd)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NPDTBPL_NPD");

                entity.HasOne(d => d.IdtbplNavigation)
                    .WithMany(p => p.Npdtbpl)
                    .HasForeignKey(d => d.Idtbpl)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NPDTBPL_TBPL");
            });

            modelBuilder.Entity<Nrcbend>(entity =>
            {
                entity.HasKey(e => e.Idbend);

                entity.ToTable("NRCBEND");

                entity.Property(e => e.Idbend)
                    .HasColumnName("IDBEND")
                    .ValueGeneratedNever();

                entity.Property(e => e.Idnrcbend)
                    .HasColumnName("IDNRCBEND")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.HasOne(d => d.IdbendNavigation)
                    .WithOne(p => p.Nrcbend)
                    .HasForeignKey<Nrcbend>(d => d.Idbend)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NRCBEND_BEND");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Nrcbend)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NRCBEND_DAFTREK");
            });

            modelBuilder.Entity<Paguskpd>(entity =>
            {
                entity.HasKey(e => new { e.Idunit, e.Kdtahap });

                entity.ToTable("PAGUSKPD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Kdtahap)
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(5);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idpaguskpd)
                    .HasColumnName("IDPAGUSKPD")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Nilaiup)
                    .HasColumnName("NILAIUP")
                    .HasColumnType("money");

                entity.HasOne(d => d.KdtahapNavigation)
                    .WithMany(p => p.Paguskpd)
                    .HasForeignKey(d => d.Kdtahap)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PAGUSKPD_TAHAP");
            });

            modelBuilder.Entity<Pajak>(entity =>
            {
                entity.HasKey(e => e.Idpajak);

                entity.ToTable("PAJAK");

                entity.HasIndex(e => e.Kdpajak)
                    .HasName("IX_PAJAK")
                    .IsUnique();

                entity.Property(e => e.Idpajak).HasColumnName("IDPAJAK");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjnspajak).HasColumnName("IDJNSPAJAK");

                entity.Property(e => e.Kdpajak)
                    .HasColumnName("KDPAJAK")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Kdper)
                    .HasColumnName("KDPER")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Nmpajak)
                    .IsRequired()
                    .HasColumnName("NMPAJAK")
                    .HasMaxLength(512);

                entity.Property(e => e.Rumuspajak)
                    .HasColumnName("RUMUSPAJAK")
                    .HasMaxLength(36);

                entity.Property(e => e.Staktif)
                    .HasColumnName("STAKTIF")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Uraian)
                    .IsRequired()
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);

                entity.HasOne(d => d.IdjnspajakNavigation)
                    .WithMany(p => p.Pajak)
                    .HasForeignKey(d => d.Idjnspajak)
                    .HasConstraintName("FK_PAJAK_JJNSPAJAK");
            });

            modelBuilder.Entity<Paketrup>(entity =>
            {
                entity.HasKey(e => e.Idrup);

                entity.ToTable("PAKETRUP");

                entity.Property(e => e.Idrup).HasColumnName("IDRUP");

                entity.Property(e => e.Akhirpekerjaan)
                    .HasColumnName("AKHIRPEKERJAAN")
                    .HasColumnType("datetime");

                entity.Property(e => e.Akhirpelaksanaankontrak)
                    .HasColumnName("AKHIRPELAKSANAANKONTRAK")
                    .HasColumnType("datetime");

                entity.Property(e => e.Akhirpemanfaatan)
                    .HasColumnName("AKHIRPEMANFAATAN")
                    .HasColumnType("datetime");

                entity.Property(e => e.Akhirpemilihan)
                    .HasColumnName("AKHIRPEMILIHAN")
                    .HasColumnType("datetime");

                entity.Property(e => e.Awalpekerjaan)
                    .HasColumnName("AWALPEKERJAAN")
                    .HasColumnType("datetime");

                entity.Property(e => e.Awalpelaksanaankontrak)
                    .HasColumnName("AWALPELAKSANAANKONTRAK")
                    .HasColumnType("datetime");

                entity.Property(e => e.Awalpemanfaatan)
                    .HasColumnName("AWALPEMANFAATAN")
                    .HasColumnType("datetime");

                entity.Property(e => e.Awalpemilihan)
                    .HasColumnName("AWALPEMILIHAN")
                    .HasColumnType("datetime");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Fd).HasColumnName("FD");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idjnspekerjaan).HasColumnName("IDJNSPEKERJAAN");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idlokasi)
                    .HasColumnName("IDLOKASI")
                    .HasMaxLength(10);

                entity.Property(e => e.Idmetodepengadaan).HasColumnName("IDMETODEPENGADAAN");

                entity.Property(e => e.Idphk3).HasColumnName("IDPHK3");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Jnsrup).HasColumnName("JNSRUP");

                entity.Property(e => e.Koderup)
                    .HasColumnName("KODERUP")
                    .HasMaxLength(10);

                entity.Property(e => e.Lokasi)
                    .HasColumnName("LOKASI")
                    .HasMaxLength(255);

                entity.Property(e => e.Nilaipagu)
                    .HasColumnName("NILAIPAGU")
                    .HasColumnType("money");

                entity.Property(e => e.Nmpaket)
                    .HasColumnName("NMPAKET")
                    .HasMaxLength(200);

                entity.Property(e => e.Status).HasColumnName("STATUS");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tipeswakelola).HasColumnName("TIPESWAKELOLA");

                entity.Property(e => e.Uraipaket)
                    .HasColumnName("URAIPAKET")
                    .HasMaxLength(512);

                entity.Property(e => e.Uraitipeswakelola)
                    .HasColumnName("URAITIPESWAKELOLA")
                    .HasMaxLength(255);

                entity.Property(e => e.Volume)
                    .HasColumnName("VOLUME")
                    .HasMaxLength(50);

                entity.Property(e => e.Waktupemilihan)
                    .HasColumnName("WAKTUPEMILIHAN")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdjnspekerjaanNavigation)
                    .WithMany(p => p.Paketrup)
                    .HasForeignKey(d => d.Idjnspekerjaan)
                    .HasConstraintName("FK_PAKETRUP_JPEKERJAAN");

                entity.HasOne(d => d.IdmetodepengadaanNavigation)
                    .WithMany(p => p.Paketrup)
                    .HasForeignKey(d => d.Idmetodepengadaan)
                    .HasConstraintName("FK_PAKETRUP_METODEPENGADAAN");
            });

            modelBuilder.Entity<Paketrupdet>(entity =>
            {
                entity.HasKey(e => e.Idrupdet);

                entity.ToTable("PAKETRUPDET");

                entity.HasIndex(e => new { e.Idrup, e.Idjdana, e.Idphk3 })
                    .HasName("UC_PAKETRUPDET")
                    .IsUnique();

                entity.Property(e => e.Idrupdet).HasColumnName("IDRUPDET");

                entity.Property(e => e.Akhirpekerjaan)
                    .HasColumnName("AKHIRPEKERJAAN")
                    .HasColumnType("datetime");

                entity.Property(e => e.Awalpekerjaan)
                    .HasColumnName("AWALPEKERJAAN")
                    .HasColumnType("datetime");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idjnspekerjaan).HasColumnName("IDJNSPEKERJAAN");

                entity.Property(e => e.Idphk3).HasColumnName("IDPHK3");

                entity.Property(e => e.Idrup).HasColumnName("IDRUP");

                entity.Property(e => e.Koderup)
                    .HasColumnName("KODERUP")
                    .HasMaxLength(10);

                entity.Property(e => e.Lokasi)
                    .HasColumnName("LOKASI")
                    .HasMaxLength(50);

                entity.Property(e => e.Nmpaket)
                    .HasColumnName("NMPAKET")
                    .HasMaxLength(200);

                entity.Property(e => e.Uraipaket)
                    .HasColumnName("URAIPAKET")
                    .HasMaxLength(512);

                entity.Property(e => e.Volume)
                    .HasColumnName("VOLUME")
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Paketrupdet)
                    .HasForeignKey(d => d.Idjdana)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PAKETRUPDET_JDANA");

                entity.HasOne(d => d.IdjnspekerjaanNavigation)
                    .WithMany(p => p.Paketrupdet)
                    .HasForeignKey(d => d.Idjnspekerjaan)
                    .HasConstraintName("FK_PAKETRUPDET_JPEKERJAAN");

                entity.HasOne(d => d.Idphk3Navigation)
                    .WithMany(p => p.Paketrupdet)
                    .HasForeignKey(d => d.Idphk3)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PAKETRUPDET_DAFTPHK3");
            });

            modelBuilder.Entity<Panjar>(entity =>
            {
                entity.HasKey(e => e.Idpanjar);

                entity.ToTable("PANJAR");

                entity.Property(e => e.Idpanjar).HasColumnName("IDPANJAR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdstatus)
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Nopanjar)
                    .IsRequired()
                    .HasColumnName("NOPANJAR")
                    .HasMaxLength(50);

                entity.Property(e => e.Referensi)
                    .HasColumnName("REFERENSI")
                    .HasMaxLength(254);

                entity.Property(e => e.Stbank).HasColumnName("STBANK");

                entity.Property(e => e.Sttunai).HasColumnName("STTUNAI");

                entity.Property(e => e.Tglpanjar)
                    .HasColumnName("TGLPANJAR")
                    .HasColumnType("date");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("date");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(254);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Panjar)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_PANJAR_BEND");

                entity.HasOne(d => d.IdxkodeNavigation)
                    .WithMany(p => p.Panjar)
                    .HasForeignKey(d => d.Idxkode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PANJAR_ZKODE");

                entity.HasOne(d => d.KdstatusNavigation)
                    .WithMany(p => p.Panjar)
                    .HasForeignKey(d => d.Kdstatus)
                    .HasConstraintName("FK_PANJAR_STATUS");
            });

            modelBuilder.Entity<Panjardet>(entity =>
            {
                entity.HasKey(e => e.Idpanjardet);

                entity.ToTable("PANJARDET");

                entity.Property(e => e.Idpanjardet).HasColumnName("IDPANJARDET");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idpanjar).HasColumnName("IDPANJAR");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdpanjarNavigation)
                    .WithMany(p => p.Panjardet)
                    .HasForeignKey(d => d.Idpanjar)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PANJARDET_PANJAR");
            });

            modelBuilder.Entity<Pegawai>(entity =>
            {
                entity.HasKey(e => e.Idpeg);

                entity.ToTable("PEGAWAI");

                entity.HasIndex(e => new { e.Idunit, e.Nip })
                    .HasName("UC_PEGAWAI")
                    .IsUnique();

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Alamat)
                    .HasColumnName("ALAMAT")
                    .HasMaxLength(512);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Jabatan)
                    .HasColumnName("JABATAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Kdgol)
                    .IsRequired()
                    .HasColumnName("KDGOL")
                    .HasMaxLength(10);

                entity.Property(e => e.Nama)
                    .HasColumnName("NAMA")
                    .HasMaxLength(200);

                entity.Property(e => e.Nip)
                    .IsRequired()
                    .HasColumnName("NIP")
                    .HasMaxLength(50);

                entity.Property(e => e.Npwp)
                    .HasColumnName("NPWP")
                    .HasMaxLength(50);

                entity.Property(e => e.Pddk)
                    .HasColumnName("PDDK")
                    .HasMaxLength(30);

                entity.Property(e => e.Staktif)
                    .HasColumnName("STAKTIF")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Stvalid)
                    .HasColumnName("STVALID")
                    .HasDefaultValueSql("((0))");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Pegawai)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PEGAWAI_DAFTUNIT");

                entity.HasOne(d => d.KdgolNavigation)
                    .WithMany(p => p.Pegawai)
                    .HasForeignKey(d => d.Kdgol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PEGAWAI_GOLONGAN");
            });

            modelBuilder.Entity<Pemda>(entity =>
            {
                entity.HasKey(e => e.Configid)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("PEMDA");

                entity.Property(e => e.Configid)
                    .HasColumnName("CONFIGID")
                    .HasMaxLength(10)
                    .ValueGeneratedNever();

                entity.Property(e => e.Configdes)
                    .HasColumnName("CONFIGDES")
                    .HasMaxLength(100);

                entity.Property(e => e.Configval)
                    .HasColumnName("CONFIGVAL")
                    .HasMaxLength(100);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idpemda)
                    .HasColumnName("IDPEMDA")
                    .ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Pgrmunit>(entity =>
            {
                entity.HasKey(e => e.Idpgrmunit);

                entity.ToTable("PGRMUNIT");

                entity.HasIndex(e => new { e.Idunit, e.Kdtahap, e.Idprgrm })
                    .HasName("UC_PGRMUNIT")
                    .IsUnique();

                entity.Property(e => e.Idpgrmunit).HasColumnName("IDPGRMUNIT");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idpgrmunitx).HasColumnName("IDPGRMUNITX");

                entity.Property(e => e.Idprgrm).HasColumnName("IDPRGRM");

                entity.Property(e => e.Idsas)
                    .HasColumnName("IDSAS")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Indikator)
                    .HasColumnName("INDIKATOR")
                    .HasMaxLength(200);

                entity.Property(e => e.Kdtahap)
                    .IsRequired()
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(5);

                entity.Property(e => e.Ket)
                    .HasColumnName("KET")
                    .HasMaxLength(200);

                entity.Property(e => e.Noprio).HasColumnName("NOPRIO");

                entity.Property(e => e.Sasaran)
                    .HasColumnName("SASARAN")
                    .HasMaxLength(200);

                entity.Property(e => e.Target)
                    .HasColumnName("TARGET")
                    .HasMaxLength(200);

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdprgrmNavigation)
                    .WithMany(p => p.Pgrmunit)
                    .HasForeignKey(d => d.Idprgrm)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PGRMUNIT_MPGRM");

                entity.HasOne(d => d.IdsasNavigation)
                    .WithMany(p => p.Pgrmunit)
                    .HasForeignKey(d => d.Idsas)
                    .HasConstraintName("FK_PGRMUNIT_SASARANTHN");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Pgrmunit)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PGRMUNIT_DAFTUNIT");

                entity.HasOne(d => d.KdtahapNavigation)
                    .WithMany(p => p.Pgrmunit)
                    .HasForeignKey(d => d.Kdtahap)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PGRMUNIT_TAHAP");
            });

            modelBuilder.Entity<Potongan>(entity =>
            {
                entity.HasKey(e => e.Idpot);

                entity.ToTable("POTONGAN");

                entity.Property(e => e.Idpot).HasColumnName("IDPOT");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Kdpot)
                    .HasColumnName("KDPOT")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.Mtglevel).HasColumnName("MTGLEVEL");

                entity.Property(e => e.Nmpot)
                    .HasColumnName("NMPOT")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasColumnName("TYPE")
                    .HasMaxLength(2)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Ppk>(entity =>
            {
                entity.HasKey(e => e.Idppk);

                entity.ToTable("PPK");

                entity.Property(e => e.Idppk).HasColumnName("IDPPK");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Ppk)
                    .HasForeignKey(d => d.Idpeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PPK_PEGAWAI");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Ppk)
                    .HasForeignKey(d => d.Idunit)
                    .HasConstraintName("FK_PPK_DAFTUNIT");
            });

            modelBuilder.Entity<Profil>(entity =>
            {
                entity.HasKey(e => e.Kdprofil)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("PROFIL");

                entity.Property(e => e.Kdprofil)
                    .HasColumnName("KDPROFIL")
                    .HasMaxLength(2)
                    .ValueGeneratedNever();

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idprofil)
                    .HasColumnName("IDPROFIL")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Nmprofil)
                    .IsRequired()
                    .HasColumnName("NMPROFIL")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Profilunit>(entity =>
            {
                entity.HasKey(e => new { e.Idunit, e.Kdprofil })
                    .ForSqlServerIsClustered(false);

                entity.ToTable("PROFILUNIT");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Kdprofil)
                    .HasColumnName("KDPROFIL")
                    .HasMaxLength(2);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idprofilunit)
                    .HasColumnName("IDPROFILUNIT")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Ketprofil)
                    .HasColumnName("KETPROFIL")
                    .HasMaxLength(4000);

                entity.Property(e => e.Nodesk)
                    .HasColumnName("NODESK")
                    .HasMaxLength(2);

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Profilunit)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PROFILUNIT_DAFTUNIT");

                entity.HasOne(d => d.KdprofilNavigation)
                    .WithMany(p => p.Profilunit)
                    .HasForeignKey(d => d.Kdprofil)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PROFILUNIT_PROFIL");
            });

            modelBuilder.Entity<Prognosisb>(entity =>
            {
                entity.HasKey(e => e.Idprog)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("PROGNOSISB");

                entity.HasIndex(e => new { e.Idunit, e.Idbulan, e.Idrek })
                    .HasName("IX_PROGNOSISB")
                    .IsUnique();

                entity.Property(e => e.Idprog).HasColumnName("IDPROG");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbulan).HasColumnName("IDBULAN");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nprogman)
                    .HasColumnName("NPROGMAN")
                    .HasColumnType("money");

                entity.Property(e => e.Nprognosis)
                    .HasColumnName("NPROGNOSIS")
                    .HasColumnType("money");

                entity.Property(e => e.Nsoakhir)
                    .HasColumnName("NSOAKHIR")
                    .HasColumnType("money");

                entity.Property(e => e.Stvalid)
                    .HasColumnName("STVALID")
                    .HasMaxLength(1);

                entity.HasOne(d => d.IdbulanNavigation)
                    .WithMany(p => p.Prognosisb)
                    .HasForeignKey(d => d.Idbulan)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PROGNOSISB_BULAN");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Prognosisb)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PROGNOSISB_DAFTREKENING");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Prognosisb)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PROGNOSISB_DAFTUNIT");
            });

            modelBuilder.Entity<Prognosisd>(entity =>
            {
                entity.HasKey(e => e.Idprog)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("PROGNOSISD");

                entity.HasIndex(e => new { e.Idunit, e.Idbulan, e.Idrek })
                    .HasName("UC1_PROGNOSISD")
                    .IsUnique();

                entity.Property(e => e.Idprog).HasColumnName("IDPROG");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbulan).HasColumnName("IDBULAN");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nprogman)
                    .HasColumnName("NPROGMAN")
                    .HasColumnType("money");

                entity.Property(e => e.Nprognosis)
                    .HasColumnName("NPROGNOSIS")
                    .HasColumnType("money");

                entity.Property(e => e.Nsoakhir)
                    .HasColumnName("NSOAKHIR")
                    .HasColumnType("money");

                entity.Property(e => e.Stvalid)
                    .HasColumnName("STVALID")
                    .HasMaxLength(1);

                entity.HasOne(d => d.IdbulanNavigation)
                    .WithMany(p => p.Prognosisd)
                    .HasForeignKey(d => d.Idbulan)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PROGNOSISD_BULAN");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Prognosisd)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PROGNOSISD_DAFTREKENING");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Prognosisd)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PROGNOSISD_DAFTUNIT");
            });

            modelBuilder.Entity<Prognosisr>(entity =>
            {
                entity.HasKey(e => e.Idprog)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("PROGNOSISR");

                entity.HasIndex(e => new { e.Idunit, e.Idkeg, e.Idbulan, e.Idrek })
                    .HasName("UC1_PROGNOSISR")
                    .IsUnique();

                entity.Property(e => e.Idprog).HasColumnName("IDPROG");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbulan).HasColumnName("IDBULAN");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nprogman)
                    .HasColumnName("NPROGMAN")
                    .HasColumnType("money");

                entity.Property(e => e.Nprognosis)
                    .HasColumnName("NPROGNOSIS")
                    .HasColumnType("money");

                entity.Property(e => e.Nsoakhir)
                    .HasColumnName("NSOAKHIR")
                    .HasColumnType("money");

                entity.Property(e => e.Stvalid)
                    .HasColumnName("STVALID")
                    .HasMaxLength(1);

                entity.HasOne(d => d.IdbulanNavigation)
                    .WithMany(p => p.Prognosisr)
                    .HasForeignKey(d => d.Idbulan)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PROGNOSISR_BULAN");

                entity.HasOne(d => d.IdkegNavigation)
                    .WithMany(p => p.Prognosisr)
                    .HasForeignKey(d => d.Idkeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PROGNOSISR_MKEGIATAN");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Prognosisr)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PROGNOSISR_DAFTREKENING");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Prognosisr)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PROGNOSISR_DAFTUNIT");
            });

            modelBuilder.Entity<Provinsi>(entity =>
            {
                entity.HasKey(e => e.Idprov);

                entity.ToTable("PROVINSI");

                entity.Property(e => e.Idprov)
                    .HasColumnName("IDPROV")
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Nama)
                    .IsRequired()
                    .HasColumnName("NAMA")
                    .HasColumnType("text");
            });

            modelBuilder.Entity<Rkab>(entity =>
            {
                entity.HasKey(e => e.Idrkab);

                entity.ToTable("RKAB");

                entity.Property(e => e.Idrkab).HasColumnName("IDRKAB");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idrkabx).HasColumnName("IDRKABX");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Kdtahap)
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(5);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Trkr).HasColumnName("TRKR");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Rkab)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RKAB_DAFTREK");
            });

            modelBuilder.Entity<Rkad>(entity =>
            {
                entity.HasKey(e => e.Idrkad);

                entity.ToTable("RKAD");

                entity.Property(e => e.Idrkad).HasColumnName("IDRKAD");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idrkadx).HasColumnName("IDRKADX");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Kdtahap)
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(5);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Rkad)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RKAD_DAFTREK");
            });

            modelBuilder.Entity<Rkadanab>(entity =>
            {
                entity.HasKey(e => e.Idrkadanab);

                entity.ToTable("RKADANAB");

                entity.HasIndex(e => new { e.Idrkab, e.Idjdana })
                    .HasName("UC_RKADANAB")
                    .IsUnique();

                entity.Property(e => e.Idrkadanab).HasColumnName("IDRKADANAB");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idrkab).HasColumnName("IDRKAB");

                entity.Property(e => e.Idrkadanabx).HasColumnName("IDRKADANABX");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdrkabNavigation)
                    .WithMany(p => p.Rkadanab)
                    .HasForeignKey(d => d.Idrkab)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RKADANAB_RKAB");
            });

            modelBuilder.Entity<Rkadanad>(entity =>
            {
                entity.HasKey(e => e.Idrkadanad);

                entity.ToTable("RKADANAD");

                entity.HasIndex(e => new { e.Idrkad, e.Idjdana })
                    .HasName("UC_RKADANAD")
                    .IsUnique();

                entity.Property(e => e.Idrkadanad).HasColumnName("IDRKADANAD");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idrkad).HasColumnName("IDRKAD");

                entity.Property(e => e.Idrkadanadx).HasColumnName("IDRKADANADX");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdrkadNavigation)
                    .WithMany(p => p.Rkadanad)
                    .HasForeignKey(d => d.Idrkad)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RKADANAD_RKAD");
            });

            modelBuilder.Entity<Rkadanar>(entity =>
            {
                entity.HasKey(e => e.Idrkadanar);

                entity.ToTable("RKADANAR");

                entity.HasIndex(e => new { e.Idrkar, e.Idjdana })
                    .HasName("UC_RKADANAR")
                    .IsUnique();

                entity.Property(e => e.Idrkadanar).HasColumnName("IDRKADANAR");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idrkadanarx).HasColumnName("IDRKADANARX");

                entity.Property(e => e.Idrkar).HasColumnName("IDRKAR");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdrkarNavigation)
                    .WithMany(p => p.Rkadanar)
                    .HasForeignKey(d => d.Idrkar)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RKADANAR_RKAR");
            });

            modelBuilder.Entity<Rkadetb>(entity =>
            {
                entity.HasKey(e => e.Idrkadetb);

                entity.ToTable("RKADETB");

                entity.Property(e => e.Idrkadetb).HasColumnName("IDRKADETB");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Ekspresi)
                    .HasColumnName("EKSPRESI")
                    .HasMaxLength(254);

                entity.Property(e => e.Idrkab).HasColumnName("IDRKAB");

                entity.Property(e => e.Idrkadetbduk).HasColumnName("IDRKADETBDUK");

                entity.Property(e => e.Idrkadetbx).HasColumnName("IDRKADETBX");

                entity.Property(e => e.Idsatuan).HasColumnName("IDSATUAN");

                entity.Property(e => e.Idstdharga).HasColumnName("IDSTDHARGA");

                entity.Property(e => e.Inclsubtotal).HasColumnName("INCLSUBTOTAL");

                entity.Property(e => e.Jumbyek)
                    .HasColumnName("JUMBYEK")
                    .HasColumnType("money");

                entity.Property(e => e.Kdjabar)
                    .HasColumnName("KDJABAR")
                    .HasMaxLength(30);

                entity.Property(e => e.Satuan)
                    .HasColumnName("SATUAN")
                    .HasMaxLength(30);

                entity.Property(e => e.Subtotal)
                    .HasColumnName("SUBTOTAL")
                    .HasColumnType("money");

                entity.Property(e => e.Tarif)
                    .HasColumnName("TARIF")
                    .HasColumnType("money");

                entity.Property(e => e.Type)
                    .HasColumnName("TYPE")
                    .HasMaxLength(2);

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(1024);

                entity.HasOne(d => d.IdrkabNavigation)
                    .WithMany(p => p.Rkadetb)
                    .HasForeignKey(d => d.Idrkab)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RKADETB_RKAB");
            });

            modelBuilder.Entity<Rkadetd>(entity =>
            {
                entity.HasKey(e => e.Idrkadetd);

                entity.ToTable("RKADETD");

                entity.Property(e => e.Idrkadetd).HasColumnName("IDRKADETD");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Ekspresi)
                    .HasColumnName("EKSPRESI")
                    .HasMaxLength(254);

                entity.Property(e => e.Idrkad).HasColumnName("IDRKAD");

                entity.Property(e => e.Idrkadetdduk).HasColumnName("IDRKADETDDUK");

                entity.Property(e => e.Idrkadetdx).HasColumnName("IDRKADETDX");

                entity.Property(e => e.Idsatuan).HasColumnName("IDSATUAN");

                entity.Property(e => e.Idstdharga).HasColumnName("IDSTDHARGA");

                entity.Property(e => e.Inclsubtotal).HasColumnName("INCLSUBTOTAL");

                entity.Property(e => e.Jumbyek)
                    .HasColumnName("JUMBYEK")
                    .HasColumnType("money");

                entity.Property(e => e.Kdjabar)
                    .HasColumnName("KDJABAR")
                    .HasMaxLength(30);

                entity.Property(e => e.Satuan)
                    .HasColumnName("SATUAN")
                    .HasMaxLength(30);

                entity.Property(e => e.Subtotal)
                    .HasColumnName("SUBTOTAL")
                    .HasColumnType("money");

                entity.Property(e => e.Tarif)
                    .HasColumnName("TARIF")
                    .HasColumnType("money");

                entity.Property(e => e.Type)
                    .HasColumnName("TYPE")
                    .HasMaxLength(2);

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(1024);

                entity.HasOne(d => d.IdrkadNavigation)
                    .WithMany(p => p.Rkadetd)
                    .HasForeignKey(d => d.Idrkad)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RKADETD_RKAD");
            });

            modelBuilder.Entity<Rkadetr>(entity =>
            {
                entity.HasKey(e => e.Idrkadetr);

                entity.ToTable("RKADETR");

                entity.Property(e => e.Idrkadetr).HasColumnName("IDRKADETR");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Ekspresi)
                    .HasColumnName("EKSPRESI")
                    .HasMaxLength(254);

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idrkadetrduk).HasColumnName("IDRKADETRDUK");

                entity.Property(e => e.Idrkadetrx).HasColumnName("IDRKADETRX");

                entity.Property(e => e.Idrkar).HasColumnName("IDRKAR");

                entity.Property(e => e.Idsatuan).HasColumnName("IDSATUAN");

                entity.Property(e => e.Idssh).HasColumnName("IDSSH");

                entity.Property(e => e.Inclsubtotal).HasColumnName("INCLSUBTOTAL");

                entity.Property(e => e.Jumbyek)
                    .HasColumnName("JUMBYEK")
                    .HasColumnType("money");

                entity.Property(e => e.Kdjabar)
                    .HasColumnName("KDJABAR")
                    .HasMaxLength(30);

                entity.Property(e => e.Satuan)
                    .HasColumnName("SATUAN")
                    .HasMaxLength(30);

                entity.Property(e => e.Subtotal)
                    .HasColumnName("SUBTOTAL")
                    .HasColumnType("money");

                entity.Property(e => e.Tarif)
                    .HasColumnName("TARIF")
                    .HasColumnType("money");

                entity.Property(e => e.Type)
                    .HasColumnName("TYPE")
                    .HasMaxLength(2);

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(1024);

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Rkadetr)
                    .HasForeignKey(d => d.Idjdana)
                    .HasConstraintName("FK_RKADETR_JDANA");

                entity.HasOne(d => d.IdrkarNavigation)
                    .WithMany(p => p.Rkadetr)
                    .HasForeignKey(d => d.Idrkar)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RKADETR_RKAR");

                entity.HasOne(d => d.IdsshNavigation)
                    .WithMany(p => p.Rkadetr)
                    .HasForeignKey(d => d.Idssh)
                    .HasConstraintName("FK_RKADETR_SSH");
            });

            modelBuilder.Entity<Rkar>(entity =>
            {
                entity.HasKey(e => e.Idrkar);

                entity.ToTable("RKAR");

                entity.HasIndex(e => new { e.Idkeg, e.Idrek, e.Idunit, e.Kdtahap })
                    .HasName("UC_RKAR")
                    .IsUnique();

                entity.Property(e => e.Idrkar).HasColumnName("IDRKAR");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idkegunit).HasColumnName("IDKEGUNIT");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idrkarx).HasColumnName("IDRKARX");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Kdtahap)
                    .IsRequired()
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(5);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdkegNavigation)
                    .WithMany(p => p.Rkar)
                    .HasForeignKey(d => d.Idkeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RKAR_MKEGIATAN");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Rkar)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RKAR_DAFTREK");
            });

            modelBuilder.Entity<Rkasah>(entity =>
            {
                entity.HasKey(e => e.Idrkasah);

                entity.ToTable("RKASAH");

                entity.HasIndex(e => new { e.Idunit, e.Kdtahap })
                    .HasName("UC_RKASAH")
                    .IsUnique();

                entity.Property(e => e.Idrkasah).HasColumnName("IDRKASAH");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Kdtahap)
                    .IsRequired()
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.Tglsah)
                    .HasColumnName("TGLSAH")
                    .HasColumnType("datetime");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Rkasah)
                    .HasForeignKey(d => d.Idpeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RKASAH_PEGAWAI");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Rkasah)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RKASAH_DAFTUNIT");
            });

            modelBuilder.Entity<Rkatapdb>(entity =>
            {
                entity.HasKey(e => e.Idtapdb);

                entity.ToTable("RKATAPDB");

                entity.HasIndex(e => new { e.Idrkab, e.Idpeg })
                    .HasName("UC_RKATAPDB")
                    .IsUnique();

                entity.Property(e => e.Idtapdb).HasColumnName("IDTAPDB");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idrkab).HasColumnName("IDRKAB");

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.Property(e => e.Nomor)
                    .HasColumnName("NOMOR")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Tanggal)
                    .HasColumnName("TANGGAL")
                    .HasColumnType("datetime");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.Verifikasi)
                    .HasColumnName("VERIFIKASI")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Rkatapdb)
                    .HasForeignKey(d => d.Idpeg)
                    .HasConstraintName("FK_RKATAPDB_PEGAWAI");

                entity.HasOne(d => d.IdrkabNavigation)
                    .WithMany(p => p.Rkatapdb)
                    .HasForeignKey(d => d.Idrkab)
                    .HasConstraintName("FK_RKATAPDB_RKAB");
            });

            modelBuilder.Entity<Rkatapdd>(entity =>
            {
                entity.HasKey(e => e.Idtapdd);

                entity.ToTable("RKATAPDD");

                entity.HasIndex(e => new { e.Idrkad, e.Idpeg })
                    .HasName("UC_RKATAPDD")
                    .IsUnique();

                entity.Property(e => e.Idtapdd).HasColumnName("IDTAPDD");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idrkad).HasColumnName("IDRKAD");

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.Property(e => e.Nomor)
                    .HasColumnName("NOMOR")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Tanggal)
                    .HasColumnName("TANGGAL")
                    .HasColumnType("datetime");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.Verifikasi)
                    .HasColumnName("VERIFIKASI")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Rkatapdd)
                    .HasForeignKey(d => d.Idpeg)
                    .HasConstraintName("FK_RKATAPDD_PEGAWAI");

                entity.HasOne(d => d.IdrkadNavigation)
                    .WithMany(p => p.Rkatapdd)
                    .HasForeignKey(d => d.Idrkad)
                    .HasConstraintName("FK_RKATAPDD_RKAD");
            });

            modelBuilder.Entity<Rkatapddetb>(entity =>
            {
                entity.HasKey(e => e.Idtapddetb);

                entity.ToTable("RKATAPDDETB");

                entity.HasIndex(e => new { e.Idrkadetb, e.Idpeg })
                    .HasName("UC_RKATAPDDETB")
                    .IsUnique();

                entity.Property(e => e.Idtapddetb).HasColumnName("IDTAPDDETB");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idrkadetb).HasColumnName("IDRKADETB");

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.Property(e => e.Nomor)
                    .HasColumnName("NOMOR")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Tanggal)
                    .HasColumnName("TANGGAL")
                    .HasColumnType("datetime");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.Verifikasi)
                    .HasColumnName("VERIFIKASI")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Rkatapddetb)
                    .HasForeignKey(d => d.Idpeg)
                    .HasConstraintName("FK_RKATAPDDETB_PEGAWAI");

                entity.HasOne(d => d.IdrkadetbNavigation)
                    .WithMany(p => p.Rkatapddetb)
                    .HasForeignKey(d => d.Idrkadetb)
                    .HasConstraintName("FK_RKATAPDDETB_RKADETB");
            });

            modelBuilder.Entity<Rkatapddetd>(entity =>
            {
                entity.HasKey(e => e.Idtapddetd);

                entity.ToTable("RKATAPDDETD");

                entity.HasIndex(e => new { e.Idrkadetd, e.Idpeg })
                    .HasName("UC_RKATAPDDETD")
                    .IsUnique();

                entity.Property(e => e.Idtapddetd).HasColumnName("IDTAPDDETD");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idrkadetd).HasColumnName("IDRKADETD");

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.Property(e => e.Nomor)
                    .HasColumnName("NOMOR")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Tanggal)
                    .HasColumnName("TANGGAL")
                    .HasColumnType("datetime");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.Verifikasi)
                    .HasColumnName("VERIFIKASI")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Rkatapddetd)
                    .HasForeignKey(d => d.Idpeg)
                    .HasConstraintName("FK_RKATAPDDETD_PEGAWAI");

                entity.HasOne(d => d.IdrkadetdNavigation)
                    .WithMany(p => p.Rkatapddetd)
                    .HasForeignKey(d => d.Idrkadetd)
                    .HasConstraintName("FK_RKATAPDDETD_RKADETD");
            });

            modelBuilder.Entity<Rkatapddetr>(entity =>
            {
                entity.HasKey(e => e.Idtapddetr);

                entity.ToTable("RKATAPDDETR");

                entity.HasIndex(e => new { e.Idrkadetr, e.Idpeg })
                    .HasName("UC_RKATAPDDETR")
                    .IsUnique();

                entity.Property(e => e.Idtapddetr).HasColumnName("IDTAPDDETR");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idrkadetr).HasColumnName("IDRKADETR");

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.Property(e => e.Nomor)
                    .HasColumnName("NOMOR")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Tanggal)
                    .HasColumnName("TANGGAL")
                    .HasColumnType("datetime");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.Verifikasi)
                    .HasColumnName("VERIFIKASI")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Rkatapddetr)
                    .HasForeignKey(d => d.Idpeg)
                    .HasConstraintName("FK_RKATAPDDETR_PEGAWAI");

                entity.HasOne(d => d.IdrkadetrNavigation)
                    .WithMany(p => p.Rkatapddetr)
                    .HasForeignKey(d => d.Idrkadetr)
                    .HasConstraintName("FK_RKATAPDDETR_RKADETR");
            });

            modelBuilder.Entity<Rkatapdr>(entity =>
            {
                entity.HasKey(e => e.Idtapdr);

                entity.ToTable("RKATAPDR");

                entity.HasIndex(e => new { e.Idrkar, e.Idpeg })
                    .HasName("UC_RKATAPDR")
                    .IsUnique();

                entity.Property(e => e.Idtapdr).HasColumnName("IDTAPDR");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idrkar).HasColumnName("IDRKAR");

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.Property(e => e.Nomor)
                    .HasColumnName("NOMOR")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Tanggal)
                    .HasColumnName("TANGGAL")
                    .HasColumnType("datetime");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatetime)
                    .HasColumnName("UPDATETIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.Verifikasi)
                    .HasColumnName("VERIFIKASI")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Rkatapdr)
                    .HasForeignKey(d => d.Idpeg)
                    .HasConstraintName("FK_RKATAPDR_PEGAWAI");

                entity.HasOne(d => d.IdrkarNavigation)
                    .WithMany(p => p.Rkatapdr)
                    .HasForeignKey(d => d.Idrkar)
                    .HasConstraintName("FK_RKATAPDR_RKAR");
            });

            modelBuilder.Entity<Saldoawallak>(entity =>
            {
                entity.HasKey(e => e.Idsaldo);

                entity.ToTable("SALDOAWALLAK");

                entity.Property(e => e.Idsaldo).HasColumnName("IDSALDO");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Stvalid)
                    .HasColumnName("STVALID")
                    .HasMaxLength(1);

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Saldoawallak)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SALDOAWALLAK_DAFTREKLAK");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Saldoawallak)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SALDOAWALLAK_DAFTUNIT");
            });

            modelBuilder.Entity<Saldoawallo>(entity =>
            {
                entity.HasKey(e => e.Idsaldo);

                entity.ToTable("SALDOAWALLO");

                entity.HasIndex(e => new { e.Idunit, e.Idrek })
                    .HasName("IX_SALDOAWALLO")
                    .IsUnique();

                entity.Property(e => e.Idsaldo).HasColumnName("IDSALDO");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjnsakun).HasColumnName("IDJNSAKUN");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Stvalid)
                    .HasColumnName("STVALID")
                    .HasMaxLength(1);

                entity.HasOne(d => d.IdjnsakunNavigation)
                    .WithMany(p => p.Saldoawallo)
                    .HasForeignKey(d => d.Idjnsakun)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SALDOAWALLO_JNSAKUN");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Saldoawallo)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SALDOAWALLO_DAFTREKENING");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Saldoawallo)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SALDOAWALLO_DAFTUNIT");
            });

            modelBuilder.Entity<Saldoawallra>(entity =>
            {
                entity.HasKey(e => e.Idsaldo)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("SALDOAWALLRA");

                entity.HasIndex(e => new { e.Idunit, e.Idrek })
                    .HasName("UC1_SALDOAWALRA")
                    .IsUnique();

                entity.Property(e => e.Idsaldo).HasColumnName("IDSALDO");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjnsakun).HasColumnName("IDJNSAKUN");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Stvalid)
                    .HasColumnName("STVALID")
                    .HasMaxLength(1);

                entity.HasOne(d => d.IdjnsakunNavigation)
                    .WithMany(p => p.Saldoawallra)
                    .HasForeignKey(d => d.Idjnsakun)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SALDOAWALLRA_JNSAKUN");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Saldoawallra)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SALDOAWALLRA_DAFTREKENING");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Saldoawallra)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SALDOAWALLRA_DAFTUNIT");
            });

            modelBuilder.Entity<Saldoawalnrc>(entity =>
            {
                entity.HasKey(e => e.Idsaldo)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("SALDOAWALNRC");

                entity.HasIndex(e => new { e.Idunit, e.Idrek, e.Kdpers })
                    .HasName("UC1_SALDOAWALNRC")
                    .IsUnique();

                entity.Property(e => e.Idsaldo).HasColumnName("IDSALDO");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Kdpers)
                    .IsRequired()
                    .HasColumnName("KDPERS")
                    .HasMaxLength(1);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Stvalid)
                    .HasColumnName("STVALID")
                    .HasMaxLength(1);

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Saldoawalnrc)
                    .HasForeignKey(d => d.Idrek)
                    .HasConstraintName("FK_SALDOAWALNRC_DAFTREKENING");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Saldoawalnrc)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SALDOAWALNRC_DAFTUNIT");
            });

            modelBuilder.Entity<Sasaranthn>(entity =>
            {
                entity.HasKey(e => e.Idsas);

                entity.ToTable("SASARANTHN");

                entity.Property(e => e.Idsas)
                    .HasColumnName("IDSAS")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Idprioda)
                    .HasColumnName("IDPRIODA")
                    .HasMaxLength(36);

                entity.Property(e => e.Ket)
                    .HasColumnName("KET")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Nmsas)
                    .HasColumnName("NMSAS")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.Nosas)
                    .HasColumnName("NOSAS")
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Setblak>(entity =>
            {
                entity.HasKey(e => e.Idsetblak);

                entity.ToTable("SETBLAK");

                entity.Property(e => e.Idsetblak).HasColumnName("IDSETBLAK");

                entity.Property(e => e.Idreklak).HasColumnName("IDREKLAK");

                entity.Property(e => e.Idreklra).HasColumnName("IDREKLRA");

                entity.HasOne(d => d.IdreklakNavigation)
                    .WithMany(p => p.Setblak)
                    .HasForeignKey(d => d.Idreklak)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETBLAK_DAFTREKLAK");

                entity.HasOne(d => d.IdreklraNavigation)
                    .WithMany(p => p.Setblak)
                    .HasForeignKey(d => d.Idreklra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETBLAK_DAFTREKENING");
            });

            modelBuilder.Entity<Setdapbdrba>(entity =>
            {
                entity.HasKey(e => e.Idsetdapbdrba);

                entity.ToTable("SETDAPBDRBA");

                entity.Property(e => e.Idsetdapbdrba).HasColumnName("IDSETDAPBDRBA");

                entity.Property(e => e.Idrekapbd).HasColumnName("IDREKAPBD");

                entity.Property(e => e.Idrekapbd2).HasColumnName("IDREKAPBD2");

                entity.Property(e => e.Idrekrba).HasColumnName("IDREKRBA");

                entity.HasOne(d => d.IdrekapbdNavigation)
                    .WithMany(p => p.SetdapbdrbaIdrekapbdNavigation)
                    .HasForeignKey(d => d.Idrekapbd)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETDAPBDRBA_DAFTREKENING");

                entity.HasOne(d => d.IdrekrbaNavigation)
                    .WithMany(p => p.SetdapbdrbaIdrekrbaNavigation)
                    .HasForeignKey(d => d.Idrekrba)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETDAPBDRBA_DAFTREKENING1");
            });

            modelBuilder.Entity<Setdlak>(entity =>
            {
                entity.HasKey(e => e.Idsetdlak);

                entity.ToTable("SETDLAK");

                entity.Property(e => e.Idsetdlak).HasColumnName("IDSETDLAK");

                entity.Property(e => e.Idreklak).HasColumnName("IDREKLAK");

                entity.Property(e => e.Idreklra).HasColumnName("IDREKLRA");

                entity.HasOne(d => d.IdreklakNavigation)
                    .WithMany(p => p.Setdlak)
                    .HasForeignKey(d => d.Idreklak)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETDLAK_DAFTREKLAK");

                entity.HasOne(d => d.IdreklraNavigation)
                    .WithMany(p => p.Setdlak)
                    .HasForeignKey(d => d.Idreklra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETDLAK_DAFTREKENING");
            });

            modelBuilder.Entity<Setdlralo>(entity =>
            {
                entity.HasKey(e => e.Idsetdlralo);

                entity.ToTable("SETDLRALO");

                entity.HasIndex(e => new { e.Idreklo, e.Idreklra })
                    .HasName("UC_SETDLRALO")
                    .IsUnique();

                entity.Property(e => e.Idsetdlralo).HasColumnName("IDSETDLRALO");

                entity.Property(e => e.Idreklo).HasColumnName("IDREKLO");

                entity.Property(e => e.Idreklra).HasColumnName("IDREKLRA");

                entity.HasOne(d => d.IdrekloNavigation)
                    .WithMany(p => p.SetdlraloIdrekloNavigation)
                    .HasForeignKey(d => d.Idreklo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETDLRALO_DAFTREKENING");

                entity.HasOne(d => d.IdreklraNavigation)
                    .WithMany(p => p.SetdlraloIdreklraNavigation)
                    .HasForeignKey(d => d.Idreklra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETDLRALO_DAFTREKENING1");
            });

            modelBuilder.Entity<Setkdp>(entity =>
            {
                entity.HasKey(e => e.Idsetkdp);

                entity.ToTable("SETKDP");

                entity.Property(e => e.Idsetkdp).HasColumnName("IDSETKDP");

                entity.Property(e => e.Idrekbm).HasColumnName("IDREKBM");

                entity.Property(e => e.Idrekkdp).HasColumnName("IDREKKDP");

                entity.HasOne(d => d.IdrekbmNavigation)
                    .WithMany(p => p.SetkdpIdrekbmNavigation)
                    .HasForeignKey(d => d.Idrekbm)
                    .HasConstraintName("FK_SETKDP_DAFTREKENING");

                entity.HasOne(d => d.IdrekkdpNavigation)
                    .WithMany(p => p.SetkdpIdrekkdpNavigation)
                    .HasForeignKey(d => d.Idrekkdp)
                    .HasConstraintName("FK_SETKDP_DAFTREKENING1");
            });

            modelBuilder.Entity<Setkorolari>(entity =>
            {
                entity.HasKey(e => e.Idkorolari);

                entity.ToTable("SETKOROLARI");

                entity.Property(e => e.Idkorolari).HasColumnName("IDKOROLARI");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idreknrc).HasColumnName("IDREKNRC");

                entity.Property(e => e.Kdpers)
                    .IsRequired()
                    .HasColumnName("KDPERS")
                    .HasMaxLength(1);

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.SetkorolariIdrekNavigation)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETKOROLARI_DAFTREKENING");

                entity.HasOne(d => d.IdreknrcNavigation)
                    .WithMany(p => p.SetkorolariIdreknrcNavigation)
                    .HasForeignKey(d => d.Idreknrc)
                    .HasConstraintName("FK_SETKOROLARI_DAFTREKENING1");
            });

            modelBuilder.Entity<Setmappfk>(entity =>
            {
                entity.HasKey(e => e.Idmappfk);

                entity.ToTable("SETMAPPFK");

                entity.HasIndex(e => new { e.Idreknrc, e.Idrekpot })
                    .HasName("UC_SETMAPPFK")
                    .IsUnique();

                entity.Property(e => e.Idmappfk).HasColumnName("IDMAPPFK");

                entity.Property(e => e.Idpajak).HasColumnName("IDPAJAK");

                entity.Property(e => e.Idreknrc).HasColumnName("IDREKNRC");

                entity.Property(e => e.Idrekpot).HasColumnName("IDREKPOT");

                entity.HasOne(d => d.IdreknrcNavigation)
                    .WithMany(p => p.Setmappfk)
                    .HasForeignKey(d => d.Idreknrc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETMAPPFK_DAFTREKENING");

                entity.HasOne(d => d.IdrekpotNavigation)
                    .WithMany(p => p.Setmappfk)
                    .HasForeignKey(d => d.Idrekpot)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETMAPPFK_JNSPAJAK");
            });

            modelBuilder.Entity<Setnrcmap>(entity =>
            {
                entity.HasKey(e => e.Idsetnrcmap);

                entity.ToTable("SETNRCMAP");

                entity.HasIndex(e => new { e.Idrekaset, e.Idrekhutang })
                    .HasName("UC_SETNRCMAP")
                    .IsUnique();

                entity.Property(e => e.Idsetnrcmap).HasColumnName("IDSETNRCMAP");

                entity.Property(e => e.Idrekaset).HasColumnName("IDREKASET");

                entity.Property(e => e.Idrekhutang).HasColumnName("IDREKHUTANG");

                entity.HasOne(d => d.IdrekasetNavigation)
                    .WithMany(p => p.SetnrcmapIdrekasetNavigation)
                    .HasForeignKey(d => d.Idrekaset)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETNRCMAP_DAFTREKENING");

                entity.HasOne(d => d.IdrekhutangNavigation)
                    .WithMany(p => p.SetnrcmapIdrekhutangNavigation)
                    .HasForeignKey(d => d.Idrekhutang)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETNRCMAP_DAFTREKENING1");
            });

            modelBuilder.Entity<Setpendblj>(entity =>
            {
                entity.HasKey(e => e.Idsetpendblj);

                entity.ToTable("SETPENDBLJ");

                entity.Property(e => e.Idsetpendblj).HasColumnName("IDSETPENDBLJ");

                entity.Property(e => e.Idrekd).HasColumnName("IDREKD");

                entity.Property(e => e.Idrekr).HasColumnName("IDREKR");

                entity.HasOne(d => d.IdrekdNavigation)
                    .WithMany(p => p.SetpendbljIdrekdNavigation)
                    .HasForeignKey(d => d.Idrekd)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETPENDBLJ_DAFTREKENING");

                entity.HasOne(d => d.IdrekrNavigation)
                    .WithMany(p => p.SetpendbljIdrekrNavigation)
                    .HasForeignKey(d => d.Idrekr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETPENDBLJ_DAFTREKENING1");
            });

            modelBuilder.Entity<Setrapbdrba>(entity =>
            {
                entity.HasKey(e => e.Idsetrapbdrba);

                entity.ToTable("SETRAPBDRBA");

                entity.Property(e => e.Idsetrapbdrba).HasColumnName("IDSETRAPBDRBA");

                entity.Property(e => e.Idrekapbd).HasColumnName("IDREKAPBD");

                entity.Property(e => e.Idrekapbd2).HasColumnName("IDREKAPBD2");

                entity.Property(e => e.Idrekrba).HasColumnName("IDREKRBA");

                entity.HasOne(d => d.IdrekapbdNavigation)
                    .WithMany(p => p.SetrapbdrbaIdrekapbdNavigation)
                    .HasForeignKey(d => d.Idrekapbd)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETRAPBDRBA_DAFTREKENING");

                entity.HasOne(d => d.IdrekrbaNavigation)
                    .WithMany(p => p.SetrapbdrbaIdrekrbaNavigation)
                    .HasForeignKey(d => d.Idrekrba)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETRAPBDRBA_DAFTREKENING1");
            });

            modelBuilder.Entity<Setrlak>(entity =>
            {
                entity.HasKey(e => e.Idsetrlak);

                entity.ToTable("SETRLAK");

                entity.Property(e => e.Idsetrlak).HasColumnName("IDSETRLAK");

                entity.Property(e => e.Idreklak).HasColumnName("IDREKLAK");

                entity.Property(e => e.Idreklra).HasColumnName("IDREKLRA");

                entity.HasOne(d => d.IdreklakNavigation)
                    .WithMany(p => p.Setrlak)
                    .HasForeignKey(d => d.Idreklak)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETRLAK_DAFTREKLAK");

                entity.HasOne(d => d.IdreklraNavigation)
                    .WithMany(p => p.Setrlak)
                    .HasForeignKey(d => d.Idreklra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETRLAK_DAFTREKENING");
            });

            modelBuilder.Entity<Setrlralo>(entity =>
            {
                entity.HasKey(e => e.Idsetrlralo);

                entity.ToTable("SETRLRALO");

                entity.HasIndex(e => new { e.Idreklo, e.Idreklra })
                    .HasName("UC_SETRLRALO")
                    .IsUnique();

                entity.Property(e => e.Idsetrlralo).HasColumnName("IDSETRLRALO");

                entity.Property(e => e.Idreklo).HasColumnName("IDREKLO");

                entity.Property(e => e.Idreklra).HasColumnName("IDREKLRA");

                entity.HasOne(d => d.IdrekloNavigation)
                    .WithMany(p => p.SetrlraloIdrekloNavigation)
                    .HasForeignKey(d => d.Idreklo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETRLRALO_DAFTREKENING");

                entity.HasOne(d => d.IdreklraNavigation)
                    .WithMany(p => p.SetrlraloIdreklraNavigation)
                    .HasForeignKey(d => d.Idreklra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETRLRALO_DAFTREKENING1");
            });

            modelBuilder.Entity<Setum>(entity =>
            {
                entity.HasKey(e => e.Idsetum);

                entity.ToTable("SETUM");

                entity.HasIndex(e => new { e.Idrekbl, e.Idrekum })
                    .HasName("UC_SETUM")
                    .IsUnique();

                entity.Property(e => e.Idsetum).HasColumnName("IDSETUM");

                entity.Property(e => e.Idrekbl).HasColumnName("IDREKBL");

                entity.Property(e => e.Idrekum).HasColumnName("IDREKUM");

                entity.HasOne(d => d.IdrekblNavigation)
                    .WithMany(p => p.Setum)
                    .HasForeignKey(d => d.Idrekbl)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETUM_DAFTREKENING");
            });

            modelBuilder.Entity<Setupdlo>(entity =>
            {
                entity.HasKey(e => e.Idsetupdlo);

                entity.ToTable("SETUPDLO");

                entity.HasIndex(e => new { e.Idreklo, e.Idreknrc })
                    .HasName("UC_SETUPDLO")
                    .IsUnique();

                entity.Property(e => e.Idsetupdlo).HasColumnName("IDSETUPDLO");

                entity.Property(e => e.Idreklo).HasColumnName("IDREKLO");

                entity.Property(e => e.Idreknrc).HasColumnName("IDREKNRC");

                entity.HasOne(d => d.IdrekloNavigation)
                    .WithMany(p => p.SetupdloIdrekloNavigation)
                    .HasForeignKey(d => d.Idreklo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETUPDLO_DAFTREKENING1");

                entity.HasOne(d => d.IdreknrcNavigation)
                    .WithMany(p => p.SetupdloIdreknrcNavigation)
                    .HasForeignKey(d => d.Idreknrc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETUPDLO_DAFTREKENING2");
            });

            modelBuilder.Entity<Setuprlo>(entity =>
            {
                entity.HasKey(e => e.Idsetuprlo);

                entity.ToTable("SETUPRLO");

                entity.HasIndex(e => new { e.Idreklo, e.Idreknrc })
                    .HasName("UC_SETUPRLO")
                    .IsUnique();

                entity.Property(e => e.Idsetuprlo).HasColumnName("IDSETUPRLO");

                entity.Property(e => e.Idreklo).HasColumnName("IDREKLO");

                entity.Property(e => e.Idreknrc).HasColumnName("IDREKNRC");

                entity.HasOne(d => d.IdrekloNavigation)
                    .WithMany(p => p.SetuprloIdrekloNavigation)
                    .HasForeignKey(d => d.Idreklo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETUPRLO_DAFTREKENING1");

                entity.HasOne(d => d.IdreknrcNavigation)
                    .WithMany(p => p.SetuprloIdreknrcNavigation)
                    .HasForeignKey(d => d.Idreknrc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SETUPRLO_DAFTREKENING2");
            });

            modelBuilder.Entity<Sifatkeg>(entity =>
            {
                entity.HasKey(e => e.Idsifatkeg)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("SIFATKEG");

                entity.Property(e => e.Idsifatkeg).HasColumnName("IDSIFATKEG");

                entity.Property(e => e.Kdsifat)
                    .IsRequired()
                    .HasColumnName("KDSIFAT")
                    .HasMaxLength(1);

                entity.Property(e => e.Nmsifat)
                    .HasColumnName("NMSIFAT")
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Skp>(entity =>
            {
                entity.HasKey(e => e.Idskp)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("SKP");

                entity.HasIndex(e => new { e.Idunit, e.Noskp })
                    .HasName("UC1_SKP")
                    .IsUnique();

                entity.Property(e => e.Idskp).HasColumnName("IDSKP");

                entity.Property(e => e.Alamat)
                    .HasColumnName("ALAMAT")
                    .HasMaxLength(200);

                entity.Property(e => e.Bunga)
                    .HasColumnName("BUNGA")
                    .HasColumnType("money");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idphk3).HasColumnName("IDPHK3");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdstatus)
                    .IsRequired()
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Kenaikan)
                    .HasColumnName("KENAIKAN")
                    .HasColumnType("money");

                entity.Property(e => e.Noskp)
                    .IsRequired()
                    .HasColumnName("NOSKP")
                    .HasMaxLength(50);

                entity.Property(e => e.Npwpd)
                    .HasColumnName("NPWPD")
                    .HasMaxLength(30);

                entity.Property(e => e.Penyetor)
                    .HasColumnName("PENYETOR")
                    .HasMaxLength(100);

                entity.Property(e => e.Tglskp)
                    .HasColumnName("TGLSKP")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tgltempo)
                    .HasColumnName("TGLTEMPO")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraiskp)
                    .HasColumnName("URAISKP")
                    .HasMaxLength(254);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Skp)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_SKP_BEND");

                entity.HasOne(d => d.Idphk3Navigation)
                    .WithMany(p => p.Skp)
                    .HasForeignKey(d => d.Idphk3)
                    .HasConstraintName("FK_SKP_DAFTPHK3");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Skp)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SKP_DAFTUNIT");
            });

            modelBuilder.Entity<Skpdet>(entity =>
            {
                entity.HasKey(e => e.Idskpdet);

                entity.ToTable("SKPDET");

                entity.HasIndex(e => new { e.Idskp, e.Idrek })
                    .HasName("UC1_SKPDET")
                    .IsUnique();

                entity.Property(e => e.Idskpdet).HasColumnName("IDSKPDET");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idskp).HasColumnName("IDSKP");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Skpdet)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SKPDET_DAFTREKENING");

                entity.HasOne(d => d.IdskpNavigation)
                    .WithMany(p => p.Skpdet)
                    .HasForeignKey(d => d.Idskp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SKPDET_SKP");
            });

            modelBuilder.Entity<Skpsts>(entity =>
            {
                entity.HasKey(e => e.Idsts);

                entity.ToTable("SKPSTS");

                entity.Property(e => e.Idsts)
                    .HasColumnName("IDSTS")
                    .ValueGeneratedNever();

                entity.Property(e => e.Idskp).HasColumnName("IDSKP");

                entity.HasOne(d => d.IdskpNavigation)
                    .WithMany(p => p.Skpsts)
                    .HasForeignKey(d => d.Idskp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SKPSTS_SKP");

                entity.HasOne(d => d.IdstsNavigation)
                    .WithOne(p => p.Skpsts)
                    .HasForeignKey<Skpsts>(d => d.Idsts)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SKPSTS_STS");
            });

            modelBuilder.Entity<Skptbp>(entity =>
            {
                entity.HasKey(e => e.Idtbp);

                entity.ToTable("SKPTBP");

                entity.Property(e => e.Idtbp)
                    .HasColumnName("IDTBP")
                    .ValueGeneratedNever();

                entity.Property(e => e.Idskp).HasColumnName("IDSKP");

                entity.HasOne(d => d.IdskpNavigation)
                    .WithMany(p => p.Skptbp)
                    .HasForeignKey(d => d.Idskp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SKPTBP_SKP");

                entity.HasOne(d => d.IdtbpNavigation)
                    .WithOne(p => p.Skptbp)
                    .HasForeignKey<Skptbp>(d => d.Idtbp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SKPTBP_TBP");
            });

            modelBuilder.Entity<Sp2b>(entity =>
            {
                entity.HasKey(e => e.Idsp2b);

                entity.ToTable("SP2B");

                entity.HasIndex(e => e.Nosp2b)
                    .HasName("UC_SP2B")
                    .IsUnique();

                entity.Property(e => e.Idsp2b).HasColumnName("IDSP2B");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nosp2b)
                    .IsRequired()
                    .HasColumnName("NOSP2B")
                    .HasMaxLength(100);

                entity.Property(e => e.Tglsp2b)
                    .HasColumnName("TGLSP2B")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(254);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Sp2bdet>(entity =>
            {
                entity.HasKey(e => e.Idsp2bdet);

                entity.ToTable("SP2BDET");

                entity.Property(e => e.Idsp2bdet).HasColumnName("IDSP2BDET");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Iderek).HasColumnName("IDEREK");

                entity.Property(e => e.Idjnsakun).HasColumnName("IDJNSAKUN");

                entity.Property(e => e.Idsp2b).HasColumnName("IDSP2B");

                entity.Property(e => e.Idsp3b).HasColumnName("IDSP3B");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.Idsp2bNavigation)
                    .WithMany(p => p.Sp2bdet)
                    .HasForeignKey(d => d.Idsp2b)
                    .HasConstraintName("FK_SP2BDET_SP2B");

                entity.HasOne(d => d.Idsp3bNavigation)
                    .WithMany(p => p.Sp2bdet)
                    .HasForeignKey(d => d.Idsp3b)
                    .HasConstraintName("FK_SP2BDET_SP3B");
            });

            modelBuilder.Entity<Sp2d>(entity =>
            {
                entity.HasKey(e => e.Idsp2d);

                entity.ToTable("SP2D");

                entity.HasIndex(e => e.Idsp2d)
                    .HasName("UC_SP2D")
                    .IsUnique();

                entity.HasIndex(e => new { e.Idunit, e.Idspm })
                    .HasName("UC2_SP2D")
                    .IsUnique();

                entity.Property(e => e.Idsp2d).HasColumnName("IDSP2D");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idkeg)
                    .HasColumnName("IDKEG")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Idkontrak).HasColumnName("IDKONTRAK");

                entity.Property(e => e.Idphk3).HasColumnName("IDPHK3");

                entity.Property(e => e.Idppk).HasColumnName("IDPPK");

                entity.Property(e => e.Idspm).HasColumnName("IDSPM");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdstatus)
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Keperluan)
                    .HasColumnName("KEPERLUAN")
                    .HasMaxLength(1024);

                entity.Property(e => e.Ketotor)
                    .HasColumnName("KETOTOR")
                    .HasMaxLength(254);

                entity.Property(e => e.Nobbantu)
                    .HasColumnName("NOBBANTU")
                    .HasMaxLength(10);

                entity.Property(e => e.Noreg)
                    .HasColumnName("NOREG")
                    .HasMaxLength(10);

                entity.Property(e => e.Nosp2d)
                    .IsRequired()
                    .HasColumnName("NOSP2D")
                    .HasMaxLength(100);

                entity.Property(e => e.Nospm)
                    .HasColumnName("NOSPM")
                    .HasMaxLength(100);

                entity.Property(e => e.Penolakan)
                    .HasColumnName("PENOLAKAN")
                    .HasMaxLength(10);

                entity.Property(e => e.Tglsp2d)
                    .HasColumnName("TGLSP2D")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglspm)
                    .HasColumnName("TGLSPM")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validasi)
                    .HasColumnName("VALIDASI")
                    .HasMaxLength(1024);

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Verifikasi)
                    .HasColumnName("VERIFIKASI")
                    .HasMaxLength(1024);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Sp2d)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_SP2D_BEND");

                entity.HasOne(d => d.IdkontrakNavigation)
                    .WithMany(p => p.Sp2d)
                    .HasForeignKey(d => d.Idkontrak)
                    .HasConstraintName("FK_SP2D_KONTRAK");

                entity.HasOne(d => d.IdppkNavigation)
                    .WithMany(p => p.Sp2d)
                    .HasForeignKey(d => d.Idppk)
                    .HasConstraintName("FK_SP2D_PPK");

                entity.HasOne(d => d.IdspmNavigation)
                    .WithMany(p => p.Sp2d)
                    .HasForeignKey(d => d.Idspm)
                    .HasConstraintName("FK_SP2D_SPM");

                entity.HasOne(d => d.IdttdNavigation)
                    .WithMany(p => p.Sp2d)
                    .HasForeignKey(d => d.Idttd)
                    .HasConstraintName("FK_SP2D_JABTTD");

                entity.HasOne(d => d.IdxkodeNavigation)
                    .WithMany(p => p.Sp2d)
                    .HasForeignKey(d => d.Idxkode)
                    .HasConstraintName("FK_SP2D_ZKODE");

                entity.HasOne(d => d.KdstatusNavigation)
                    .WithMany(p => p.Sp2d)
                    .HasForeignKey(d => d.Kdstatus)
                    .HasConstraintName("FK_SP2D_STATTRS");

                entity.HasOne(d => d.NobbantuNavigation)
                    .WithMany(p => p.Sp2d)
                    .HasForeignKey(d => d.Nobbantu)
                    .HasConstraintName("FK_SP2D_BKBKAS");
            });

            modelBuilder.Entity<Sp2dbpk>(entity =>
            {
                entity.HasKey(e => new { e.Idbpk, e.Idsp2d });

                entity.ToTable("SP2DBPK");

                entity.Property(e => e.Idbpk).HasColumnName("IDBPK");

                entity.Property(e => e.Idsp2d).HasColumnName("IDSP2D");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdbpkNavigation)
                    .WithMany(p => p.Sp2dbpk)
                    .HasForeignKey(d => d.Idbpk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DBPK_BPK");

                entity.HasOne(d => d.Idsp2dNavigation)
                    .WithMany(p => p.Sp2dbpk)
                    .HasForeignKey(d => d.Idsp2d)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DBPK_SP2D");
            });

            modelBuilder.Entity<Sp2dcheckdok>(entity =>
            {
                entity.HasKey(e => e.Idsp2dcheck);

                entity.ToTable("SP2DCHECKDOK");

                entity.Property(e => e.Idsp2dcheck).HasColumnName("IDSP2DCHECK");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idcheck).HasColumnName("IDCHECK");

                entity.Property(e => e.Idsp2d).HasColumnName("IDSP2D");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdcheckNavigation)
                    .WithMany(p => p.Sp2dcheckdok)
                    .HasForeignKey(d => d.Idcheck)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DCHECKDOK_CHECKDOK");

                entity.HasOne(d => d.Idsp2dNavigation)
                    .WithMany(p => p.Sp2dcheckdok)
                    .HasForeignKey(d => d.Idsp2d)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DCHECKDOK_SP2D");
            });

            modelBuilder.Entity<Sp2ddetb>(entity =>
            {
                entity.HasKey(e => e.Idsp2ddetb);

                entity.ToTable("SP2DDETB");

                entity.HasIndex(e => new { e.Idsp2d, e.Idrek })
                    .HasName("UC_SP2DDETB")
                    .IsUnique();

                entity.Property(e => e.Idsp2ddetb).HasColumnName("IDSP2DDETB");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idsp2d).HasColumnName("IDSP2D");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Sp2ddetb)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DDETB_JTRLNKAS");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Sp2ddetb)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DDETB_DAFTREKENING");

                entity.HasOne(d => d.Idsp2dNavigation)
                    .WithMany(p => p.Sp2ddetb)
                    .HasForeignKey(d => d.Idsp2d)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DDETB_SP2D");
            });

            modelBuilder.Entity<Sp2ddetbdana>(entity =>
            {
                entity.HasKey(e => e.Idsp2ddetbdana);

                entity.ToTable("SP2DDETBDANA");

                entity.HasIndex(e => new { e.Idsp2ddetb, e.Idjdana })
                    .HasName("UC_SP2DDETBDANA")
                    .IsUnique();

                entity.Property(e => e.Idsp2ddetbdana).HasColumnName("IDSP2DDETBDANA");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idsp2ddetb).HasColumnName("IDSP2DDETB");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Sp2ddetbdana)
                    .HasForeignKey(d => d.Idjdana)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DDETBDANA_JDANA");

                entity.HasOne(d => d.Idsp2ddetbNavigation)
                    .WithMany(p => p.Sp2ddetbdana)
                    .HasForeignKey(d => d.Idsp2ddetb)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DDETBDANA_SP2DDETB");
            });

            modelBuilder.Entity<Sp2ddetd>(entity =>
            {
                entity.HasKey(e => e.Idsp2ddetd);

                entity.ToTable("SP2DDETD");

                entity.HasIndex(e => new { e.Idsp2d, e.Idrek })
                    .HasName("UC_SP2DDETD")
                    .IsUnique();

                entity.Property(e => e.Idsp2ddetd).HasColumnName("IDSP2DDETD");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idsp2d).HasColumnName("IDSP2D");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Sp2ddetd)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DDETD_JTRNLKAS");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Sp2ddetd)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DDETD_DAFTREK");

                entity.HasOne(d => d.Idsp2dNavigation)
                    .WithMany(p => p.Sp2ddetd)
                    .HasForeignKey(d => d.Idsp2d)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DDETD_SP2D");
            });

            modelBuilder.Entity<Sp2ddetr>(entity =>
            {
                entity.HasKey(e => e.Idsp2ddetr);

                entity.ToTable("SP2DDETR");

                entity.HasIndex(e => new { e.Idsp2d, e.Idrek, e.Idkeg, e.Idnojetra })
                    .HasName("UC_SP2DDETR")
                    .IsUnique();

                entity.Property(e => e.Idsp2ddetr).HasColumnName("IDSP2DDETR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idsp2d).HasColumnName("IDSP2D");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Sp2ddetr)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DDETR_JTRNLKAS");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Sp2ddetr)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DDETR_DAFTREK");

                entity.HasOne(d => d.Idsp2dNavigation)
                    .WithMany(p => p.Sp2ddetr)
                    .HasForeignKey(d => d.Idsp2d)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DDETR_SP2D");
            });

            modelBuilder.Entity<Sp2ddetrdana>(entity =>
            {
                entity.HasKey(e => e.Idsp2ddetrdana);

                entity.ToTable("SP2DDETRDANA");

                entity.HasIndex(e => new { e.Idsp2ddetr, e.Idjdana })
                    .HasName("UC_SP2DDETRDANA")
                    .IsUnique();

                entity.Property(e => e.Idsp2ddetrdana).HasColumnName("IDSP2DDETRDANA");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idsp2ddetr).HasColumnName("IDSP2DDETR");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Sp2ddetrdana)
                    .HasForeignKey(d => d.Idjdana)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DDETRDANA_JDANA");

                entity.HasOne(d => d.Idsp2ddetrNavigation)
                    .WithMany(p => p.Sp2ddetrdana)
                    .HasForeignKey(d => d.Idsp2ddetr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DDETRDANA_SP2DDETR");
            });

            modelBuilder.Entity<Sp2ddetrp>(entity =>
            {
                entity.HasKey(e => e.Idsp2ddetrp);

                entity.ToTable("SP2DDETRP");

                entity.HasIndex(e => new { e.Idsp2ddetr, e.Idpajak })
                    .HasName("UC_SP2DETRP")
                    .IsUnique();

                entity.Property(e => e.Idsp2ddetrp).HasColumnName("IDSP2DDETRP");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbilling)
                    .HasColumnName("IDBILLING")
                    .HasMaxLength(20);

                entity.Property(e => e.Idpajak).HasColumnName("IDPAJAK");

                entity.Property(e => e.Idsp2ddetr).HasColumnName("IDSP2DDETR");

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Tglbilling)
                    .HasColumnName("TGLBILLING")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdpajakNavigation)
                    .WithMany(p => p.Sp2ddetrp)
                    .HasForeignKey(d => d.Idpajak)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DETRP_PAJAK");

                entity.HasOne(d => d.Idsp2ddetrNavigation)
                    .WithMany(p => p.Sp2ddetrp)
                    .HasForeignKey(d => d.Idsp2ddetr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP2DETRP_SP2DDETR");
            });

            modelBuilder.Entity<Sp2dntpn>(entity =>
            {
                entity.HasKey(e => e.Idntpn);

                entity.ToTable("SP2DNTPN");

                entity.Property(e => e.Idntpn).HasColumnName("IDNTPN");

                entity.Property(e => e.Idbilling)
                    .IsRequired()
                    .HasColumnName("IDBILLING")
                    .HasMaxLength(20);

                entity.Property(e => e.Idsp2d).HasColumnName("IDSP2D");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdstatus)
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Nosp2d)
                    .HasColumnName("NOSP2D")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Ntpn)
                    .IsRequired()
                    .HasColumnName("NTPN")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tglntpn)
                    .HasColumnName("TGLNTPN")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglsp2d)
                    .HasColumnName("TGLSP2D")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Idsp2dNavigation)
                    .WithMany(p => p.Sp2dntpn)
                    .HasForeignKey(d => d.Idsp2d)
                    .HasConstraintName("FK_SP2DNTPN_SP2D");

                entity.HasOne(d => d.IdxkodeNavigation)
                    .WithMany(p => p.Sp2dntpn)
                    .HasForeignKey(d => d.Idxkode)
                    .HasConstraintName("FK_SP2DNTPN_ZKODE");

                entity.HasOne(d => d.KdstatusNavigation)
                    .WithMany(p => p.Sp2dntpn)
                    .HasForeignKey(d => d.Kdstatus)
                    .HasConstraintName("FK_SP2DNTPN_STATTRS");
            });

            modelBuilder.Entity<Sp3b>(entity =>
            {
                entity.HasKey(e => e.Idsp3b);

                entity.ToTable("SP3B");

                entity.Property(e => e.Idsp3b).HasColumnName("IDSP3B");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Keybend).HasColumnName("KEYBEND");

                entity.Property(e => e.Nosp3b)
                    .IsRequired()
                    .HasColumnName("NOSP3B")
                    .HasMaxLength(50);

                entity.Property(e => e.Tglsp3b)
                    .HasColumnName("TGLSP3B")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraisp3b)
                    .HasColumnName("URAISP3B")
                    .HasMaxLength(254);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Sp3b)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP3B_DAFTUNIT");
            });

            modelBuilder.Entity<Sp3bdet>(entity =>
            {
                entity.HasKey(e => e.Idsp3bdet);

                entity.ToTable("SP3BDET");

                entity.Property(e => e.Idsp3bdet).HasColumnName("IDSP3BDET");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjnsakun).HasColumnName("IDJNSAKUN");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idsp3b).HasColumnName("IDSP3B");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Nospj)
                    .IsRequired()
                    .HasColumnName("NOSPJ")
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Sp3bdet)
                    .HasForeignKey(d => d.Idrek)
                    .HasConstraintName("FK_SP3BDET_DAFTREKENING");

                entity.HasOne(d => d.Idsp3bNavigation)
                    .WithMany(p => p.Sp3bdet)
                    .HasForeignKey(d => d.Idsp3b)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SP3BDET_SP3B");
            });

            modelBuilder.Entity<Spd>(entity =>
            {
                entity.HasKey(e => e.Idspd)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("SPD");

                entity.HasIndex(e => new { e.Idunit, e.Nospd })
                    .HasName("UC_SPD")
                    .IsUnique();

                entity.Property(e => e.Idspd).HasColumnName("IDSPD");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbulan1).HasColumnName("IDBULAN1");

                entity.Property(e => e.Idbulan2).HasColumnName("IDBULAN2");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Nospd)
                    .IsRequired()
                    .HasColumnName("NOSPD")
                    .HasMaxLength(100);

                entity.Property(e => e.Tglspd)
                    .HasColumnName("TGLSPD")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.HasOne(d => d.Idbulan1Navigation)
                    .WithMany(p => p.SpdIdbulan1Navigation)
                    .HasForeignKey(d => d.Idbulan1)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPD_BULAN1");

                entity.HasOne(d => d.Idbulan2Navigation)
                    .WithMany(p => p.SpdIdbulan2Navigation)
                    .HasForeignKey(d => d.Idbulan2)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPD_BULAN2");

                entity.HasOne(d => d.IdttdNavigation)
                    .WithMany(p => p.Spd)
                    .HasForeignKey(d => d.Idttd)
                    .HasConstraintName("FK_SPD_JABTTD");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Spd)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPD_DAFTUNIT");

                entity.HasOne(d => d.IdxkodeNavigation)
                    .WithMany(p => p.Spd)
                    .HasForeignKey(d => d.Idxkode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPD_ZKODE");
            });

            modelBuilder.Entity<Spddetb>(entity =>
            {
                entity.HasKey(e => e.Idspddetb)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("SPDDETB");

                entity.HasIndex(e => new { e.Idspd, e.Idrek })
                    .HasName("UC_SPDDETB")
                    .IsUnique();

                entity.Property(e => e.Idspddetb).HasColumnName("IDSPDDETB");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idspd).HasColumnName("IDSPD");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money")
                    .HasDefaultValueSql("((0))");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Spddetb)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPDDETB_DAFTREK");

                entity.HasOne(d => d.IdspdNavigation)
                    .WithMany(p => p.Spddetb)
                    .HasForeignKey(d => d.Idspd)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPDDETB_SPD");
            });

            modelBuilder.Entity<Spddetr>(entity =>
            {
                entity.HasKey(e => e.Idspddetr)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("SPDDETR");

                entity.HasIndex(e => new { e.Idspd, e.Idrek, e.Idkeg })
                    .HasName("UC_SPDDETR")
                    .IsUnique();

                entity.Property(e => e.Idspddetr).HasColumnName("IDSPDDETR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idspd).HasColumnName("IDSPD");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money")
                    .HasDefaultValueSql("((0))");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Spddetr)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPDDETR_DAFTREK");

                entity.HasOne(d => d.IdspdNavigation)
                    .WithMany(p => p.Spddetr)
                    .HasForeignKey(d => d.Idspd)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPDDETR_SPD");
            });

            modelBuilder.Entity<Spj>(entity =>
            {
                entity.HasKey(e => e.Idspj)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("SPJ");

                entity.Property(e => e.Idspj).HasColumnName("IDSPJ");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdstatus)
                    .IsRequired()
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Nosah)
                    .IsRequired()
                    .HasColumnName("NOSAH")
                    .HasMaxLength(100);

                entity.Property(e => e.Nospj)
                    .IsRequired()
                    .HasColumnName("NOSPJ")
                    .HasMaxLength(100);

                entity.Property(e => e.Sah).HasColumnName("SAH");

                entity.Property(e => e.Sahby)
                    .HasColumnName("SAHBY")
                    .HasMaxLength(50);

                entity.Property(e => e.Tglbuku)
                    .HasColumnName("TGLBUKU")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglsah)
                    .HasColumnName("TGLSAH")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglspj)
                    .HasColumnName("TGLSPJ")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50);

                entity.Property(e => e.Verifikasi)
                    .HasColumnName("VERIFIKASI")
                    .HasMaxLength(512);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Spj)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_SPJ_BEND");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Spj)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPJ_DAFTUNIT");
            });

            modelBuilder.Entity<Spjapbd>(entity =>
            {
                entity.HasKey(e => e.Idspjapbd);

                entity.ToTable("SPJAPBD");

                entity.Property(e => e.Idspjapbd).HasColumnName("IDSPJAPBD");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Kdstatus)
                    .IsRequired()
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Nospj)
                    .IsRequired()
                    .HasColumnName("NOSPJ")
                    .HasMaxLength(50);

                entity.Property(e => e.Tglspj)
                    .HasColumnName("TGLSPJ")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdkegNavigation)
                    .WithMany(p => p.Spjapbd)
                    .HasForeignKey(d => d.Idkeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPJAPBD_MKEGIATAN");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Spjapbd)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPJAPBD_DAFTUNIT");
            });

            modelBuilder.Entity<Spjapbddet>(entity =>
            {
                entity.HasKey(e => e.Idspjapbddet);

                entity.ToTable("SPJAPBDDET");

                entity.Property(e => e.Idspjapbddet).HasColumnName("IDSPJAPBDDET");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idspjapbd).HasColumnName("IDSPJAPBD");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Spjapbddet)
                    .HasForeignKey(d => d.Idjdana)
                    .HasConstraintName("FK_SPJAPBDDET_JDANA");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Spjapbddet)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPJAPBDDET_JTRNLKAS");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Spjapbddet)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPJAPBDDET_DAFTREKENING");

                entity.HasOne(d => d.IdspjapbdNavigation)
                    .WithMany(p => p.Spjapbddet)
                    .HasForeignKey(d => d.Idspjapbd)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPJAPBDDET_SPJAPBD");
            });

            modelBuilder.Entity<Spjlpj>(entity =>
            {
                entity.HasKey(e => e.Idspjlpj);

                entity.ToTable("SPJLPJ");

                entity.Property(e => e.Idspjlpj).HasColumnName("IDSPJLPJ");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idlpj).HasColumnName("IDLPJ");

                entity.Property(e => e.Idspj).HasColumnName("IDSPJ");

                entity.HasOne(d => d.IdlpjNavigation)
                    .WithMany(p => p.Spjlpj)
                    .HasForeignKey(d => d.Idlpj)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPJLPJ_LPJ");

                entity.HasOne(d => d.IdspjNavigation)
                    .WithMany(p => p.Spjlpj)
                    .HasForeignKey(d => d.Idspj)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPJLPJ_SPJ");
            });

            modelBuilder.Entity<Spjspp>(entity =>
            {
                entity.HasKey(e => e.Idsppspj);

                entity.ToTable("SPJSPP");

                entity.Property(e => e.Idsppspj).HasColumnName("IDSPPSPJ");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbpk)
                    .HasColumnName("IDBPK")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Idspj).HasColumnName("IDSPJ");

                entity.Property(e => e.Idspp).HasColumnName("IDSPP");

                entity.HasOne(d => d.IdspjNavigation)
                    .WithMany(p => p.Spjspp)
                    .HasForeignKey(d => d.Idspj)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPJSPP_SPJ");

                entity.HasOne(d => d.IdsppNavigation)
                    .WithMany(p => p.Spjspp)
                    .HasForeignKey(d => d.Idspp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPJSPP_SPP");
            });

            modelBuilder.Entity<Spjtr>(entity =>
            {
                entity.HasKey(e => e.Idspjtr)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("SPJTR");

                entity.Property(e => e.Idspjtr).HasColumnName("IDSPJTR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idttd).HasColumnName("IDTTD");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdstatus)
                    .IsRequired()
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Ketsah)
                    .HasColumnName("KETSAH")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.Nosah)
                    .HasColumnName("NOSAH")
                    .HasMaxLength(50);

                entity.Property(e => e.Nospj)
                    .IsRequired()
                    .HasColumnName("NOSPJ")
                    .HasMaxLength(50);

                entity.Property(e => e.Sah).HasColumnName("SAH");

                entity.Property(e => e.Sahby)
                    .HasColumnName("SAHBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tglbuku)
                    .HasColumnName("TGLBUKU")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglsah)
                    .HasColumnName("TGLSAH")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglspj)
                    .HasColumnName("TGLSPJ")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<Spm>(entity =>
            {
                entity.HasKey(e => e.Idspm)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("SPM");

                entity.HasIndex(e => e.Idspm)
                    .HasName("UC_SPM")
                    .IsUnique();

                entity.HasIndex(e => new { e.Idunit, e.Idspp })
                    .HasName("IX_SPM")
                    .IsUnique();

                entity.Property(e => e.Idspm).HasColumnName("IDSPM");

                entity.Property(e => e.Approveby)
                    .HasColumnName("APPROVEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idkeg)
                    .HasColumnName("IDKEG")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Idkontrak).HasColumnName("IDKONTRAK");

                entity.Property(e => e.Idphk3).HasColumnName("IDPHK3");

                entity.Property(e => e.Idspp).HasColumnName("IDSPP");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdstatus)
                    .IsRequired()
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Keperluan)
                    .HasColumnName("KEPERLUAN")
                    .HasMaxLength(1024);

                entity.Property(e => e.Ketotor)
                    .HasColumnName("KETOTOR")
                    .HasMaxLength(254);

                entity.Property(e => e.Nilaiup)
                    .HasColumnName("NILAIUP")
                    .HasColumnType("money");

                entity.Property(e => e.Noreg)
                    .HasColumnName("NOREG")
                    .HasMaxLength(10);

                entity.Property(e => e.Nospm)
                    .IsRequired()
                    .HasColumnName("NOSPM")
                    .HasMaxLength(100);

                entity.Property(e => e.Penolakan)
                    .HasColumnName("PENOLAKAN")
                    .HasMaxLength(10)
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.Status).HasColumnName("STATUS");

                entity.Property(e => e.Tglaprove)
                    .HasColumnName("TGLAPROVE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglspm)
                    .HasColumnName("TGLSPM")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglspp)
                    .HasColumnName("TGLSPP")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validasi)
                    .HasColumnName("VALIDASI")
                    .HasMaxLength(1024);

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Verifikasi)
                    .HasColumnName("VERIFIKASI")
                    .HasMaxLength(1024);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Spm)
                    .HasForeignKey(d => d.Idbend)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPM_BEND");

                entity.HasOne(d => d.IdkontrakNavigation)
                    .WithMany(p => p.Spm)
                    .HasForeignKey(d => d.Idkontrak)
                    .HasConstraintName("FK_SPM_KONTRAK");

                entity.HasOne(d => d.Idphk3Navigation)
                    .WithMany(p => p.Spm)
                    .HasForeignKey(d => d.Idphk3)
                    .HasConstraintName("FK_SPM_PHK3");

                entity.HasOne(d => d.IdsppNavigation)
                    .WithMany(p => p.Spm)
                    .HasForeignKey(d => d.Idspp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPM_SPP");

                entity.HasOne(d => d.IdxkodeNavigation)
                    .WithMany(p => p.Spm)
                    .HasForeignKey(d => d.Idxkode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPM_ZKODE");

                entity.HasOne(d => d.KdstatusNavigation)
                    .WithMany(p => p.Spm)
                    .HasForeignKey(d => d.Kdstatus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPM_STATTRS");
            });

            modelBuilder.Entity<Spmcheckdok>(entity =>
            {
                entity.HasKey(e => e.Idspmcheck);

                entity.ToTable("SPMCHECKDOK");

                entity.Property(e => e.Idspmcheck).HasColumnName("IDSPMCHECK");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idcheck).HasColumnName("IDCHECK");

                entity.Property(e => e.Idspm).HasColumnName("IDSPM");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdcheckNavigation)
                    .WithMany(p => p.Spmcheckdok)
                    .HasForeignKey(d => d.Idcheck)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPMCHECKDOK_CHECKDOK");

                entity.HasOne(d => d.IdspmNavigation)
                    .WithMany(p => p.Spmcheckdok)
                    .HasForeignKey(d => d.Idspm)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPMCHECKDOK_SPM");
            });

            modelBuilder.Entity<Spmdetb>(entity =>
            {
                entity.HasKey(e => e.Idspmdetb);

                entity.ToTable("SPMDETB");

                entity.HasIndex(e => new { e.Idspm, e.Idrek })
                    .HasName("UC_SPMDETB")
                    .IsUnique();

                entity.Property(e => e.Idspmdetb).HasColumnName("IDSPMDETB");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idspm).HasColumnName("IDSPM");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Spmdetb)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPMDETB_DAFTREKENING");

                entity.HasOne(d => d.IdspmNavigation)
                    .WithMany(p => p.Spmdetb)
                    .HasForeignKey(d => d.Idspm)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPMDETB_SPM");
            });

            modelBuilder.Entity<Spmdetd>(entity =>
            {
                entity.HasKey(e => e.Idspmdetd);

                entity.ToTable("SPMDETD");

                entity.HasIndex(e => new { e.Idspm, e.Idrek })
                    .HasName("UC_SPMDETD")
                    .IsUnique();

                entity.Property(e => e.Idspmdetd).HasColumnName("IDSPMDETD");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idspm).HasColumnName("IDSPM");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Spmdetd)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPMDETD_DAFTREKENING");

                entity.HasOne(d => d.IdspmNavigation)
                    .WithMany(p => p.Spmdetd)
                    .HasForeignKey(d => d.Idspm)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPMDETD_SPM");
            });

            modelBuilder.Entity<Spp>(entity =>
            {
                entity.HasKey(e => e.Idspp)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("SPP");

                entity.HasIndex(e => e.Idspp)
                    .HasName("UC_SPP")
                    .IsUnique();

                entity.Property(e => e.Idspp).HasColumnName("IDSPP");

                entity.Property(e => e.Approveby)
                    .HasColumnName("APPROVEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idbulan).HasColumnName("IDBULAN");

                entity.Property(e => e.Idkeg)
                    .HasColumnName("IDKEG")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Idkontrak).HasColumnName("IDKONTRAK");

                entity.Property(e => e.Idphk3).HasColumnName("IDPHK3");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdstatus)
                    .IsRequired()
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Keperluan)
                    .HasColumnName("KEPERLUAN")
                    .HasMaxLength(1024);

                entity.Property(e => e.Ketotor)
                    .HasColumnName("KETOTOR")
                    .HasMaxLength(254);

                entity.Property(e => e.Nilaiup)
                    .HasColumnName("NILAIUP")
                    .HasColumnType("money");

                entity.Property(e => e.Noreg)
                    .HasColumnName("NOREG")
                    .HasMaxLength(10);

                entity.Property(e => e.Nospp)
                    .IsRequired()
                    .HasColumnName("NOSPP")
                    .HasMaxLength(100);

                entity.Property(e => e.Penolakan)
                    .HasColumnName("PENOLAKAN")
                    .HasMaxLength(10)
                    .HasDefaultValueSql("('0')");

                entity.Property(e => e.Status).HasColumnName("STATUS");

                entity.Property(e => e.Tglaprove)
                    .HasColumnName("TGLAPROVE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglspp)
                    .HasColumnName("TGLSPP")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validasi)
                    .HasColumnName("VALIDASI")
                    .HasMaxLength(1024);

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Verifikasi)
                    .HasColumnName("VERIFIKASI")
                    .HasMaxLength(1024);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Spp)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_SPP_BEND");

                entity.HasOne(d => d.IdbulanNavigation)
                    .WithMany(p => p.Spp)
                    .HasForeignKey(d => d.Idbulan)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPP_BULAN");

                entity.HasOne(d => d.IdkontrakNavigation)
                    .WithMany(p => p.Spp)
                    .HasForeignKey(d => d.Idkontrak)
                    .HasConstraintName("FK_SPP_KONTRAK");

                entity.HasOne(d => d.Idphk3Navigation)
                    .WithMany(p => p.Spp)
                    .HasForeignKey(d => d.Idphk3)
                    .HasConstraintName("FK_SPP_DAFTPHK3");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Spp)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPP_DAFTUNIT");

                entity.HasOne(d => d.IdxkodeNavigation)
                    .WithMany(p => p.Spp)
                    .HasForeignKey(d => d.Idxkode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPP_ZKODE");

                entity.HasOne(d => d.KdstatusNavigation)
                    .WithMany(p => p.Spp)
                    .HasForeignKey(d => d.Kdstatus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPP_STATTRS");
            });

            modelBuilder.Entity<Sppbpk>(entity =>
            {
                entity.HasKey(e => e.Idsppbpk);

                entity.ToTable("SPPBPK");

                entity.HasIndex(e => e.Idbpk)
                    .HasName("UC_SPPBPK")
                    .IsUnique();

                entity.Property(e => e.Idsppbpk).HasColumnName("IDSPPBPK");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbpk).HasColumnName("IDBPK");

                entity.Property(e => e.Idspp).HasColumnName("IDSPP");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdbpkNavigation)
                    .WithOne(p => p.Sppbpk)
                    .HasForeignKey<Sppbpk>(d => d.Idbpk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPBPK_BPK");

                entity.HasOne(d => d.IdsppNavigation)
                    .WithMany(p => p.Sppbpk)
                    .HasForeignKey(d => d.Idspp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPBPK_SPP1");
            });

            modelBuilder.Entity<Sppcheckdok>(entity =>
            {
                entity.HasKey(e => e.Idsppcheck);

                entity.ToTable("SPPCHECKDOK");

                entity.Property(e => e.Idsppcheck).HasColumnName("IDSPPCHECK");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idcheck).HasColumnName("IDCHECK");

                entity.Property(e => e.Idspp).HasColumnName("IDSPP");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdcheckNavigation)
                    .WithMany(p => p.Sppcheckdok)
                    .HasForeignKey(d => d.Idcheck)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPCHECKDOK_CHECKDOK");

                entity.HasOne(d => d.IdsppNavigation)
                    .WithMany(p => p.Sppcheckdok)
                    .HasForeignKey(d => d.Idspp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPCHECKDOK_SPP");
            });

            modelBuilder.Entity<Sppdetb>(entity =>
            {
                entity.HasKey(e => e.Idsppdetb);

                entity.ToTable("SPPDETB");

                entity.HasIndex(e => new { e.Idspp, e.Idrek, e.Idnojetra })
                    .HasName("UC_SPPDETB")
                    .IsUnique();

                entity.Property(e => e.Idsppdetb).HasColumnName("IDSPPDETB");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idspp).HasColumnName("IDSPP");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Sppdetb)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETB_JTRNLKAS");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Sppdetb)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETB_DAFTREK");

                entity.HasOne(d => d.IdsppNavigation)
                    .WithMany(p => p.Sppdetb)
                    .HasForeignKey(d => d.Idspp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETB_SPP");
            });

            modelBuilder.Entity<Sppdetbdana>(entity =>
            {
                entity.HasKey(e => e.Idsppdetbdana);

                entity.ToTable("SPPDETBDANA");

                entity.HasIndex(e => e.Idsppdetbdana)
                    .HasName("UK_SPPDETBDANA")
                    .IsUnique();

                entity.HasIndex(e => new { e.Idsppdetb, e.Idjdana })
                    .HasName("UC_SPPDETBDANA")
                    .IsUnique();

                entity.Property(e => e.Idsppdetbdana).HasColumnName("IDSPPDETBDANA");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idsppdetb).HasColumnName("IDSPPDETB");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Sppdetbdana)
                    .HasForeignKey(d => d.Idjdana)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETBDANA_JDANA");

                entity.HasOne(d => d.IdsppdetbNavigation)
                    .WithMany(p => p.Sppdetbdana)
                    .HasForeignKey(d => d.Idsppdetb)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETBDANA_SPPDETB");
            });

            modelBuilder.Entity<Sppdetd>(entity =>
            {
                entity.HasKey(e => e.Idsppdetd);

                entity.ToTable("SPPDETD");

                entity.HasIndex(e => new { e.Idspp, e.Idrek, e.Idnojetra })
                    .HasName("UC_SPPDETD")
                    .IsUnique();

                entity.Property(e => e.Idsppdetd).HasColumnName("IDSPPDETD");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idspp).HasColumnName("IDSPP");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Sppdetd)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETD_JTRNLKAS");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Sppdetd)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETD_DAFTREK");

                entity.HasOne(d => d.IdsppNavigation)
                    .WithMany(p => p.Sppdetd)
                    .HasForeignKey(d => d.Idspp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETD_SPP");
            });

            modelBuilder.Entity<Sppdetr>(entity =>
            {
                entity.HasKey(e => e.Idsppdetr);

                entity.ToTable("SPPDETR");

                entity.HasIndex(e => new { e.Idspp, e.Idrek, e.Idkeg, e.Idnojetra })
                    .HasName("UC_SPPDETR")
                    .IsUnique();

                entity.Property(e => e.Idsppdetr).HasColumnName("IDSPPDETR");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idspp).HasColumnName("IDSPP");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Sppdetr)
                    .HasForeignKey(d => d.Idjdana)
                    .HasConstraintName("FK_SPPDETR_JDANA");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Sppdetr)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETR_JTRLNKAS");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Sppdetr)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETR_DAFTREK");

                entity.HasOne(d => d.IdsppNavigation)
                    .WithMany(p => p.Sppdetr)
                    .HasForeignKey(d => d.Idspp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETR_SPP");
            });

            modelBuilder.Entity<Sppdetrdana>(entity =>
            {
                entity.HasKey(e => e.Idsppdetrdana);

                entity.ToTable("SPPDETRDANA");

                entity.HasIndex(e => new { e.Idsppdetr, e.Idjdana })
                    .HasName("UC_SPPDETRDANA")
                    .IsUnique();

                entity.Property(e => e.Idsppdetrdana).HasColumnName("IDSPPDETRDANA");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idjdana).HasColumnName("IDJDANA");

                entity.Property(e => e.Idsppdetr).HasColumnName("IDSPPDETR");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdjdanaNavigation)
                    .WithMany(p => p.Sppdetrdana)
                    .HasForeignKey(d => d.Idjdana)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETRDANA_JDANA");

                entity.HasOne(d => d.IdsppdetrNavigation)
                    .WithMany(p => p.Sppdetrdana)
                    .HasForeignKey(d => d.Idsppdetr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETRDANA_SPPDETR");
            });

            modelBuilder.Entity<Sppdetrp>(entity =>
            {
                entity.HasKey(e => e.Idsppdetrp);

                entity.ToTable("SPPDETRP");

                entity.HasIndex(e => new { e.Idsppdetr, e.Idpajak })
                    .HasName("UC_SPPDETRP")
                    .IsUnique();

                entity.Property(e => e.Idsppdetrp).HasColumnName("IDSPPDETRP");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbilling)
                    .HasColumnName("IDBILLING")
                    .HasMaxLength(20);

                entity.Property(e => e.Idpajak).HasColumnName("IDPAJAK");

                entity.Property(e => e.Idsppdetr).HasColumnName("IDSPPDETR");

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Ntb)
                    .HasColumnName("NTB")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Ntpn)
                    .HasColumnName("NTPN")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Tglbilling)
                    .HasColumnName("TGLBILLING")
                    .HasColumnType("datetime");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdpajakNavigation)
                    .WithMany(p => p.Sppdetrp)
                    .HasForeignKey(d => d.Idpajak)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETRP_PAJAK");

                entity.HasOne(d => d.IdsppdetrNavigation)
                    .WithMany(p => p.Sppdetrp)
                    .HasForeignKey(d => d.Idsppdetr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETRP_SPPDETR");
            });

            modelBuilder.Entity<Sppdetrpot>(entity =>
            {
                entity.HasKey(e => e.Idsppdetrpot);

                entity.ToTable("SPPDETRPOT");

                entity.Property(e => e.Idsppdetrpot).HasColumnName("IDSPPDETRPOT");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idpot).HasColumnName("IDPOT");

                entity.Property(e => e.Idsppdetr).HasColumnName("IDSPPDETR");

                entity.Property(e => e.Keterangan)
                    .HasColumnName("KETERANGAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdpotNavigation)
                    .WithMany(p => p.Sppdetrpot)
                    .HasForeignKey(d => d.Idpot)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETRPOT_POTONGAN");

                entity.HasOne(d => d.IdsppdetrNavigation)
                    .WithMany(p => p.Sppdetrpot)
                    .HasForeignKey(d => d.Idsppdetr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPDETRPOT_SPPDETR");
            });

            modelBuilder.Entity<Spptag>(entity =>
            {
                entity.HasKey(e => e.Idspptag);

                entity.ToTable("SPPTAG");

                entity.Property(e => e.Idspptag).HasColumnName("IDSPPTAG");

                entity.Property(e => e.Createby)
                    .HasColumnName("CREATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createdate)
                    .HasColumnName("CREATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idspp).HasColumnName("IDSPP");

                entity.Property(e => e.Idtagihan).HasColumnName("IDTAGIHAN");

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdsppNavigation)
                    .WithMany(p => p.Spptag)
                    .HasForeignKey(d => d.Idspp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPTAG_SPP");

                entity.HasOne(d => d.IdtagihanNavigation)
                    .WithMany(p => p.Spptag)
                    .HasForeignKey(d => d.Idtagihan)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SPPTAG_TAGIHAN");
            });

            modelBuilder.Entity<Ssh>(entity =>
            {
                entity.HasKey(e => e.Idssh);

                entity.ToTable("SSH");

                entity.Property(e => e.Idssh).HasColumnName("IDSSH");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Harga)
                    .HasColumnName("HARGA")
                    .HasColumnType("money");

                entity.Property(e => e.Idbrg).HasColumnName("IDBRG");

                entity.Property(e => e.Kdsatuan)
                    .HasColumnName("KDSATUAN")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Kdssh)
                    .IsRequired()
                    .HasColumnName("KDSSH")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Kelompok)
                    .HasColumnName("KELOMPOK")
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.Kode)
                    .HasColumnName("KODE")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Satuan)
                    .HasColumnName("SATUAN")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Spek)
                    .HasColumnName("SPEK")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdbrgNavigation)
                    .WithMany(p => p.Ssh)
                    .HasForeignKey(d => d.Idbrg)
                    .HasConstraintName("FK_SSH_DAFTBARANG");

                entity.HasOne(d => d.KdsatuanNavigation)
                    .WithMany(p => p.Ssh)
                    .HasForeignKey(d => d.Kdsatuan)
                    .HasConstraintName("FK_SSH_SSH");
            });

            modelBuilder.Entity<Sshrek>(entity =>
            {
                entity.HasKey(e => e.Idsshrek);

                entity.ToTable("SSHREK");

                entity.Property(e => e.Idsshrek).HasColumnName("IDSSHREK");

                entity.Property(e => e.Createdby)
                    .HasColumnName("CREATEDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate)
                    .HasColumnName("CREATEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idssh).HasColumnName("IDSSH");

                entity.Property(e => e.Kdssh)
                    .HasColumnName("KDSSH")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updateby)
                    .HasColumnName("UPDATEBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Updatedate)
                    .HasColumnName("UPDATEDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Sshrek)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SSHREK_DAFTREKENING");

                entity.HasOne(d => d.IdsshNavigation)
                    .WithMany(p => p.Sshrek)
                    .HasForeignKey(d => d.Idssh)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SSHREK_SSH");
            });

            modelBuilder.Entity<Stattrs>(entity =>
            {
                entity.HasKey(e => e.Kdstatus)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("STATTRS");

                entity.Property(e => e.Kdstatus)
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3)
                    .ValueGeneratedNever();

                entity.Property(e => e.Lblstatus)
                    .IsRequired()
                    .HasColumnName("LBLSTATUS")
                    .HasMaxLength(50);

                entity.Property(e => e.Uraian)
                    .IsRequired()
                    .HasColumnName("URAIAN")
                    .HasMaxLength(254);
            });

            modelBuilder.Entity<Stdharga>(entity =>
            {
                entity.HasKey(e => e.Idstdharga)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("STDHARGA");

                entity.Property(e => e.Idstdharga).HasColumnName("IDSTDHARGA");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Hrgstd)
                    .HasColumnName("HRGSTD")
                    .HasColumnType("money")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Kdjnsstd)
                    .IsRequired()
                    .HasColumnName("KDJNSSTD")
                    .HasMaxLength(10);

                entity.Property(e => e.Kdsatuan)
                    .HasColumnName("KDSATUAN")
                    .HasMaxLength(10);

                entity.Property(e => e.Ket)
                    .HasColumnName("KET")
                    .HasMaxLength(2048)
                    .IsUnicode(false);

                entity.Property(e => e.Merkstd)
                    .HasColumnName("MERKSTD")
                    .HasMaxLength(20);

                entity.Property(e => e.Nmstd)
                    .HasColumnName("NMSTD")
                    .HasMaxLength(512);

                entity.Property(e => e.Nostd)
                    .IsRequired()
                    .HasColumnName("NOSTD")
                    .HasMaxLength(20);

                entity.Property(e => e.Spekstd)
                    .HasColumnName("SPEKSTD")
                    .HasMaxLength(512);

                entity.Property(e => e.Stvalid)
                    .HasColumnName("STVALID")
                    .HasMaxLength(2);
            });

            modelBuilder.Entity<Strurek>(entity =>
            {
                entity.HasKey(e => new { e.Idstrurek, e.Mtglevel })
                    .ForSqlServerIsClustered(false);

                entity.ToTable("STRUREK");

                entity.HasIndex(e => e.Mtglevel)
                    .HasName("UC_STRUREK")
                    .IsUnique();

                entity.Property(e => e.Idstrurek)
                    .HasColumnName("IDSTRUREK")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Mtglevel).HasColumnName("MTGLEVEL");

                entity.Property(e => e.Nmlevel)
                    .IsRequired()
                    .HasColumnName("NMLEVEL")
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Struunit>(entity =>
            {
                entity.HasKey(e => e.Kdlevel)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("STRUUNIT");

                entity.Property(e => e.Kdlevel)
                    .HasColumnName("KDLEVEL")
                    .ValueGeneratedNever();

                entity.Property(e => e.Idstruunit)
                    .HasColumnName("IDSTRUUNIT")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Nmlevel)
                    .IsRequired()
                    .HasColumnName("NMLEVEL")
                    .HasMaxLength(30);

                entity.Property(e => e.Numdigit)
                    .HasColumnName("NUMDIGIT")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Sts>(entity =>
            {
                entity.HasKey(e => e.Idsts)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("STS");

                entity.HasIndex(e => new { e.Nosts, e.Idunit })
                    .HasName("UC_STS")
                    .IsUnique();

                entity.Property(e => e.Idsts).HasColumnName("IDSTS");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdrilis).HasColumnName("KDRILIS");

                entity.Property(e => e.Kdstatus)
                    .IsRequired()
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Ketvalid)
                    .HasColumnName("KETVALID")
                    .HasMaxLength(254);

                entity.Property(e => e.Nilaiup)
                    .HasColumnName("NILAIUP")
                    .HasColumnType("money");

                entity.Property(e => e.Nobbantu)
                    .IsRequired()
                    .HasColumnName("NOBBANTU")
                    .HasMaxLength(10);

                entity.Property(e => e.Nosts)
                    .IsRequired()
                    .HasColumnName("NOSTS")
                    .HasMaxLength(100);

                entity.Property(e => e.Stcair)
                    .HasColumnName("STCAIR")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Stkirim)
                    .HasColumnName("STKIRIM")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Tglsts)
                    .HasColumnName("TGLSTS")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .HasColumnName("URAIAN")
                    .HasMaxLength(254);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Sts)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_STS_BEND");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Sts)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STS_DAFTUNIT");

                entity.HasOne(d => d.IdxkodeNavigation)
                    .WithMany(p => p.Sts)
                    .HasForeignKey(d => d.Idxkode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STS_ZKODE");

                entity.HasOne(d => d.KdstatusNavigation)
                    .WithMany(p => p.Sts)
                    .HasForeignKey(d => d.Kdstatus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STS_STATTRS");

                entity.HasOne(d => d.NobbantuNavigation)
                    .WithMany(p => p.Sts)
                    .HasForeignKey(d => d.Nobbantu)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STS_BKBKAS");

                entity.HasOne(d => d.StcairNavigation)
                    .WithMany(p => p.Sts)
                    .HasForeignKey(d => d.Stcair)
                    .HasConstraintName("FK_STS_JCAIR");

                entity.HasOne(d => d.StkirimNavigation)
                    .WithMany(p => p.Sts)
                    .HasForeignKey(d => d.Stkirim)
                    .HasConstraintName("FK_STS_KIRIM");
            });

            modelBuilder.Entity<Stsdetb>(entity =>
            {
                entity.HasKey(e => e.Idstsdetb);

                entity.ToTable("STSDETB");

                entity.HasIndex(e => new { e.Idsts, e.Idrek })
                    .HasName("UC_STSDETB")
                    .IsUnique();

                entity.Property(e => e.Idstsdetb).HasColumnName("IDSTSDETB");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idsts).HasColumnName("IDSTS");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Stsdetb)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STSDETB_JTRLNKAS");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Stsdetb)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STSDETB_DAFTREKENING");

                entity.HasOne(d => d.IdstsNavigation)
                    .WithMany(p => p.Stsdetb)
                    .HasForeignKey(d => d.Idsts)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STSDETB_STS");
            });

            modelBuilder.Entity<Stsdetd>(entity =>
            {
                entity.HasKey(e => e.Idstsdetd);

                entity.ToTable("STSDETD");

                entity.HasIndex(e => new { e.Idsts, e.Idrek })
                    .HasName("UC_STSDETD")
                    .IsUnique();

                entity.Property(e => e.Idstsdetd).HasColumnName("IDSTSDETD");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idsts).HasColumnName("IDSTS");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Stsdetd)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STSDETD_JTRNKAS");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Stsdetd)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STSDETD_DAFTREKENING");

                entity.HasOne(d => d.IdstsNavigation)
                    .WithMany(p => p.Stsdetd)
                    .HasForeignKey(d => d.Idsts)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STSDETD_STS");
            });

            modelBuilder.Entity<Stsdetr>(entity =>
            {
                entity.HasKey(e => e.Idstsdetr);

                entity.ToTable("STSDETR");

                entity.HasIndex(e => new { e.Idsts, e.Idrek, e.Idkeg })
                    .HasName("UC_STSDETR")
                    .IsUnique();

                entity.Property(e => e.Idstsdetr).HasColumnName("IDSTSDETR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idsts).HasColumnName("IDSTS");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdkegNavigation)
                    .WithMany(p => p.Stsdetr)
                    .HasForeignKey(d => d.Idkeg)
                    .HasConstraintName("FK_STSDETR_MKEGIATAN");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Stsdetr)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STSDETR_JTRLNKAS");

                entity.HasOne(d => d.IdstsNavigation)
                    .WithMany(p => p.Stsdetr)
                    .HasForeignKey(d => d.Idsts)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STSDETR_STS");
            });

            modelBuilder.Entity<Stsdett>(entity =>
            {
                entity.HasKey(e => e.Idstsdett);

                entity.ToTable("STSDETT");

                entity.HasIndex(e => new { e.Idsts, e.Nobbantu })
                    .HasName("UC_STSDETT")
                    .IsUnique();

                entity.Property(e => e.Idstsdett).HasColumnName("IDSTSDETT");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idsts).HasColumnName("IDSTS");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.Property(e => e.Nobbantu)
                    .IsRequired()
                    .HasColumnName("NOBBANTU")
                    .HasMaxLength(10);

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Stsdett)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STSDETT_JTRNLKAS");

                entity.HasOne(d => d.IdstsNavigation)
                    .WithMany(p => p.Stsdett)
                    .HasForeignKey(d => d.Idsts)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STSDETT_STS");

                entity.HasOne(d => d.NobbantuNavigation)
                    .WithMany(p => p.Stsdett)
                    .HasForeignKey(d => d.Nobbantu)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_STSDETT_BKBKAS");
            });

            modelBuilder.Entity<Tagihan>(entity =>
            {
                entity.HasKey(e => e.Idtagihan);

                entity.ToTable("TAGIHAN");

                entity.HasIndex(e => new { e.Idunit, e.Idkontrak, e.Notagihan })
                    .HasName("UC1_TAGIHAN")
                    .IsUnique();

                entity.Property(e => e.Idtagihan).HasColumnName("IDTAGIHAN");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idkontrak).HasColumnName("IDKONTRAK");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Kdstatus)
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Notagihan)
                    .IsRequired()
                    .HasColumnName("NOTAGIHAN")
                    .HasMaxLength(100);

                entity.Property(e => e.Bulan)
                   .IsRequired()
                   .HasColumnName("BULAN")
                   .HasMaxLength(20);

                entity.Property(e => e.Idbulan).HasColumnName("IDBULAN");

                entity.Property(e => e.Nofaktur)
                   .IsRequired()
                   .HasColumnName("NOFAKTUR")
                   .HasMaxLength(100);

                entity.Property(e => e.Nilaippn)
                     .HasColumnName("NILAIPPN")
                     .HasColumnType("money");

                entity.Property(e => e.Tgltagihan)
                    .HasColumnName("TGLTAGIHAN")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraiantagihan)
                    .HasColumnName("URAIANTAGIHAN")
                    .HasMaxLength(512);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdkontrakNavigation)
                    .WithMany(p => p.Tagihan)
                    .HasForeignKey(d => d.Idkontrak)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TAGIHAN_KONTRAK");
            });

            modelBuilder.Entity<Tagihandet>(entity =>
            {
                entity.HasKey(e => e.Idtagihandet);

                entity.ToTable("TAGIHANDET");

                entity.HasIndex(e => new { e.Idtagihan, e.Idrek })
                    .HasName("UC_TAGIHANDET")
                    .IsUnique();

                entity.Property(e => e.Idtagihandet).HasColumnName("IDTAGIHANDET");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idtagihan).HasColumnName("IDTAGIHAN");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Tagihandet)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TAGIHANDET_DAFTREKENING");

                entity.HasOne(d => d.IdtagihanNavigation)
                    .WithMany(p => p.Tagihandet)
                    .HasForeignKey(d => d.Idtagihan)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TAGIHANDET_TAGIHAN");
            });

            modelBuilder.Entity<Tahap>(entity =>
            {
                entity.HasKey(e => e.Kdtahap)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("TAHAP");

                entity.Property(e => e.Kdtahap)
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(5)
                    .ValueGeneratedNever();

                entity.Property(e => e.EndDate)
                    .HasColumnName("END_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Ket)
                    .HasColumnName("KET")
                    .HasMaxLength(512);

                entity.Property(e => e.Lock).HasColumnName("LOCK");

                entity.Property(e => e.Nmtahap)
                    .HasColumnName("NMTAHAP")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StartDate)
                    .HasColumnName("START_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tgltransfer)
                    .HasColumnName("TGLTRANSFER")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraian)
                    .IsRequired()
                    .HasColumnName("URAIAN")
                    .HasMaxLength(512);
            });

            modelBuilder.Entity<Tahapsah>(entity =>
            {
                entity.HasKey(e => new { e.Kdtahap, e.Kddoksah });

                entity.ToTable("TAHAPSAH");

                entity.Property(e => e.Kdtahap)
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(5);

                entity.Property(e => e.Kddoksah)
                    .HasColumnName("KDDOKSAH")
                    .HasMaxLength(3);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Nosah)
                    .IsRequired()
                    .HasColumnName("NOSAH")
                    .HasMaxLength(50);

                entity.Property(e => e.Tglsah)
                    .HasColumnName("TGLSAH")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.KddoksahNavigation)
                    .WithMany(p => p.Tahapsah)
                    .HasForeignKey(d => d.Kddoksah)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TAHAPSAH_DOKSAH");
            });

            modelBuilder.Entity<Tahun>(entity =>
            {
                entity.HasKey(e => e.Kdtahun);

                entity.ToTable("TAHUN");

                entity.Property(e => e.Kdtahun)
                    .HasColumnName("KDTAHUN")
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Nmtahun)
                    .IsRequired()
                    .HasColumnName("NMTAHUN")
                    .HasMaxLength(4)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Tbp>(entity =>
            {
                entity.HasKey(e => e.Idtbp)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("TBP");

                entity.HasIndex(e => new { e.Idunit, e.Notbp })
                    .HasName("UC_TBP")
                    .IsUnique();

                entity.Property(e => e.Idtbp).HasColumnName("IDTBP");

                entity.Property(e => e.Alamat)
                    .HasColumnName("ALAMAT")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend1).HasColumnName("IDBEND1");

                entity.Property(e => e.Idbend2).HasColumnName("IDBEND2");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdstatus)
                    .IsRequired()
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Ketvalid)
                    .HasColumnName("KETVALID")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.Property(e => e.Notbp)
                    .IsRequired()
                    .HasColumnName("NOTBP")
                    .HasMaxLength(50);

                entity.Property(e => e.Penyetor)
                    .HasColumnName("PENYETOR")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Tgltbp)
                    .HasColumnName("TGLTBP")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraitbp)
                    .HasColumnName("URAITBP")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.Property(e => e.Valid).HasColumnName("VALID");

                entity.Property(e => e.Validby)
                    .HasColumnName("VALIDBY")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Idbend1Navigation)
                    .WithMany(p => p.TbpIdbend1Navigation)
                    .HasForeignKey(d => d.Idbend1)
                    .HasConstraintName("FK_TBP_BEND1");

                entity.HasOne(d => d.Idbend2Navigation)
                    .WithMany(p => p.TbpIdbend2Navigation)
                    .HasForeignKey(d => d.Idbend2)
                    .HasConstraintName("FK_TBP_BEND2");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Tbp)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBP_DAFTUNIT");

                entity.HasOne(d => d.KdstatusNavigation)
                    .WithMany(p => p.Tbp)
                    .HasForeignKey(d => d.Kdstatus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBP_STATTRS");
            });

            modelBuilder.Entity<Tbpdetb>(entity =>
            {
                entity.HasKey(e => e.Idtbpdetb);

                entity.ToTable("TBPDETB");

                entity.HasIndex(e => new { e.Idtbp, e.Idrek, e.Idnojetra })
                    .HasName("UC_TBPDETB")
                    .IsUnique();

                entity.Property(e => e.Idtbpdetb).HasColumnName("IDTBPDETB");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idtbp).HasColumnName("IDTBP");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Tbpdetb)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETB_JTRNLKAS");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Tbpdetb)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETB_DAFTREKENING");

                entity.HasOne(d => d.IdtbpNavigation)
                    .WithMany(p => p.Tbpdetb)
                    .HasForeignKey(d => d.Idtbp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETB_TBP");
            });

            modelBuilder.Entity<Tbpdetd>(entity =>
            {
                entity.HasKey(e => e.Idtbpdetd);

                entity.ToTable("TBPDETD");

                entity.HasIndex(e => new { e.Idtbp, e.Idrek, e.Idnojetra })
                    .HasName("UC_TBPDETD")
                    .IsUnique();

                entity.Property(e => e.Idtbpdetd).HasColumnName("IDTBPDETD");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idtbp).HasColumnName("IDTBP");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Tbpdetd)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETD_JTRNLKAS");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Tbpdetd)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETD_DAFTREKENING");

                entity.HasOne(d => d.IdtbpNavigation)
                    .WithMany(p => p.Tbpdetd)
                    .HasForeignKey(d => d.Idtbp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETD_TBP");
            });

            modelBuilder.Entity<Tbpdetr>(entity =>
            {
                entity.HasKey(e => e.Idtbpdetr);

                entity.ToTable("TBPDETR");

                entity.HasIndex(e => new { e.Idtbp, e.Idrek, e.Idkeg, e.Idnojetra })
                    .HasName("UC_TBPDETR")
                    .IsUnique();

                entity.Property(e => e.Idtbpdetr).HasColumnName("IDTBPDETR");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idrek).HasColumnName("IDREK");

                entity.Property(e => e.Idtbp).HasColumnName("IDTBP");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdkegNavigation)
                    .WithMany(p => p.Tbpdetr)
                    .HasForeignKey(d => d.Idkeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETR_MKEGIATAN");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Tbpdetr)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETR_JTRNLKAS");

                entity.HasOne(d => d.IdrekNavigation)
                    .WithMany(p => p.Tbpdetr)
                    .HasForeignKey(d => d.Idrek)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETR_DAFTREKENING");

                entity.HasOne(d => d.IdtbpNavigation)
                    .WithMany(p => p.Tbpdetr)
                    .HasForeignKey(d => d.Idtbp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETR_TBP");
            });

            modelBuilder.Entity<Tbpdett>(entity =>
            {
                entity.HasKey(e => e.Idtbpdett);

                entity.ToTable("TBPDETT");

                entity.HasIndex(e => new { e.Idtbp, e.Idbend, e.Idnojetra })
                    .HasName("UC_TBPDETT")
                    .IsUnique();

                entity.Property(e => e.Idtbpdett).HasColumnName("IDTBPDETT");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idtbp).HasColumnName("IDTBP");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Tbpdett)
                    .HasForeignKey(d => d.Idbend)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETT_BEND");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Tbpdett)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETT_JTRNLKAS");

                entity.HasOne(d => d.IdtbpNavigation)
                    .WithMany(p => p.Tbpdett)
                    .HasForeignKey(d => d.Idtbp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETT_TBP");
            });

            modelBuilder.Entity<Tbpdettkeg>(entity =>
            {
                entity.HasKey(e => e.Idtbpdettkeg);

                entity.ToTable("TBPDETTKEG");

                entity.Property(e => e.Idtbpdettkeg).HasColumnName("IDTBPDETTKEG");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idtbpdett).HasColumnName("IDTBPDETT");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdkegNavigation)
                    .WithMany(p => p.Tbpdettkeg)
                    .HasForeignKey(d => d.Idkeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETTKEG_MKEGIATAN");

                entity.HasOne(d => d.IdtbpdettNavigation)
                    .WithMany(p => p.Tbpdettkeg)
                    .HasForeignKey(d => d.Idtbpdett)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPDETTKEG_TBPDETT");
            });

            modelBuilder.Entity<Tbpl>(entity =>
            {
                entity.HasKey(e => e.Idtbpl);

                entity.ToTable("TBPL");

                entity.HasIndex(e => new { e.Notbpl, e.Idunit })
                    .HasName("UC_TBPL")
                    .IsUnique();

                entity.Property(e => e.Idtbpl).HasColumnName("IDTBPL");

                entity.Property(e => e.Alamat)
                    .HasColumnName("ALAMAT")
                    .HasMaxLength(200);

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idxkode).HasColumnName("IDXKODE");

                entity.Property(e => e.Kdrilis).HasColumnName("KDRILIS");

                entity.Property(e => e.Kdstatus)
                    .IsRequired()
                    .HasColumnName("KDSTATUS")
                    .HasMaxLength(3);

                entity.Property(e => e.Notbpl)
                    .IsRequired()
                    .HasColumnName("NOTBPL")
                    .HasMaxLength(100);

                entity.Property(e => e.Penyetor)
                    .HasColumnName("PENYETOR")
                    .HasMaxLength(100);

                entity.Property(e => e.Stcair)
                    .HasColumnName("STCAIR")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Stkirim)
                    .HasColumnName("STKIRIM")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Tgltbpl)
                    .HasColumnName("TGLTBPL")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tglvalid)
                    .HasColumnName("TGLVALID")
                    .HasColumnType("datetime");

                entity.Property(e => e.Uraitbpl)
                    .HasColumnName("URAITBPL")
                    .HasMaxLength(254);

                entity.HasOne(d => d.IdbendNavigation)
                    .WithMany(p => p.Tbpl)
                    .HasForeignKey(d => d.Idbend)
                    .HasConstraintName("FK_TBPL_BEND");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Tbpl)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPL_UNIT");

                entity.HasOne(d => d.IdxkodeNavigation)
                    .WithMany(p => p.Tbpl)
                    .HasForeignKey(d => d.Idxkode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPL_ZKODE");

                entity.HasOne(d => d.StcairNavigation)
                    .WithMany(p => p.Tbpl)
                    .HasForeignKey(d => d.Stcair)
                    .HasConstraintName("FK_TBPL_JCAIR");

                entity.HasOne(d => d.StkirimNavigation)
                    .WithMany(p => p.Tbpl)
                    .HasForeignKey(d => d.Stkirim)
                    .HasConstraintName("FK_TBPL_KIRIM");
            });

            modelBuilder.Entity<Tbpldet>(entity =>
            {
                entity.HasKey(e => e.Idtbpldet);

                entity.ToTable("TBPLDET");

                entity.HasIndex(e => new { e.Idtbpl, e.Idbend })
                    .HasName("UC_TBPDET")
                    .IsUnique();

                entity.Property(e => e.Idtbpldet).HasColumnName("IDTBPLDET");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idbend).HasColumnName("IDBEND");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idtbpl).HasColumnName("IDTBPL");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Tbpldet)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPLDET_NOJETRA");

                entity.HasOne(d => d.IdtbplNavigation)
                    .WithMany(p => p.Tbpldet)
                    .HasForeignKey(d => d.Idtbpl)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPLDET_TBPL");
            });

            modelBuilder.Entity<Tbpldetkeg>(entity =>
            {
                entity.HasKey(e => e.Idtbpldetkeg);

                entity.ToTable("TBPLDETKEG");

                entity.HasIndex(e => new { e.Idtbpldet, e.Idkeg })
                    .HasName("UC_TBPDETKEG")
                    .IsUnique();

                entity.Property(e => e.Idtbpldetkeg).HasColumnName("IDTBPLDETKEG");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Idnojetra).HasColumnName("IDNOJETRA");

                entity.Property(e => e.Idtbpldet).HasColumnName("IDTBPLDET");

                entity.Property(e => e.Nilai)
                    .HasColumnName("NILAI")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdnojetraNavigation)
                    .WithMany(p => p.Tbpldetkeg)
                    .HasForeignKey(d => d.Idnojetra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPLDETKEG_JTRLNKAS");

                entity.HasOne(d => d.IdtbpldetNavigation)
                    .WithMany(p => p.Tbpldetkeg)
                    .HasForeignKey(d => d.Idtbpldet)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPLDETKEG_TBPLDET");
            });

            modelBuilder.Entity<Tbpsts>(entity =>
            {
                entity.HasKey(e => e.Idtbp);

                entity.ToTable("TBPSTS");

                entity.Property(e => e.Idtbp)
                    .HasColumnName("IDTBP")
                    .ValueGeneratedNever();

                entity.Property(e => e.Idsts).HasColumnName("IDSTS");

                entity.HasOne(d => d.IdstsNavigation)
                    .WithMany(p => p.Tbpsts)
                    .HasForeignKey(d => d.Idsts)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPSTS_STS");

                entity.HasOne(d => d.IdtbpNavigation)
                    .WithOne(p => p.Tbpsts)
                    .HasForeignKey<Tbpsts>(d => d.Idtbp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TBPSTS_TBP");
            });

            modelBuilder.Entity<Urusanunit>(entity =>
            {
                entity.HasKey(e => new { e.Idunit, e.Idurus });

                entity.ToTable("URUSANUNIT");

                entity.HasIndex(e => new { e.Idunit, e.Idurus })
                    .HasName("UC_URUSANUNIT")
                    .IsUnique();

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Idurus).HasColumnName("IDURUS");

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idurusanunit)
                    .HasColumnName("IDURUSANUNIT")
                    .ValueGeneratedOnAdd();

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Urusanunit)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_URUSANUNIT_DAFTUNIT");

                entity.HasOne(d => d.IdurusNavigation)
                    .WithMany(p => p.Urusanunit)
                    .HasForeignKey(d => d.Idurus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_URUSANUNIT_DAFTURUS1");
            });

            modelBuilder.Entity<Userkegiatan>(entity =>
            {
                entity.HasKey(e => new { e.Userid, e.Idkeg });

                entity.ToTable("USERKEGIATAN");

                entity.Property(e => e.Userid)
                    .HasColumnName("USERID")
                    .HasMaxLength(50);

                entity.Property(e => e.Idkeg).HasColumnName("IDKEG");

                entity.Property(e => e.Assignby)
                    .HasColumnName("ASSIGNBY")
                    .HasMaxLength(50);

                entity.Property(e => e.Assigndate)
                    .HasColumnName("ASSIGNDATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdkegNavigation)
                    .WithMany(p => p.Userkegiatan)
                    .HasForeignKey(d => d.Idkeg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_USERKEGUNIT_MKEGIATAN");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Userkegiatan)
                    .HasForeignKey(d => d.Userid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_USERKEGIATAN_WEBUSER");
            });

            modelBuilder.Entity<Userskpd>(entity =>
            {
                entity.HasKey(e => new { e.Userid, e.Idunit });

                entity.ToTable("USERSKPD");

                entity.Property(e => e.Userid)
                    .HasColumnName("USERID")
                    .HasMaxLength(50);

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.LastBy)
                    .HasColumnName("LAST_BY")
                    .HasMaxLength(64);

                entity.Property(e => e.LastDate)
                    .HasColumnName("LAST_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Status).HasColumnName("STATUS");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Userskpd)
                    .HasForeignKey(d => d.Idunit)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_USERSKPD_DAFTUNIT");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Userskpd)
                    .HasForeignKey(d => d.Userid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_USERSKPD_WEBUSER");
            });

            modelBuilder.Entity<Webapp>(entity =>
            {
                entity.HasKey(e => e.Idapp);

                entity.ToTable("WEBAPP");

                entity.Property(e => e.Idapp).HasColumnName("IDAPP");

                entity.Property(e => e.Nmapp).HasColumnName("NMAPP");

                entity.Property(e => e.Produkid).HasColumnName("PRODUKID");

                entity.Property(e => e.Serialkey).HasColumnName("SERIALKEY");
            });

            modelBuilder.Entity<Webgroup>(entity =>
            {
                entity.HasKey(e => e.Groupid)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("WEBGROUP");

                entity.Property(e => e.Groupid)
                    .HasColumnName("GROUPID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Kdgroup)
                    .HasColumnName("KDGROUP")
                    .HasMaxLength(30);

                entity.Property(e => e.Ket)
                    .HasColumnName("KET")
                    .HasMaxLength(100);

                entity.Property(e => e.Nmgroup)
                    .HasColumnName("NMGROUP")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Webotor>(entity =>
            {
                entity.HasKey(e => new { e.Groupid, e.Roleid })
                    .ForSqlServerIsClustered(false);

                entity.ToTable("WEBOTOR");

                entity.Property(e => e.Groupid).HasColumnName("GROUPID");

                entity.Property(e => e.Roleid)
                    .HasColumnName("ROLEID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Webotor)
                    .HasForeignKey(d => d.Groupid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WEBOTOR_WEBGROUP");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Webotor)
                    .HasForeignKey(d => d.Roleid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WEBOTOR_WEBROLE");
            });

            modelBuilder.Entity<Webrole>(entity =>
            {
                entity.HasKey(e => e.Roleid);

                entity.ToTable("WEBROLE");

                entity.HasIndex(e => e.Roleid)
                    .HasName("IX_WEBROLE");

                entity.Property(e => e.Roleid)
                    .HasColumnName("ROLEID")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Bantuan)
                    .HasColumnName("BANTUAN")
                    .HasColumnType("text");

                entity.Property(e => e.Icon)
                    .HasColumnName("ICON")
                    .HasMaxLength(255);

                entity.Property(e => e.Idapp).HasColumnName("IDAPP");

                entity.Property(e => e.Kdlevel).HasColumnName("KDLEVEL");

                entity.Property(e => e.Link)
                    .HasColumnName("LINK")
                    .HasMaxLength(255);

                entity.Property(e => e.Menuid)
                    .HasColumnName("MENUID")
                    .HasMaxLength(50);

                entity.Property(e => e.Parentid)
                    .HasColumnName("PARENTID")
                    .HasMaxLength(50);

                entity.Property(e => e.Role)
                    .HasColumnName("ROLE")
                    .HasMaxLength(254);

                entity.Property(e => e.Show).HasColumnName("SHOW");

                entity.Property(e => e.Type)
                    .HasColumnName("TYPE")
                    .HasMaxLength(2);

                entity.HasOne(d => d.IdappNavigation)
                    .WithMany(p => p.Webrole)
                    .HasForeignKey(d => d.Idapp)
                    .HasConstraintName("FK_WEBROLE_WEBAPP");
            });

            modelBuilder.Entity<Webset>(entity =>
            {
                entity.HasKey(e => e.Kdset)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("WEBSET");

                entity.Property(e => e.Kdset)
                    .HasColumnName("KDSET")
                    .HasMaxLength(10)
                    .ValueGeneratedNever();

                entity.Property(e => e.Datecreate)
                    .HasColumnName("DATECREATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dateupdate)
                    .HasColumnName("DATEUPDATE")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Idwebset)
                    .HasColumnName("IDWEBSET")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Modeentry).HasColumnName("MODEENTRY");

                entity.Property(e => e.Valdesc)
                    .HasColumnName("VALDESC")
                    .HasMaxLength(200);

                entity.Property(e => e.Vallist)
                    .HasColumnName("VALLIST")
                    .HasMaxLength(200);

                entity.Property(e => e.Valset)
                    .HasColumnName("VALSET")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Webuser>(entity =>
            {
                entity.HasKey(e => e.Userid)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("WEBUSER");

                entity.Property(e => e.Userid)
                    .HasColumnName("USERID")
                    .HasMaxLength(50)
                    .ValueGeneratedNever();

                entity.Property(e => e.Authorizedby)
                    .HasColumnName("AUTHORIZEDBY")
                    .HasMaxLength(255);

                entity.Property(e => e.Authorizeddate)
                    .HasColumnName("AUTHORIZEDDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Blokid)
                    .HasColumnName("BLOKID")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Email)
                    .HasColumnName("EMAIL")
                    .HasMaxLength(50);

                entity.Property(e => e.Groupid).HasColumnName("GROUPID");

                entity.Property(e => e.Idpeg).HasColumnName("IDPEG");

                entity.Property(e => e.Idunit).HasColumnName("IDUNIT");

                entity.Property(e => e.Isauthorized).HasColumnName("ISAUTHORIZED");

                entity.Property(e => e.Kdtahap)
                    .IsRequired()
                    .HasColumnName("KDTAHAP")
                    .HasMaxLength(5);

                entity.Property(e => e.Ket)
                    .HasColumnName("KET")
                    .HasMaxLength(500);

                entity.Property(e => e.Nama)
                    .HasColumnName("NAMA")
                    .HasMaxLength(100);

                entity.Property(e => e.Pwd).HasColumnName("PWD");

                entity.Property(e => e.Staproval).HasColumnName("STAPROVAL");

                entity.Property(e => e.Stchecker).HasColumnName("STCHECKER");

                entity.Property(e => e.Stdelete)
                    .HasColumnName("STDELETE")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Stinsert)
                    .HasColumnName("STINSERT")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Stlegitimator).HasColumnName("STLEGITIMATOR");

                entity.Property(e => e.Stmaker).HasColumnName("STMAKER");

                entity.Property(e => e.Stupdate)
                    .HasColumnName("STUPDATE")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Transecure)
                    .HasColumnName("TRANSECURE")
                    .HasDefaultValueSql("((1))");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Webuser)
                    .HasForeignKey(d => d.Groupid)
                    .HasConstraintName("FK_WEBUSER_WEBGROUP");

                entity.HasOne(d => d.IdpegNavigation)
                    .WithMany(p => p.Webuser)
                    .HasForeignKey(d => d.Idpeg)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_WEBUSER_PEGAWAI");

                entity.HasOne(d => d.IdunitNavigation)
                    .WithMany(p => p.Webuser)
                    .HasForeignKey(d => d.Idunit)
                    .HasConstraintName("FK_WEBUSER_DAFTUNIT");
            });

            modelBuilder.Entity<Zkode>(entity =>
            {
                entity.HasKey(e => e.Idxkode)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("ZKODE");

                entity.Property(e => e.Idxkode)
                    .HasColumnName("IDXKODE")
                    .ValueGeneratedNever();

                entity.Property(e => e.Uraian)
                    .IsRequired()
                    .HasColumnName("URAIAN")
                    .HasMaxLength(254);
            });
        }
    }
}
