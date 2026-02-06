import { ProgramkegiatanComponent } from './data-master/programkegiatan/programkegiatan.component';
import { UnitorganisasiComponent } from './data-master/unitorganisasi/unitorganisasi.component';
import { DpaPerubahanRingkasanComponent } from './dpa-perubahan/dpa-perubahan-ringkasan/dpa-perubahan-ringkasan.component';
import { DpaPerubahanPendapatanComponent } from './dpa-perubahan/dpa-perubahan-pendapatan/dpa-perubahan-pendapatan.component';
import { RkaPerubahanPembiayaanComponent } from './rka-perubahan/rka-perubahan-pembiayaan/rka-perubahan-pembiayaan.component';
import { RkaPerubahanRincianComponent } from './rka-perubahan/rka-perubahan-rincian/rka-perubahan-rincian.component';
import { RkaPerubahanBelanjaComponent } from './rka-perubahan/rka-perubahan-belanja/rka-perubahan-belanja.component';
import { RkaPerubahanPendapatanComponent } from './rka-perubahan/rka-perubahan-pendapatan/rka-perubahan-pendapatan.component';
import { RkaPerubahanRingkasanComponent } from './rka-perubahan/rka-perubahan-ringkasan/rka-perubahan-ringkasan.component';
import { BkubendpenerimaanKasComponent } from './bku-penerimaan/bkubendpenerimaan-kas/bkubendpenerimaan-kas.component';
import { SpjfungPengeluaranComponent } from './spj-pengeluaran/spjfung-pengeluaran/spjfung-pengeluaran.component';
import { RekonPenerimaanComponent } from './lpj-penerimaan/rekon-penerimaan/rekon-penerimaan.component';
import { LapPenerimaanComponent } from './lpj-penerimaan/lap-penerimaan/lap-penerimaan.component';
import { LpjTerimaSetorComponent } from './lpj-penerimaan/lpj-terima-setor/lpj-terima-setor.component';
import { LpjPenerimaanComponent } from './lpj-penerimaan/lpj-penerimaan/lpj-penerimaan.component';
import { BkubendPenerimaanComponent } from './bku-penerimaan/bkubend-penerimaan/bkubend-penerimaan.component';
import { BukuTerimaSetorComponent } from './bku-penerimaan/buku-terima-setor/buku-terima-setor.component';
import { StsComponent } from './bukti-penerimaan/sts/sts.component';
import { TbpComponent } from './bukti-penerimaan/tbp/tbp.component';
import { RegisterSppdComponent } from './register/register-sppd/register-sppd.component';
import { RegisterSopdComponent } from './register/register-sopd/register-sopd.component';
import { RegisterSpdComponent } from './register/register-spd/register-spd.component';
import { RegisterSppdSopdSpdComponent } from './register/register-sppd-sopd-spd/register-sppd-sopd-spd.component';
import { RegisterBpkComponent } from './register/register-bpk/register-bpk.component';
import { RegisterTagihanComponent } from './register/register-tagihan/register-tagihan.component';
import { RegisterPanjarComponent } from './register/register-panjar/register-panjar.component';
import { RegisterFakturComponent } from './register/register-faktur/register-faktur.component';
import { Registersp2dBudComponent } from './sp2d/registersp2d-bud/registersp2d-bud.component';
import { Registersp2dTolakComponent } from './sp2d/registersp2d-tolak/registersp2d-tolak.component';
import { Sp2dTolakComponent } from './sp2d/sp2d-tolak/sp2d-tolak.component';
import { RegspmTolakComponent } from './spm/regspm-tolak/regspm-tolak.component';
import { SpmTolakComponent } from './spm/spm-tolak/spm-tolak.component';
import { SpmLsComponent } from './spm/spm-ls/spm-ls.component';
import { SpmUpComponent } from './spm/spm-up/spm-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { AngkasPemdaComponent } from './anggarankas/angkas-pemda/angkas-pemda.component';
import { AngkasSkpdComponent } from './anggarankas/angkas-skpd/angkas-skpd.component';
import { AngkasPendapatanComponent } from './anggarankas/angkas-pendapatan/angkas-pendapatan.component';
import { AngkasBelanjaComponent } from './anggarankas/angkas-belanja/angkas-belanja.component';
import { AngkasPembiayaanComponent } from './anggarankas/angkas-pembiayaan/angkas-pembiayaan.component';
import { AngkasPerubahanPendapatanComponent } from './anggarankas-perubahan/angkas-perubahan-pendapatan/angkas-perubahan-pendapatan.component';
import { AngkasPerubahanBelanjaComponent } from './anggarankas-perubahan/angkas-perubahan-belanja/angkas-perubahan-belanja.component';
import { AngkasPerubahanPembiayaanComponent } from './anggarankas-perubahan/angkas-perubahan-pembiayaan/angkas-perubahan-pembiayaan.component';
import { DpaBelanjaComponent } from './dpa-skpd/dpa-belanja/dpa-belanja.component';
import { DpaPembiayaanComponent } from './dpa-skpd/dpa-pembiayaan/dpa-pembiayaan.component';
import { DpaPendapatanComponent } from './dpa-skpd/dpa-pendapatan/dpa-pendapatan.component';
import { DpaRincianComponent } from './dpa-skpd/dpa-rincian/dpa-rincian.component';
import { DpaPerkegiatanComponent } from './dpa-skpd/dpa-perkegiatan/dpa-perkegiatan.component';
import { DpaRingkasanComponent } from './dpa-skpd/dpa-ringkasan/dpa-ringkasan.component';
import { DpaskpdComponent } from './dpa-skpd/dpaskpd/dpaskpd.component';
import { PersetujuanDpaComponent } from './dpa-skpd/persetujuan-dpa/persetujuan-dpa.component';
import { SpdDokComponent } from './spd/spd-dok/spd-dok.component';
import { BpkComponent } from './Bpk/bpk/bpk.component';
import { SpdLampComponent } from './spd/spd-lamp/spd-lamp.component';
import { SPPGUComponent } from './SPP/spp-gu/spp-gu.component';
import { SppLsbjComponent } from './SPP/spp-lsbj/spp-lsbj.component';
import { SppLsgjComponent } from './SPP/spp-lsgj/spp-lsgj.component';
import { SppLsp3Component } from './SPP/spp-lsp3/spp-lsp3.component';
import { SPPTUComponent } from './SPP/spp-tu/spp-tu.component';
import { SppTurencanaComponent } from './SPP/spp-turencana/spp-turencana.component';
import { SPPUPComponent } from './SPP/spp-up/spp-up.component';
import { SpmGuComponent } from './spm/spm-gu/spm-gu.component';
import { SpmTuComponent } from './spm/spm-tu/spm-tu.component';
import { Sp2dComponent } from './sp2d/sp2d/sp2d.component';
import { SpdComponent } from './sp2d/s-pd/s-pd.component';
import { SopdComponent } from './spm/s-opd/s-opd.component';
import { SppdComponent } from './SPP/s-ppd/s-ppd.component';
import { RegistersppSpmSp2dComponent } from './sp2d/registerspp-spm-sp2d/registerspp-spm-sp2d.component';
import { BkubendPengeluaranComponent } from './bku/bkubend-pengeluaran/bkubend-pengeluaran.component';
import { BkubendBankComponent } from './bku/bkubend-bank/bkubend-bank.component';
import { BkubendKasComponent } from './bku/bkubend-kas/bkubend-kas.component';
import { BkubendPajakComponent } from './bku/bkubend-pajak/bkubend-pajak.component';
import { BkubendPajakPerjenisComponent } from './bku/bkubend-pajak-perjenis/bkubend-pajak-perjenis.component';
import { BkubendPanjarComponent } from './bku/bkubend-panjar/bkubend-panjar.component';
import { BkubendSubrincianComponent } from './bku/bkubend-subrincian/bkubend-subrincian.component';
import { KartukendaliSubkegiatanComponent } from './bku/kartukendali-subkegiatan/kartukendali-subkegiatan.component';
import { RegistertbpComponent } from './bukti-penerimaan/registertbp/registertbp.component';
import { RegisterstsComponent } from './bukti-penerimaan/registersts/registersts.component';
import { RegisterskpComponent } from './bukti-penerimaan/registerskp/registerskp.component';
import { BkubendpenerimaanSubrinciComponent } from './bku-penerimaan/bkubendpenerimaan-subrinci/bkubendpenerimaan-subrinci.component';
import { BkuBudComponent } from './bud/bku-bud/bku-bud.component';
import { LookPhk3Component } from 'src/app/shared/lookups/look-phk3/look-phk3.component';
import { LpkhComponent } from './bud/lpkh/lpkh.component';
import { SpTuComponent } from './bud/sp-tu/sp-tu.component';
import { SpjadmPengeluaranComponent } from './spj-pengeluaran/spjadm-pengeluaran/spjadm-pengeluaran.component';
import { LaptutupkasComponent } from './lpj-pengeluaran/laptutupkas/laptutupkas.component';
import { DthPajakComponent } from './lpj-pengeluaran/dth-pajak/dth-pajak/dth-pajak.component';
import { LpjTuComponent } from './lpj-pengeluaran/lpj-tu/lpj-tu.component';
import { LpjUpComponent } from './lpj-pengeluaran/lpj-up/lpj-up.component';
import { NotakreditComponent } from './bukti-penerimaan/notakredit/notakredit.component';
import { NotapencairandanaComponent } from './pengajuanbelanja/notapencairandana/notapencairandana.component';
import { RkaRingkasanComponent } from './rka/rka-ringkasan/rka-ringkasan.component';
import { RkaPendapatanComponent } from './rka/rka-pendapatan/rka-pendapatan.component';
import { RkaBelanjaComponent } from './rka/rka-belanja/rka-belanja.component';
import { RkaRincianComponent } from './rka/rka-rincian/rka-rincian.component';
import { RkaPembiayaanComponent } from './rka/rka-pembiayaan/rka-pembiayaan.component';
import { ApbdringkasanComponent } from './apbd/apbdringkasan/apbdringkasan.component';
import { ApbdringkasanUrusComponent } from './apbd/apbdringkasan-urus/apbdringkasan-urus.component';
import { ApbdrincianComponent } from './apbd/apbdrincian/apbdrincian.component';
import { PenjabaranRingkasanComponent } from './apbd/penjabaran-ringkasan/penjabaran-ringkasan.component';
import { PenjabaranRincianComponent } from './apbd/penjabaran-rincian/penjabaran-rincian.component';
import { BkubendpenerimaanBankComponent } from './bku-penerimaan/bkubendpenerimaan-bank/bkubendpenerimaan-bank.component';
import { PersetujuanDpapComponent } from './dpa-perubahan/persetujuan-dpap/persetujuan-dpap.component';
import { DpapskpdPerubahanComponent } from './dpa-perubahan/dpapskpd-perubahan/dpapskpd-perubahan.component';
import { DpaPerubahanBelanjaComponent } from './dpa-perubahan/dpa-perubahan-belanja/dpa-perubahan-belanja.component';
import { DpaPerubahanPerkegiatanComponent } from './dpa-perubahan/dpa-perubahan-perkegiatan/dpa-perubahan-perkegiatan.component';
import { DpaPerubahanRincianbelanjaComponent } from './dpa-perubahan/dpa-perubahan-rincianbelanja/dpa-perubahan-rincianbelanja.component';
import { DpaPerubahanPembiayaanComponent } from './dpa-perubahan/dpa-perubahan-pembiayaan/dpa-perubahan-pembiayaan.component';
import { ApbdringkasanPerubahanComponent } from './apbd-perubahan/apbdringkasan-perubahan/apbdringkasan-perubahan.component';
import { ApbdringurusPerubahanComponent } from './apbd-perubahan/apbdringurus-perubahan/apbdringurus-perubahan.component';
import { ApbdrincianPerubahanComponent } from './apbd-perubahan/apbdrincian-perubahan/apbdrincian-perubahan.component';
import { PenjabaranRingkasanPerubahanComponent } from './apbd-perubahan/penjabaran-ringkasan-perubahan/penjabaran-ringkasan-perubahan.component';
import { PenjabaranRincianPerubahanComponent } from './apbd-perubahan/penjabaran-rincian-perubahan/penjabaran-rincian-perubahan.component';
import { RkaCoverComponent } from './rka/rka-cover/rka-cover.component';
import { RkaPerkegiatanComponent } from './rka/rka-perkegiatan/rka-perkegiatan.component';
import { RkaPerubahanPerkegiatanComponent } from './rka-perubahan/rka-perubahan-perkegiatan/rka-perubahan-perkegiatan.component';
import { RkaPerubahanCoverComponent } from './rka-perubahan/rka-perubahan-cover/rka-perubahan-cover.component';
import { RegmemorialnonkasComponent } from './akuntansi/regmemorial/regmemorialnonkas/regmemorialnonkas.component';
import { RegmemorialasetComponent } from './akuntansi/regmemorial/regmemorialaset/regmemorialaset.component';
import { JurnalskpdComponent } from './akuntansi/jurnalskpd/jurnalskpd/jurnalskpd.component';
import { BukubesarComponent } from './akuntansi/bukubesar/bukubesar.component';
import { JurnalkonsolidatorComponent } from './akuntansi/jurnalkonsolidator/jurnalkonsolidator.component';
import { NeracasaldoComponent } from './akuntansi/neracasaldoskpd/neracasaldo/neracasaldo.component';
import { NeracasaldoPenyesuaianComponent } from './akuntansi/neracasaldoskpd/neracasaldo-penyesuaian/neracasaldo-penyesuaian.component';
import { NeracasaldoSaldoakhirComponent } from './akuntansi/neracasaldoskpd/neracasaldo-saldoakhir/neracasaldo-saldoakhir.component';
import { NeracasaldoTutuplraComponent } from './akuntansi/neracasaldoskpd/neracasaldo-tutuplra/neracasaldo-tutuplra.component';
import { NeracasaldoTutuploComponent } from './akuntansi/neracasaldoskpd/neracasaldo-tutuplo/neracasaldo-tutuplo.component';
import { LraskpdComponent } from './akuntansi/laporankeuanganskpd/lraskpd/lraskpd.component';
import { LraskpdprogComponent } from './akuntansi/laporankeuanganskpd/lraskpdprog/lraskpdprog.component';
import { NeracaskpdComponent } from './akuntansi/laporankeuanganskpd/neracaskpd/neracaskpd.component';
import { LraloskpdComponent } from './akuntansi/laporankeuanganskpd/lraloskpd/lraloskpd.component';
import { LpeskpdComponent } from './akuntansi/laporankeuanganskpd/lpeskpd/lpeskpd.component';
import { SpjPenerimaanComponent } from './lpj-penerimaan/spj-penerimaan/spj-penerimaan.component';
import { Sp2tComponent } from './bendahara-bok/sp2t/sp2t.component';
import { SptjmBokComponent } from './bendahara-bok/sptjm-bok/sptjm-bok.component';
import { Sp2bBokComponent } from './bendahara-bok/sp2b-bok/sp2b-bok.component';
import { SpbBokComponent } from './bendahara-bok/spb-bok/spb-bok.component';
import { LampSpbBokComponent } from './bendahara-bok/lamp-spb-bok/lamp-spb-bok.component';
import { BarekonDanaBokComponent } from './bendahara-bok/barekon-dana-bok/barekon-dana-bok.component';
import { LampBarekonDanabokComponent } from './bendahara-bok/lamp-barekon-danabok/lamp-barekon-danabok.component';
import { BkuDanaBokComponent } from './bendahara-bok/bku-dana-bok/bku-dana-bok.component';
import { BpbankDanaBokComponent } from './bendahara-bok/bpbank-dana-bok/bpbank-dana-bok.component';
import { BpkasDanaBokComponent } from './bendahara-bok/bpkas-dana-bok/bpkas-dana-bok.component';
import { BppajakDanaBokComponent } from './bendahara-bok/bppajak-dana-bok/bppajak-dana-bok.component';
import { RealBelanjaDanabokComponent } from './bendahara-bok/real-belanja-danabok/real-belanja-danabok.component';
import { RealPendapatanDanabokComponent } from './bendahara-bok/real-pendapatan-danabok/real-pendapatan-danabok.component';
import { LpSalComponent } from './akuntansi/laporankeuanganskpd/lp-sal/lp-sal.component';
import { LpAruskasComponent } from './akuntansi/laporankeuanganskpd/lp-aruskas/lp-aruskas.component';
import { LrabludComponent } from './akuntansi/laporankeuanganskpd/lrablud/lrablud.component';
import { SptjComponent } from './akuntansi/laporankeuanganskpd/sptj/sptj.component';
import { RekananComponent } from './data-master/rekanan/rekanan.component';
import { PegawaiComponent } from './data-master/pegawai/pegawai.component';
import { PimBludComponent } from './data-master/pim-blud/pim-blud.component';
import { KasBludComponent } from './data-master/kas-blud/kas-blud.component';
import { DaftarBendaharaComponent } from './data-master/daftar-bendahara/daftar-bendahara.component';
import { BankComponent } from './data-master/bank/bank.component';
import { PpkunitComponent } from './data-master/ppkunit/ppkunit.component';
import { RekRbaComponent } from './daftar-rekening/rek-rba/rek-rba.component';
import { RekApbdComponent } from './daftar-rekening/rek-apbd/rek-apbd.component';
import { RekLoComponent } from './daftar-rekening/rek-lo/rek-lo.component';
import { RekNeracaComponent } from './daftar-rekening/rek-neraca/rek-neraca.component';
import { RekAruskasComponent } from './daftar-rekening/rek-aruskas/rek-aruskas.component';
import { MapRbaloComponent } from './mapping/map-rbalo/map-rbalo.component';
import { MapAsetutangComponent } from './mapping/map-asetutang/map-asetutang.component';
import { MapBlnjAsettpComponent } from './mapping/map-blnj-asettp/map-blnj-asettp.component';
import { MapRbaapbdComponent } from './mapping/map-rbaapbd/map-rbaapbd.component';
import { MapAruskasComponent } from './mapping/map-aruskas/map-aruskas.component';
import { MapUtangPiutangComponent } from './mapping/map-utang-piutang/map-utang-piutang.component';
import { MapPendapatanBelanjaComponent } from './mapping/map-pendapatan-belanja/map-pendapatan-belanja.component';
import { MapUtangPfkComponent } from './mapping/map-utang-pfk/map-utang-pfk.component';
import { KuaProgkegComponent } from './kua/kua-progkeg/kua-progkeg.component';
import { RekapRbaComponent } from './rekap-rba/rekap-rba/rekap-rba.component';
import { RekapSilpaComponent } from './rekap-rba/rekap-silpa/rekap-silpa.component';
import { RekapBelanjaPerkegiatanComponent } from './rekap-rba/rekap-belanja-perkegiatan/rekap-belanja-perkegiatan.component';
import { KonsolRbaComponent } from './rekap-rba/konsol-rba/konsol-rba.component';
import { RegGeserComponent } from './rba-pergeseran/reg-geser/reg-geser.component';
import { RbaBelanjaGeserComponent } from './rba-pergeseran/rba-belanja-geser/rba-belanja-geser.component';
import { KonsolLoComponent } from './akuntansi/laporan-konsol/konsol-lo/konsol-lo.component';
import { KonsolLraComponent } from './akuntansi/laporan-konsol/konsol-lra/konsol-lra.component';
import { KonsolLraDanaapbdComponent } from './akuntansi/laporan-konsol/konsol-lra-danaapbd/konsol-lra-danaapbd.component';
import { KonsolLraDanabludComponent } from './akuntansi/laporan-konsol/konsol-lra-danablud/konsol-lra-danablud.component';
import { KonsolLraDanabokComponent } from './akuntansi/laporan-konsol/konsol-lra-danabok/konsol-lra-danabok.component';
import { KonsolNeracaComponent } from './akuntansi/laporan-konsol/konsol-neraca/konsol-neraca.component';
import { RkapBokComponent } from './rkap-bok/rkap-bok/rkap-bok.component';
import {ReportSptjComponent} from 'src/app/pages/laporan/akuntansi/report-sptj/report-sptj.component';
import {ReportSp2bComponent} from 'src/app/pages/laporan/akuntansi/report-sp2b/report-sp2b.component';
import {ReportSp3bComponent} from 'src/app/pages/laporan/akuntansi/report-sp3b/report-sp3b.component';
import { RingRbageserComponent } from './rba-pergeseran/ring-rbageser/ring-rbageser.component';
import { DokBastComponent } from './Bast/dok-bast/dok-bast.component';
import { DokPanjarComponent } from './Panjar/dok-panjar/dok-panjar.component';
import { UtangRekananComponent } from './akuntansi/utang-rekanan/utang-rekanan/utang-rekanan.component';
import { BkbesarUtangrekananComponent } from './akuntansi/bkbesar-utangrekanan/bkbesar-utangrekanan/bkbesar-utangrekanan.component';
import { LraPeriodeComponent } from './akuntansi/laporankeuanganskpd/lra-periode/lra-periode/lra-periode.component';


const routes: Routes = [
	// DATA-MASTER
	{
		path: 'daftar/daftkasblud',
		component: KasBludComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Daftar Kas BLUD' }
	},
	{
		path: 'daftar/daftbend',
		component: DaftarBendaharaComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Daftar Bendahara' }
	},
	{
		path: 'daftar/daftunit',
		component: UnitorganisasiComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Unit Organisasi' }
	},
	{
		path: 'daftar/programkegiatan',
		component: ProgramkegiatanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Program Kegiatan dan Subkegiatan' }
	},
	{
		path: 'daftar/rekanan',
		component: RekananComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Rekanan' }
	},
	{
		path: 'daftar/pegawai',
		component: PegawaiComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Pegawai' }
	},
	{
		path: 'daftar/kablud',
		component: PimBludComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Pimpinan BLUD' }
	},
	{
		path: 'daftar/bank',
		component: BankComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Bank' }
	},
	{
		path: 'daftar/ppkunit',
		component: PpkunitComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Bank' }
	},
	{
		path: 'daftar-rekening/rba',
		component: RekRbaComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Rekening RBA' }
	},
	{
		path: 'daftar-rekening/apbd',
		component: RekApbdComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Rekening APBD' }
	},
	{
		path: 'daftar-rekening/lo',
		component: RekLoComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Rekening LO' }
	},
	{
		path: 'daftar-rekening/neraca',
		component: RekNeracaComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Rekening Neraca' }
	},
	{
		path: 'daftar-rekening/aruskas',
		component: RekAruskasComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Rekening Arus Kas' }
	},
	{
		path: 'mapping/maprbalo',
		component: MapRbaloComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Mapping RBA LO' }
	},
	{
		path: 'mapping/mapasetutang',
		component: MapAsetutangComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Mapping Aset Utang' }
	},
	{
		path: 'mapping/mapbljaset',
		component: MapBlnjAsettpComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Mapping Belanja Modal - Aset Tetap' }
	},
	{
		path: 'mapping/maprbaapbd',
		component: MapRbaapbdComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Mapping RBA - APBD' }
	},
	{
		path: 'mapping/mapakas',
		component: MapAruskasComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Mapping Arus Kas' }
	},
	{
		path: 'mapping/maputangpiu',
		component: MapUtangPiutangComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Mapping Utang Piutang' }
	},
	{
		path: 'mapping/mappenblj',
		component: MapPendapatanBelanjaComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Mapping Pendapatan APBD - Belanja' }
	},
	{
		path: 'mapping/maputangpfk',
		component: MapUtangPfkComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Mapping Utang - PFK' }
	},
// RBA

	{
		path: 'anggaran/kuaprokeg',
		component: KuaProgkegComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'RKA' }
	},
	{
		path: 'anggaran/coverrka',
		component: RkaCoverComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'RKA' }
	},
	{
		path: 'anggaran/rbaring',
		component: RkaRingkasanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'RBA-Ringkasan' }
	},
	{
		path: 'anggaran/rbapendapatan',
		component: RkaPendapatanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'RBA-Pendapatan' }
	},
	{
		path: 'anggaran/rbabelanja',
		component: RkaBelanjaComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'RBA-Belanja' }
	},
	{
		path: 'anggaran/rbabljkeg',
		component: RkaPerkegiatanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'RBA-Belanja Per Kegiatan' }
	},
	{
		path: 'anggaran/rbarincian',
		component: RkaRincianComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'RBA-Rincian' }
	},
	{
		path: 'anggaran/rbabiaya',
		component: RkaPembiayaanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'RBA-Pembiayaan' }
	},
// RBA Perubah
{
	path: 'anggaranp/coverrkap',
	component: RkaPerubahanCoverComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'RBA Perubahan-Cover' }
},
{
	path: 'anggaranp/rbapring',
	component: RkaPerubahanRingkasanComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'RBA Perubahan-Ringkasan' }
},
{
	path: 'anggaranp/rbappendapatan',
	component: RkaPerubahanPendapatanComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'RBA Perubahan-Pendapatan' }
},
{
	path: 'anggaranp/rbapbelanja',
	component: RkaPerubahanBelanjaComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'RBA Perubahan-Belanja' }
},
{
	path: 'anggaranp/rbaprincian',
	component: RkaPerubahanRincianComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'RBA Perubahan-Rincian' }
},
{
	path: 'anggaranp/rbapbljkeg',
	component: RkaPerubahanPerkegiatanComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'RBA Perubahan-per Kegiatan' }
},
{
	path: 'anggaranp/rbapbiaya',
	component: RkaPerubahanPembiayaanComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'RBA Perubahan-Pembiayaan' }
},

// Rekap RBA

{
	path: 'rekap-rba/rekaprba',
	component: RekapRbaComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'Rekapitulasi RBA' }
},
{
	path: 'rekap-rba/rekapsilpa',
	component: RekapSilpaComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'Rekapitulasi RBA' }
},
{
	path: 'rekap-rba/rekapbljkeg',
	component: RekapBelanjaPerkegiatanComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'Rekap Belanja per Kegiatan' }
},
{
	path: 'rekap-rba/konsolrba',
	component: KonsolRbaComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'Konsolidasi RBA' }
},
{
	path: 'rkap-bok/rkapbok',
	component: RkapBokComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'RKAP BOK' }
},
// ABPD
	{
		path: 'apbd/ringkasan',
		component: ApbdringkasanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'ABPD Ringkasan' }
	},
	{
		path: 'apbd/ringkasan-urusan',
		component: ApbdringkasanUrusComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'ABPD Ringkasan Urusan dan Organisasi' }
	},
	{
		path: 'apbd/rincian',
		component: ApbdrincianComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'ABPD Rincian' }
	},
	{
		path: 'apbd/ringkasan-penjabaran',
		component: PenjabaranRingkasanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Ringkasan Penjabaran APBD' }
	},
	{
		path: 'apbd/rincian-penjabaran',
		component: PenjabaranRincianComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Rincian Penjabaran APBD' }
	},
	// ABPD PERUBAHAN
	{
		path: 'apbdp/ringkasan',
		component: ApbdringkasanPerubahanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'ABPD Perubahan Ringkasan' }
	},
	{
		path: 'apbdp/ringkasan-urusan',
		component: ApbdringurusPerubahanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'ABPD Perubahan Ringkasan Urusan dan Organisasi' }
	},
	{
		path: 'apbdp/rincian',
		component: ApbdrincianPerubahanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'ABPD Perubahan Rincian' }
	},
	{
		path: 'apbdp/ringkasan-penjabaran',
		component: PenjabaranRingkasanPerubahanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Ringkasan Perubahan Penjabaran APBD' }
	},
	{
		path: 'apbdp/rincian-penjabaran',
		component: PenjabaranRincianPerubahanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Rincian Perubahan Penjabaran APBD' }
	},
// Pergeseran
	{
		path: 'rba-pergeseran/regrbageser',
		component: RegGeserComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register Pergeseran' }
	},
	{
		path: 'rba-pergeseran/ringrbageser',
		component: RingRbageserComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Ringkasan RBA Pergeseran' }
	},
	{
		path: 'rba-pergeseran/rbabelanjageser',
		component: RbaBelanjaGeserComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'RBA Belanja Pergeseran' }
	},
// DPA-SKPD
  	{
		path: 'anggaranskpd/dpaver',
		component: PersetujuanDpaComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Persetujuan Rekapitulasi DPA-SKPD' }
  	},
	{
		path: 'anggaranskpd/dpaskpd',
		component: DpaskpdComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'DPA-SKPD' }
  	},
  	{
		  path: 'anggaran/dbaring',
		  component: DpaRingkasanComponent,
		  canActivate: [ CanActiveGuardService ],
		  data: { setTitle: 'DBA Ringkasan' }
	},
	{
		path: 'anggaran/dbapendapatan',
		component: DpaPendapatanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'DBA Pendapatan' }
  	},
	{
		path: 'anggaran/dbabelanja',
		component: DpaBelanjaComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'DBA Belanja' }
	},
	{
		path: 'anggaran/dbarincbelanja',
		component: DpaRincianComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'DBA Rincian Belanja' }
	},
	{
		path: 'anggaran/dbabljkeg',
		component: DpaPerkegiatanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'DBA Rincian Belanja' }
	},
	{
		path: 'anggaran/dbabiaya',
		component: DpaPembiayaanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'DBA Pembiayaan' }
	},

// DPA PERUBAHAN
	{
	path: 'anggaranskpd/dppaver',
	component: PersetujuanDpapComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'Persetujuan DPPA-SKPD' }
  	},
	{
	path: 'anggaranskpd/dppaskpd',
	component: DpapskpdPerubahanComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'DPPA-SKPD' }
  	},
	{
	path: 'anggaranp/dbap',
	component: DpaPerubahanRingkasanComponent,
	canActivate: [ CanActiveGuardService ],
	data: { setTitle: 'DBAP Ringkasan' }
  	},
	{
		path: 'anggaranp/dbappend',
		component: DpaPerubahanPendapatanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'DBAP Pendapatan' }
  	},
	{
		path: 'anggaranp/dbapblj',
		component: DpaPerubahanBelanjaComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'DBAP Belanja' }
  	},
	{
		path: 'anggaranskpd/dpparincskpd',
		component: DpaPerubahanRincianbelanjaComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'DPPA Rincian Belanja-SKPD' }
  	},
	  {
		path: 'anggaranp/dbapbljkeg',
		component: DpaPerubahanPerkegiatanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'DBAP Belanja per Kegiatan' }
  	},
	{
		path: 'anggaranp/dbapbiaya',
		component: DpaPerubahanPembiayaanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'DBAP Belanja' }
  	},
// Anggaran kas
	{
		path: 'anggarankas/angkasd',
		component: AngkasPendapatanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Anggaran Kas Pendapatan' }
	},
	{
		path: 'anggarankas/angkasr',
		component: AngkasBelanjaComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Anggaran Kas Belanja' }
	},
	{
		path: 'anggarankas/angkasb',
		component: AngkasPembiayaanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Anggaran Kas Pembiayaan' }
	},
	{
		path: 'anggarankas/angkasskpd',
		component: AngkasSkpdComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Anggaran Kas SKPD' }
	},
	{
		path: 'anggarankas/angkaspemda',
		component: AngkasPemdaComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Anggaran Kas Pemda' }
	},
// Anggaran Kas Perubahan
	{
		path: 'anggarankasp/angkasdp',
		component: AngkasPerubahanPendapatanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Anggaran Kas Perubahan Pendapatan' }
	},
	{
		path: 'anggarankasp/angkasrp',
		component: AngkasPerubahanBelanjaComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Anggaran Kas Perubahan Belanja' }
	},
	{
		path: 'anggarankasp/angkasbp',
		component: AngkasPerubahanPembiayaanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Anggaran Kas Perubahan Pembiayaan' }
	},
// SPD
	{
		path: 'spd/dokspd',
		component: SpdDokComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Dokumen SPD' }
	},
	{
		path: 'spd/lampspd',
		component: SpdLampComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Lampiran SPD' }
	},

	// Register SPPD-SOPD-SPD
	{
		path: 'register/regsppd',
		component: RegisterSppdComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register S-PPD' }
	},
	{
		path: 'register/regsopd',
		component: RegisterSopdComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register S-OPD' }
	},
	{
		path: 'register/regspd',
		component: RegisterSpdComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register S-PD' }
	},
	{
		path: 'register/regsppdsopdspd',
		component: RegisterSppdSopdSpdComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register SPPD-SOPD-SPD' }
	},
	{
		path: 'register/regbpk',
		component: RegisterBpkComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register BPK' }
	},
	{
		path: 'register/regtagihan',
		component: RegisterTagihanComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register Tagihan' }
	},
	{
		path: 'register/regpanjar',
		component: RegisterPanjarComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register Panjar' }
	},
	{
		path: 'register/regfaktur',
		component: RegisterFakturComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register Faktur' }
	},
// SPP
	{
		path: 'permintaan-pembayaran/spp-up',
		component: SPPUPComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPP-UP' }
	},
	{
		path: 'permintaan-pembayaran/spp-gu',
		component: SPPGUComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPP-GU' }
	},
	{
		path: 'permintaan-pembayaran/spp-tu',
		component: SPPTUComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPP-TU' }
	},
	{
		path: 'permintaan-pembayaran/spp-ls-gaji',
		component: SppLsgjComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPP-LS Gaji dan Tunjangan' }
	},
	{
		path: 'permintaan-pembayaran/spp-ls-barang-jasa',
		component: SppLsbjComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPP-LS Barang dan Jasa' }
	},
	{
		path: 'permintaan-pembayaran/spp-ls-pihak-ketiga',
		component: SppLsp3Component,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPP-LS Pihak ketiga dan lainnya' }
	},
	{
		path: 'permintaan-pembayaran/rencana-kebutuhan-tu',
		component: SppTurencanaComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Daftar Rencana Kebutuhan TU' }
	}
	//spm
	,
	{
		path: 'perintah-membayar/spm-up',
		component: SpmUpComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPM UP' }
	},
	{
		path: 'dokumen/sopd',
		component: SopdComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'S-OPD' }
	},
	{
		path: 'dokumen/bpk',
		component: BpkComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'BPK' }
	},
	{
		path: 'dokumen/sppd',
		component: SppdComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'S-PPD' }
	},
	{
		path: 'dokumen/spd',
		component: SpdComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'S-PD' }
	},
	{
		path: 'dokumen/bast',
		component: DokBastComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'BAST' }
	},
	{
		path: 'dokumen/panjar',
		component: DokPanjarComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Panjar' }
	},
	{
		path: 'perintah-membayar/spm-tu',
		component: SpmTuComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPM TU' }
	},
	{
		path: 'perintah-membayar/spm-ls',
		component: SpmLsComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPM LS' }
	},
	{
		path: 'perintah-membayar/surat-penolakan-spm',
		component: SpmTolakComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Surat Penolakan SPM' }
	},
	{
		path: 'perintah-membayar/register-penolakan-spm',
		component: RegspmTolakComponent,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register Surat Penolakan SPM' }
	}

	//SP2D
	,
	{
		path: 'pencairan-dana/sp2d',
		component: Sp2dComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SP2D' }
	},
	{
		path: 'pencairan-dana/surat-penolakan-sp2d',
		component: Sp2dTolakComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Surat Penolakan SP2D' }
	},
	{
		path: 'pencairan-dana/register-surat-penolakan-sp2d',
		component: Registersp2dTolakComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register Surat Penolakan SP2D' }
	},
	{
		path: 'pencairan-dana/register-sp2d-kuasa-bud',
		component: Registersp2dBudComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register SP2D Kuasa BUD' }
	}
	//Buku Bendahara Pengeluaran
	,
	{
		path: 'buku-bendahara-pengeluaran/register-spp-spm-sp2d',
		component: RegistersppSpmSp2dComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register SPP SPM SP2D' }
	},
	{
		path: 'buku/bkublud',
		component: BkubendPengeluaranComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'BKU' }
	},
	{
		path: 'buku/simbank',
		component: BkubendBankComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'BP Simpanan Bank' }
	},
	{
		path: 'buku/kastunai',
		component: BkubendKasComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Buku Pembantu Kas Tunai' }
	},
	{
		path: 'buku/pajak',
		component: BkubendPajakComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Buku Pembantu pajak' }
	},
	{
		path: 'buku/pajakjenis',
		component: BkubendPajakPerjenisComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Buku Pembantu pajak' }
	},
	{
		path: 'buku/panjar',
		component: BkubendPanjarComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Buku Pembantu Panjar' }
	},
	{
		path: 'buku/sroblj',
		component: BkubendSubrincianComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Buku Pembantu per Sub Rincian Objek' }
	},
	{
		path: 'laporan/karkenkeg',
		component: KartukendaliSubkegiatanComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Kartu Kendali sub Kegiatan' }
	}
	//Bukti Penerimaan
	,
	{
		path: 'dokumen/tbp',
		component: TbpComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'T B P' }
	},
	{
		path: 'dokumen/sts',
		component: StsComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'S T S' }
	},
	{
		path: 'register/regsts',
		component: RegisterstsComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register STS' }
	},
	{
		path: 'register/regtbp',
		component: RegistertbpComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register TBP' }
	},
	{
		path: 'register/regskp',
		component: RegisterskpComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register SKP' }
	},
	{
		path: 'bendaharapenerimaan/nkb',
		component: NotakreditComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Nota Kredit Bank' }
	}
	//BKU bend Penerimaan
	,
	{
		path: 'buku/bkkasbludtr',
		component: BkubendPenerimaanComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Buku Penerimaan Kas BLUD' }
	},
	{
		path: 'buku/bktrsetor',
		component: BukuTerimaSetorComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Buku Penerimaan dan Penyetoran' }
	},
	{
		path: 'buku/sropend',
		component: BkubendpenerimaanSubrinciComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Buku SRO Pendapatan' }
	},
	{
		path: 'bendaharapenerimaan/bpbanktr',
		component: BkubendpenerimaanBankComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Buku Pembantu BANK Penerimaan' }
	},
	{
		path: 'bendaharapenerimaan/bpkastunaitr',
		component: BkubendpenerimaanKasComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Buku Pembantu Kas Tunai Penerimaan' }
	},

	//BOK
	{
		path: 'dokumen/sp2t',
		component: ReportSptjComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SP2T' }
	},
	{
		path: 'dokumen/sptjmbok',
		component: SptjmBokComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPTJM BOK' }
	},
	{
		path: 'dokumen/sp2bbok',
		component: Sp2bBokComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SP2B BOK' }
	},
	{
		path: 'dokumen/spbbok',
		component: SpbBokComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPB BOK' }
	},
	{
		path: 'dokumen/lampspbbok',
		component: LampSpbBokComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Lampiran SPB BOK' }
	},
	{
		path: 'dokumen/barekonbok',
		component: BarekonDanaBokComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'BA Rekon Dana BOK' }
	},
	{
		path: 'dokumen/lampbarekonbok',
		component: LampBarekonDanabokComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'BA Rekon Dana BOK' }
	},
	{
		path: 'buku-bok/bkubok',
		component: BkuDanaBokComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'BA Rekon Dana BOK' }
	},
	{
		path: 'buku-bok/bankdanabok',
		component: BpbankDanaBokComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'BA Rekon Dana BOK' }
	},
	{
		path: 'buku-bok/kasdanabok',
		component: BpkasDanaBokComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'BA Rekon Dana BOK' }
	},
	{
		path: 'buku-bok/pajakdanabok',
		component: BppajakDanaBokComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'BA Rekon Dana BOK' }
	},
	{
		path: 'realisasi-dana/realbljbok',
		component: RealBelanjaDanabokComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'BA Rekon Dana BOK' }
	},
	{
		path: 'realisasi-dana/realpendbok',
		component: RealPendapatanDanabokComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'BA Rekon Dana BOK' }
	},

	//BUD
	{
		path: 'pembukuan-bud/bku-bud',
		component: BkuBudComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'BKU BUD' }
	},
	{
		path: 'pembukuan-bud/laporan-posisi-kas-harian',
		component: LpkhComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Laporan Posisi Kas Harian' }
	},
	{
		path: 'pembukuan-bud/surat-persetujuan-tu',
		component: SpTuComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Laporan Surat Persetujuan TU' }
	}
	//LPJ-PENERIMAAN
	,
	{
		path: 'laporan/spjtr',
		component: SpjPenerimaanComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'LPJ Penerimaan' }
	},
	{
		path: 'laporan/lpjtr',
		component: LpjPenerimaanComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'LPJ Penerimaan' }
	},
	{
		path: 'laporan/lptrsetor',
		component: LpjTerimaSetorComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Laporan Penerimaan dan Penyetoran' }
	},
	{
		path: 'lpj-penerimaan/lpjtrkr',
		component: LapPenerimaanComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Laporan Penerimaan dan Penyetoran' }
	},

	{
		path: 'lpj-penerimaan/rekontr',
		component: RekonPenerimaanComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Rekonsiliasi Penerimaan' }
	},
	{
		path: 'laporan/lpjupkr',
		component: LpjUpComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'LPJ - UP Bendahara Pengeluaran' }
	},
	{
		path: 'pertanggungjawaban-bendahara-pengeluaran/lpj-tu',
		component: LpjTuComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'LPJ - TU' }
	},
	{
		path: 'laporan/lptutupkas',
		component: LaptutupkasComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Laporan Penutupan Kas' }
	},
	{
		path: 'laporan/dthpajak',
		component: DthPajakComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Laporan Penutupan Kas' }
	},
	{
		path: 'pertanggungjawaban-bendahara-pengeluaran/spj-administratif',
		component: SpjadmPengeluaranComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPJ Administratif' }
	},
	{
		path: 'laporan/spjkr',
		component: SpjfungPengeluaranComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPJ Bendahara Pengeluaran' }
	},
	//pengajuan belanja
	{
		path: 'pengajuan-belanja/nota-pencairan-dana',
		component: NotapencairandanaComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Nota Pencairan Dana' }
	},
	//AKUNTANSI
	//REGISTER MEMORIAL NON KAS
	{
		path: 'register-memorial/non-kas',
		component: RegmemorialnonkasComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register Bukti Memorial Non Kas' }
	},
	//REGISTER MEMORIAL ASET TETAP
	{
		path: 'register-memorial/aset-tetap',
		component: RegmemorialasetComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Register Bukti Memorial Aset Tetap' }
	},
	//JURNAL SKPD
	{
		path: 'data-pendukung/jurnal',
		component: JurnalskpdComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Jurnal SKPD LRA-LO' }
	},
	//JURNAL KONSOLIDATOR
	{
		path: 'jurnal/konsolidator',
		component: JurnalkonsolidatorComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Jurnal Konsolidator' }
	},
	//BUKU BESAR
	{
		path: 'data-pendukung/bukubesar',
		component: BukubesarComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Buku Besar' }
	},
	{
		path: 'data-pendukung/utangphk3',
		component: UtangRekananComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Utang Rekanan' }
	},
	{
		path: 'data-pendukung/bkbesarutangphk3',
		component: BkbesarUtangrekananComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Buku Besar Utang Rekanan' }
	},
	//NERACA SALDO SKPD
	{
		path: 'neraca-saldo/sblsuai',
		component: NeracasaldoComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Neraca Saldo SKPD Sebelum Penyesuaian' }
	},
	//NERACA SALDO SKPD Penyesuaian
	{
		path: 'neraca-saldo/stlsuai',
		component: NeracasaldoPenyesuaianComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Neraca Saldo SKPD Setelah Penyesuaian' }
	},
	//NERACA SALDO SKPD Tutup LRA
	{
		path: 'neraca-saldo/stltutuplra',
		component: NeracasaldoTutuplraComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Neraca Saldo SKPD Tutup LRA' }
	},
	//NERACA SALDO SKPD tutup LO
	{
		path: 'neraca-saldo/stltutuplo',
		component: NeracasaldoTutuploComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Neraca Saldo SKPD Tutup LO' }
	},
	//NERACA SALDO SKPD saldo akhir
	{
		path: 'neraca-saldo/saldoakhir',
		component: NeracasaldoSaldoakhirComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Neraca Saldo SKPD Saldo Akhir' }
	},
	//LAPORAN KEUANGAN

	{
		path: 'laporan-keuangan/lra',
		component: LraskpdComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'LRA' }
	},
	{
		path: 'lk-skpd/prognosis',
		component: LraskpdprogComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'LRA Prognosis SKPD' }
	}
	,
	{
		path: 'laporan-keuangan/neraca',
		component: NeracaskpdComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Neraca' }
	}
	,
	{
		path: 'laporan-keuangan/lo',
		component: LraloskpdComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'LO' }
	},
	{
		path: 'laporan-keuangan/lpe',
		component: LpeskpdComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'LPE' }
	},
	{
		path: 'laporan-keuangan/lpsal',
		component: LpSalComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'LP SAL' }
	},
	{
		path: 'laporan-keuangan/lparuskas',
		component: LpAruskasComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'LP Arus Kas' }
	},
	{
		path: 'laporan-pengesahan/lrablud',
		component: LrabludComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'LRA BLUD' }
	},
	{
		path: 'laporan-pengesahan/lraperiode',
		component: LraPeriodeComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'LRA BLUD Periode' }
	},
  {
    path: 'laporan-pengesahan/sptj',
    component: SptjComponent ,
    canActivate: [ CanActiveGuardService ],
    data: { setTitle: 'SPTJ' }
  },
  {
    path: 'akuntansi/lpsah-blud/lpsp2bp',
    component: ReportSp2bComponent ,
    canActivate: [ CanActiveGuardService ],
    data: { setTitle: 'SP2B' }
  },
  {
    path: 'akuntansi/lpsah-blud/lpsp3bp',
    component: ReportSp3bComponent ,
    canActivate: [ CanActiveGuardService ],
    data: { setTitle: 'SP3B' }
  },
	{
		path: 'laporan-pengesahan/lpsptj',
		component: SptjComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'SPTJ' }
	}
// Laporan Konsolidasi
	,
	{
		path: 'laporan-konsolidasi/konsollo',
		component: KonsolLoComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Konsolidasi LRA' }
	},
	{
		path: 'laporan-konsolidasi/konsollra',
		component: KonsolLraComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Konsolidasi LO' }
	},
	{
		path: 'laporan-konsolidasi/konsollradnapbd',
		component: KonsolLraDanaapbdComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Konsolidasi LRA Dana APBD' }
	},
	{
		path: 'laporan-konsolidasi/konsollradnblud',
		component: KonsolLraDanabludComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Konsolidasi LRA Dana BLUD' }
	},
	{
		path: 'laporan-konsolidasi/konsollradnbok',
		component: KonsolLraDanabokComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Konsolidasi LRA Dana BOK' }
	},
	{
		path: 'laporan-konsolidasi/konsolnrc',
		component: KonsolNeracaComponent ,
		canActivate: [ CanActiveGuardService ],
		data: { setTitle: 'Konsolidasi Neraca' }
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaporanRoutingModule { }
