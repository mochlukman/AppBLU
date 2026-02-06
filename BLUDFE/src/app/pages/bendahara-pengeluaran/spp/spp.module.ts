import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SppRoutingModule } from './spp-routing.module';
import { SppUpComponent } from './spp-up/spp-up.component';
import { FormSppUpComponent } from './spp-up/form-spp-up/form-spp-up.component';
import { SppGuComponent } from './spp-gu/spp-gu.component';
import { FormSppGuComponent } from './spp-gu/form-spp-gu/form-spp-gu.component';
import { SppLsPegawaiComponent } from './spp-ls-pegawai/spp-ls-pegawai.component';
import { FormSppLsPegawaiComponent } from './spp-ls-pegawai/form-spp-ls-pegawai/form-spp-ls-pegawai.component';
import { SppPembiayaanComponent } from './spp-pembiayaan/spp-pembiayaan.component';
import { FormSppPembiayaanComponent } from './spp-pembiayaan/form-spp-pembiayaan/form-spp-pembiayaan.component';
import { SppLsNonpegawaiComponent } from './spp-ls-nonpegawai/spp-ls-nonpegawai.component';
import { FormSppLsNonpegawaiComponent } from './spp-ls-nonpegawai/form-spp-ls-nonpegawai/form-spp-ls-nonpegawai.component';
import { PembuatanUpComponent } from './spp-up/pembuatan-up/pembuatan-up.component';
import { TolakUpComponent } from './spp-up/tolak-up/tolak-up.component';
import { PembuatanGuComponent } from './spp-gu/pembuatan-gu/pembuatan-gu.component';
import { VerifikasiGuComponent } from './spp-gu/verifikasi-gu/verifikasi-gu.component';
import { TolakGuComponent } from './spp-gu/tolak-gu/tolak-gu.component';
import { PembuatanLsPegComponent } from './spp-ls-pegawai/pembuatan-ls-peg/pembuatan-ls-peg.component';
import { VerifikasiLsPegComponent } from './spp-ls-pegawai/verifikasi-ls-peg/verifikasi-ls-peg.component';
import { TolakLsPegComponent } from './spp-ls-pegawai/tolak-ls-peg/tolak-ls-peg.component';
import { PembuatanLsNonpegComponent } from './spp-ls-nonpegawai/pembuatan-ls-nonpeg/pembuatan-ls-nonpeg.component';
import { VerifikasiLsNonpegComponent } from './spp-ls-nonpegawai/verifikasi-ls-nonpeg/verifikasi-ls-nonpeg.component';
import { TolakLsNonpegComponent } from './spp-ls-nonpegawai/tolak-ls-nonpeg/tolak-ls-nonpeg.component';
import { DetailLsPegawaiComponent } from './spp-ls-pegawai/detail-ls-pegawai/detail-ls-pegawai.component';
import { PembuatanSppPembiayaanComponent } from './spp-pembiayaan/pembuatan-spp-pembiayaan/pembuatan-spp-pembiayaan.component';
import { TolakSppPembiayaanComponent } from './spp-pembiayaan/tolak-spp-pembiayaan/tolak-spp-pembiayaan.component';
import { VerifikasiSppPembiayaanComponent } from './spp-pembiayaan/verifikasi-spp-pembiayaan/verifikasi-spp-pembiayaan.component';
import { DetailLsNonpegawaiComponent } from './spp-ls-nonpegawai/detail-ls-nonpegawai/detail-ls-nonpegawai.component';
import { FormSppDetailLsPegawaiComponent } from './spp-ls-pegawai/form-spp-detail-ls-pegawai/form-spp-detail-ls-pegawai.component';
import { FormSppDetailLsNonpegawaiComponent } from './spp-ls-nonpegawai/form-spp-detail-ls-nonpegawai/form-spp-detail-ls-nonpegawai.component';
import { SppLsUangmukaComponent } from './spp-ls-uangmuka/spp-ls-uangmuka.component';
import { DetailSppLsUangmukaComponent } from './spp-ls-uangmuka/detail-spp-ls-uangmuka/detail-spp-ls-uangmuka.component';
import { FormSppDetailLsUangmukaComponent } from './spp-ls-uangmuka/form-spp-detail-ls-uangmuka/form-spp-detail-ls-uangmuka.component';
import { FormSppLsUangmukaComponent } from './spp-ls-uangmuka/form-spp-ls-uangmuka/form-spp-ls-uangmuka.component';
import { PembuatanSppLsUangmukaComponent } from './spp-ls-uangmuka/pembuatan-spp-ls-uangmuka/pembuatan-spp-ls-uangmuka.component';
import { TolakSppLsUangmukaComponent } from './spp-ls-uangmuka/tolak-spp-ls-uangmuka/tolak-spp-ls-uangmuka.component';
import { VerifikasiSppLsUangmukaComponent } from './spp-ls-uangmuka/verifikasi-spp-ls-uangmuka/verifikasi-spp-ls-uangmuka.component';
import { DetailLsPegawaiPembebananComponent } from './spp-ls-pegawai/detail-ls-pegawai/detail-ls-pegawai-pembebanan/detail-ls-pegawai-pembebanan.component';
import { DetailLsNonpegawaiPembebananComponent } from './spp-ls-nonpegawai/detail-ls-nonpegawai/detail-ls-nonpegawai-pembebanan/detail-ls-nonpegawai-pembebanan.component';
import { DetailSppLsUangmukaPembebananComponent } from './spp-ls-uangmuka/detail-spp-ls-uangmuka/detail-spp-ls-uangmuka-pembebanan/detail-spp-ls-uangmuka-pembebanan.component';
import { DetailSppPembiayaanComponent } from './spp-pembiayaan/detail-spp-pembiayaan/detail-spp-pembiayaan.component';
import { DetailSppPembiyaanPembebananComponent } from './spp-pembiayaan/detail-spp-pembiayaan/detail-spp-pembiyaan-pembebanan/detail-spp-pembiyaan-pembebanan.component';
import { FormSppDetailPembiayaanComponent } from './spp-pembiayaan/form-spp-detail-pembiayaan/form-spp-detail-pembiayaan.component';
import { SppTuComponent } from './spp-tu/spp-tu.component';
import { FormSppTuComponent } from './spp-tu/form-spp-tu/form-spp-tu.component';
import { PembuatanSppTuComponent } from './spp-tu/pembuatan-spp-tu/pembuatan-spp-tu.component';
import { TolakSppTuComponent } from './spp-tu/tolak-spp-tu/tolak-spp-tu.component';
import { VerifikasiSppTuComponent } from './spp-tu/verifikasi-spp-tu/verifikasi-spp-tu.component';
import { DetailSppTuComponent } from './spp-tu/detail-spp-tu/detail-spp-tu.component';
import { FormDetailSppTuComponent } from './spp-tu/form-detail-spp-tu/form-detail-spp-tu.component';
import { DetailSppTuPembebananComponent } from './spp-tu/detail-spp-tu/detail-spp-tu-pembebanan/detail-spp-tu-pembebanan.component';
import { FormSppTuNilaiComponent } from './spp-tu/form-spp-tu-nilai/form-spp-tu-nilai.component';
import { DetailSppGuComponent } from './spp-gu/detail-spp-gu/detail-spp-gu.component';
import { DetailSppGuSpjComponent } from './spp-gu/detail-spp-gu/detail-spp-gu-spj/detail-spp-gu-spj.component';
import { DetailSppGuRincianComponent } from './spp-gu/detail-spp-gu/detail-spp-gu-rincian/detail-spp-gu-rincian.component';
import { FormSppGuSpjComponent } from './spp-gu/form-spp-gu-spj/form-spp-gu-spj.component';
import { SppPengajuanTuComponent } from './spp-pengajuan-tu/spp-pengajuan-tu.component';
import { DetailSppPengajuanTuComponent } from './spp-pengajuan-tu/detail-spp-pengajuan-tu/detail-spp-pengajuan-tu.component';
import { FormDetailSppPengajuanTuComponent } from './spp-pengajuan-tu/form-detail-spp-pengajuan-tu/form-detail-spp-pengajuan-tu.component';
import { FormSppPengajuanTuComponent } from './spp-pengajuan-tu/form-spp-pengajuan-tu/form-spp-pengajuan-tu.component';
import { FormSppPengajuanTuNilaiComponent } from './spp-pengajuan-tu/form-spp-pengajuan-tu-nilai/form-spp-pengajuan-tu-nilai.component';
import { PembuatanSppPengajuanTuComponent } from './spp-pengajuan-tu/pembuatan-spp-pengajuan-tu/pembuatan-spp-pengajuan-tu.component';
import { TolakSppPengajuanTuComponent } from './spp-pengajuan-tu/tolak-spp-pengajuan-tu/tolak-spp-pengajuan-tu.component';
import { VerifikasiSppPengajuanTuComponent } from './spp-pengajuan-tu/verifikasi-spp-pengajuan-tu/verifikasi-spp-pengajuan-tu.component';
import { DetailSppPengajuanTuPembebananComponent } from './spp-pengajuan-tu/detail-spp-pengajuan-tu/detail-spp-pengajuan-tu-pembebanan/detail-spp-pengajuan-tu-pembebanan.component';
import { SppLsNonpegawaiPajakComponent } from './spp-ls-nonpegawai/spp-ls-nonpegawai-pajak/spp-ls-nonpegawai-pajak.component';
import { SppLsNonpegawaiPajakFormComponent } from './spp-ls-nonpegawai/spp-ls-nonpegawai-pajak-form/spp-ls-nonpegawai-pajak-form.component';
import { SppLsUangmukaPajakComponent } from './spp-ls-uangmuka/spp-ls-uangmuka-pajak/spp-ls-uangmuka-pajak.component';
import { SppLsUangmukaPajakFormComponent } from './spp-ls-uangmuka/spp-ls-uangmuka-pajak-form/spp-ls-uangmuka-pajak-form.component';
import { SppLsPegawaiPajakFormComponent } from './spp-ls-pegawai/spp-ls-pegawai-pajak-form/spp-ls-pegawai-pajak-form.component';
import { SppLsPegawaiPajakComponent } from './spp-ls-pegawai/spp-ls-pegawai-pajak/spp-ls-pegawai-pajak.component';
import { PengesahanUpFormComponent } from './spp-up/pengesahan-up/pengesahan-up-form/pengesahan-up-form.component';
import { DetailSppGuverComponent } from './spp-gu/verifikasi-gu/detail-spp-guver/detail-spp-guver.component';
import { DetailSppGuRincianverComponent } from './spp-gu/verifikasi-gu/detail-spp-guver/detail-spp-gu-rincianver/detail-spp-gu-rincianver.component';
import { DetailSppGuSpjverComponent } from './spp-gu/verifikasi-gu/detail-spp-guver/detail-spp-gu-spjver/detail-spp-gu-spjver.component';
import { VerifikasiGuFormComponent } from './spp-gu/verifikasi-gu/verifikasi-gu-form/verifikasi-gu-form.component';
import { VerifikasiLsNonpegFormComponent } from './spp-ls-nonpegawai/verifikasi-ls-nonpeg/verifikasi-ls-nonpeg-form/verifikasi-ls-nonpeg-form.component';
import { DetailLsNonpegawaiverComponent } from './spp-ls-nonpegawai/verifikasi-ls-nonpeg/detail-ls-nonpegawaiver/detail-ls-nonpegawaiver.component';
import { DetailLsNonpegawaiPembebananverComponent } from './spp-ls-nonpegawai/verifikasi-ls-nonpeg/detail-ls-nonpegawaiver/detail-ls-nonpegawai-pembebananver/detail-ls-nonpegawai-pembebananver.component';
import { SppLsNonpegawaiPajakverComponent } from './spp-ls-nonpegawai/verifikasi-ls-nonpeg/spp-ls-nonpegawai-pajakver/spp-ls-nonpegawai-pajakver.component';
import { VerifikasiSppLsUangmukaFormComponent } from './spp-ls-uangmuka/verifikasi-spp-ls-uangmuka/verifikasi-spp-ls-uangmuka-form/verifikasi-spp-ls-uangmuka-form.component';
import { DetailSppLsUangmukaverComponent } from './spp-ls-uangmuka/verifikasi-spp-ls-uangmuka/detail-spp-ls-uangmukaver/detail-spp-ls-uangmukaver.component';
import { DetailSppLsUangmukaPembebananverComponent } from './spp-ls-uangmuka/verifikasi-spp-ls-uangmuka/detail-spp-ls-uangmukaver/detail-spp-ls-uangmuka-pembebananver/detail-spp-ls-uangmuka-pembebananver.component';
import { SppLsUangmukaPajakverComponent } from './spp-ls-uangmuka/verifikasi-spp-ls-uangmuka/spp-ls-uangmuka-pajakver/spp-ls-uangmuka-pajakver.component';
import { VerifikasiLsPegFormComponent } from './spp-ls-pegawai/verifikasi-ls-peg/verifikasi-ls-peg-form/verifikasi-ls-peg-form.component';
import { DetailLsPegawaiverComponent } from './spp-ls-pegawai/verifikasi-ls-peg/detail-ls-pegawaiver/detail-ls-pegawaiver.component';
import { DetailLsPegawaiPembebananverComponent } from './spp-ls-pegawai/verifikasi-ls-peg/detail-ls-pegawaiver/detail-ls-pegawai-pembebananver/detail-ls-pegawai-pembebananver.component';
import { SppLsPegawaiPajakverComponent } from './spp-ls-pegawai/verifikasi-ls-peg/spp-ls-pegawai-pajakver/spp-ls-pegawai-pajakver.component';
import { VerifikasiSppPembiayaanFormComponent } from './spp-pembiayaan/verifikasi-spp-pembiayaan/verifikasi-spp-pembiayaan-form/verifikasi-spp-pembiayaan-form.component';
import { DetailSppPembiayaanverComponent } from './spp-pembiayaan/verifikasi-spp-pembiayaan/detail-spp-pembiayaanver/detail-spp-pembiayaanver.component';
import { DetailSppPembiayaanPembebananverComponent } from './spp-pembiayaan/verifikasi-spp-pembiayaan/detail-spp-pembiayaanver/detail-spp-pembiayaan-pembebananver/detail-spp-pembiayaan-pembebananver.component';
import { VerifikasiSppTuFormComponent } from './spp-tu/verifikasi-spp-tu/verifikasi-spp-tu-form/verifikasi-spp-tu-form.component';
import { DetailSppTuverComponent } from './spp-tu/verifikasi-spp-tu/detail-spp-tuver/detail-spp-tuver.component';
import { DetailSppTuPembebananverComponent } from './spp-tu/verifikasi-spp-tu/detail-spp-tuver/detail-spp-tu-pembebananver/detail-spp-tu-pembebananver.component';
import { TolakGuFromComponent } from './spp-gu/tolak-gu/tolak-gu-from/tolak-gu-from.component';
import { DetailSppGuTolakComponent } from './spp-gu/tolak-gu/detail-spp-gu-tolak/detail-spp-gu-tolak.component';
import { DetailSppGuRincianTolakComponent } from './spp-gu/tolak-gu/detail-spp-gu-tolak/detail-spp-gu-rincian-tolak/detail-spp-gu-rincian-tolak.component';
import { DetailSppGuSpjTolakComponent } from './spp-gu/tolak-gu/detail-spp-gu-tolak/detail-spp-gu-spj-tolak/detail-spp-gu-spj-tolak.component';
import { TolakUpFormComponent } from './spp-up/tolak-up/tolak-up-form/tolak-up-form.component';
import { DetailSppLsUangmukatolakComponent } from './spp-ls-uangmuka/tolak-spp-ls-uangmuka/detail-spp-ls-uangmukatolak/detail-spp-ls-uangmukatolak.component';
import { TolakSppLsUangmukaFormComponent } from './spp-ls-uangmuka/tolak-spp-ls-uangmuka/tolak-spp-ls-uangmuka-form/tolak-spp-ls-uangmuka-form.component';
import { DetailSppLsUangmukaPembebanantolakComponent } from './spp-ls-uangmuka/tolak-spp-ls-uangmuka/detail-spp-ls-uangmukatolak/detail-spp-ls-uangmuka-pembebanantolak/detail-spp-ls-uangmuka-pembebanantolak.component';
import { SppLsUangmukaPajaktolakComponent } from './spp-ls-uangmuka/tolak-spp-ls-uangmuka/spp-ls-uangmuka-pajaktolak/spp-ls-uangmuka-pajaktolak.component';
import { TolakLsPegFormComponent } from './spp-ls-pegawai/tolak-ls-peg/tolak-ls-peg-form/tolak-ls-peg-form.component';
import { DetailLsPegawaitolakComponent } from './spp-ls-pegawai/tolak-ls-peg/detail-ls-pegawaitolak/detail-ls-pegawaitolak.component';
import { DetailLsPegawaiPembebanantolakComponent } from './spp-ls-pegawai/tolak-ls-peg/detail-ls-pegawaitolak/detail-ls-pegawai-pembebanantolak/detail-ls-pegawai-pembebanantolak.component';
import { SppLsPegawaiPajaktolakComponent } from './spp-ls-pegawai/tolak-ls-peg/spp-ls-pegawai-pajaktolak/spp-ls-pegawai-pajaktolak.component';
import { DetailLsNonpegawaitolakComponent } from './spp-ls-nonpegawai/tolak-ls-nonpeg/detail-ls-nonpegawaitolak/detail-ls-nonpegawaitolak.component';
import { SppLsNonpegawaiPajaktolakComponent } from './spp-ls-nonpegawai/tolak-ls-nonpeg/spp-ls-nonpegawai-pajaktolak/spp-ls-nonpegawai-pajaktolak.component';
import { DetailLsNonpegawaiPembebanantolakComponent } from './spp-ls-nonpegawai/tolak-ls-nonpeg/detail-ls-nonpegawaitolak/detail-ls-nonpegawai-pembebanantolak/detail-ls-nonpegawai-pembebanantolak.component';
import { TolakLsNonpegFormComponent } from './spp-ls-nonpegawai/tolak-ls-nonpeg/tolak-ls-nonpeg-form/tolak-ls-nonpeg-form.component';
import { TolakSppPembiayaanFormComponent } from './spp-pembiayaan/tolak-spp-pembiayaan/tolak-spp-pembiayaan-form/tolak-spp-pembiayaan-form.component';
import { DetailSppPembiyaantolakComponent } from './spp-pembiayaan/tolak-spp-pembiayaan/detail-spp-pembiyaantolak/detail-spp-pembiyaantolak.component';
import { DetailSppPembiayaanPembebanantolakComponent } from './spp-pembiayaan/tolak-spp-pembiayaan/detail-spp-pembiyaantolak/detail-spp-pembiayaan-pembebanantolak/detail-spp-pembiayaan-pembebanantolak.component';
import { TolakSppTuFormComponent } from './spp-tu/tolak-spp-tu/tolak-spp-tu-form/tolak-spp-tu-form.component';
import { DetailSppTutolakComponent } from './spp-tu/tolak-spp-tu/detail-spp-tutolak/detail-spp-tutolak.component';
import { DetalSppTuPembebanantolakComponent } from './spp-tu/tolak-spp-tu/detail-spp-tutolak/detal-spp-tu-pembebanantolak/detal-spp-tu-pembebanantolak.component';
import { PengesahanUpComponent } from './spp-up/pengesahan-up/pengesahan-up.component';
import { PengesahanUpCheckComponent } from './spp-up/pengesahan-up/pengesahan-up-check/pengesahan-up-check.component';
import { VerifikasiGuCheckComponent } from './spp-gu/verifikasi-gu/verifikasi-gu-check/verifikasi-gu-check.component';
import { TolakGuCheckComponent } from './spp-gu/tolak-gu/tolak-gu-check/tolak-gu-check.component';
import { TolakUpCheckComponent } from './spp-up/tolak-up/tolak-up-check/tolak-up-check.component';
import { VerifikasiLsPegCheckComponent } from './spp-ls-pegawai/verifikasi-ls-peg/verifikasi-ls-peg-check/verifikasi-ls-peg-check.component';
import { TolakLsPegCheckComponent } from './spp-ls-pegawai/tolak-ls-peg/tolak-ls-peg-check/tolak-ls-peg-check.component';
import { VerifikasiSppLsUangmukaCheckComponent } from './spp-ls-uangmuka/verifikasi-spp-ls-uangmuka/verifikasi-spp-ls-uangmuka-check/verifikasi-spp-ls-uangmuka-check.component';
import { TolakSppLsUangmukaCheckComponent } from './spp-ls-uangmuka/tolak-spp-ls-uangmuka/tolak-spp-ls-uangmuka-check/tolak-spp-ls-uangmuka-check.component';
import { VerifikasiLsNonpegCheckComponent } from './spp-ls-nonpegawai/verifikasi-ls-nonpeg/verifikasi-ls-nonpeg-check/verifikasi-ls-nonpeg-check.component';
import { TolakLsNonpegCheckComponent } from './spp-ls-nonpegawai/tolak-ls-nonpeg/tolak-ls-nonpeg-check/tolak-ls-nonpeg-check.component';
import { TolakSppPembiayaanCheckComponent } from './spp-pembiayaan/tolak-spp-pembiayaan/tolak-spp-pembiayaan-check/tolak-spp-pembiayaan-check.component';
import { VerifikasiSppPembiayaanCheckComponent } from './spp-pembiayaan/verifikasi-spp-pembiayaan/verifikasi-spp-pembiayaan-check/verifikasi-spp-pembiayaan-check.component';
import { VerifikasiSppTuCheckComponent } from './spp-tu/verifikasi-spp-tu/verifikasi-spp-tu-check/verifikasi-spp-tu-check.component';
import { TolakSppTuCheckComponent } from './spp-tu/tolak-spp-tu/tolak-spp-tu-check/tolak-spp-tu-check.component';
import { DetailSppPengajuanTuverComponent } from './spp-pengajuan-tu/verifikasi-spp-pengajuan-tu/detail-spp-pengajuan-tuver/detail-spp-pengajuan-tuver.component';
import { DetailSppPengajuanTuPembebananverComponent } from './spp-pengajuan-tu/verifikasi-spp-pengajuan-tu/detail-spp-pengajuan-tuver/detail-spp-pengajuan-tu-pembebananver/detail-spp-pengajuan-tu-pembebananver.component';
import { VerifikasiSppPengajuanFormComponent } from './spp-pengajuan-tu/verifikasi-spp-pengajuan-tu/verifikasi-spp-pengajuan-form/verifikasi-spp-pengajuan-form.component';
import { VerifikasiSppPengajuanCheckComponent } from './spp-pengajuan-tu/verifikasi-spp-pengajuan-tu/verifikasi-spp-pengajuan-check/verifikasi-spp-pengajuan-check.component';
import { DetailSppPengajuanTutolakComponent } from './spp-pengajuan-tu/tolak-spp-pengajuan-tu/detail-spp-pengajuan-tutolak/detail-spp-pengajuan-tutolak.component';
import { TolakSppPengajuanTuCheckComponent } from './spp-pengajuan-tu/tolak-spp-pengajuan-tu/tolak-spp-pengajuan-tu-check/tolak-spp-pengajuan-tu-check.component';
import { DetailSppPengajuanTuPembebanantolakComponent } from './spp-pengajuan-tu/tolak-spp-pengajuan-tu/detail-spp-pengajuan-tutolak/detail-spp-pengajuan-tu-pembebanantolak/detail-spp-pengajuan-tu-pembebanantolak.component';
import { TolakSppPengajuanTuFormComponent } from './spp-pengajuan-tu/tolak-spp-pengajuan-tu/tolak-spp-pengajuan-tu-form/tolak-spp-pengajuan-tu-form.component';
import { SppLsPegawaiPotonganComponent } from './spp-ls-pegawai/spp-ls-pegawai-potongan/spp-ls-pegawai-potongan.component';
import { SppLsPegawaiPotonganFormComponent } from './spp-ls-pegawai/spp-ls-pegawai-potongan-form/spp-ls-pegawai-potongan-form.component';
import { SppLsPegawaiPotonganVerComponent } from './spp-ls-pegawai/verifikasi-ls-peg/spp-ls-pegawai-potongan-ver/spp-ls-pegawai-potongan-ver.component';
import { SppLsPegawaiPotonganTolakComponent } from './spp-ls-pegawai/tolak-ls-peg/spp-ls-pegawai-potongan-tolak/spp-ls-pegawai-potongan-tolak.component';
import { DetailLsNonpegawaiTagihanComponent } from './spp-ls-nonpegawai/detail-ls-nonpegawai/detail-ls-nonpegawai-tagihan/detail-ls-nonpegawai-tagihan.component';
import { FormSppDetailLsNonPegawaiTagihanComponent } from './spp-ls-nonpegawai/form-spp-detail-ls-non-pegawai-tagihan/form-spp-detail-ls-non-pegawai-tagihan.component';
import { DetailLsNonpegawaiTagihanDetComponent } from './spp-ls-nonpegawai/detail-ls-nonpegawai/detail-ls-nonpegawai-tagihan-det/detail-ls-nonpegawai-tagihan-det.component';
import { DetailLsNonpegawaiTagihanverComponent } from './spp-ls-nonpegawai/verifikasi-ls-nonpeg/detail-ls-nonpegawaiver/detail-ls-nonpegawai-tagihanver/detail-ls-nonpegawai-tagihanver.component';
import { DetailLsNonpegawaiTagihandetverComponent } from './spp-ls-nonpegawai/verifikasi-ls-nonpeg/detail-ls-nonpegawaiver/detail-ls-nonpegawai-tagihandetver/detail-ls-nonpegawai-tagihandetver.component';
import { DetailLsNonpegawaiTagihantolakComponent } from './spp-ls-nonpegawai/tolak-ls-nonpeg/detail-ls-nonpegawaitolak/detail-ls-nonpegawai-tagihantolak/detail-ls-nonpegawai-tagihantolak.component';
import { DetailLsNonpegawaiTagihandettolakComponent } from './spp-ls-nonpegawai/tolak-ls-nonpeg/detail-ls-nonpegawaitolak/detail-ls-nonpegawai-tagihandettolak/detail-ls-nonpegawai-tagihandettolak.component';
import { SppLsNonpegawaiPotonganComponent } from './spp-ls-nonpegawai/spp-ls-nonpegawai-potongan/spp-ls-nonpegawai-potongan.component';
import { SppLsNonpegawaiPotonganFormComponent } from './spp-ls-nonpegawai/spp-ls-nonpegawai-potongan-form/spp-ls-nonpegawai-potongan-form.component';
import { SppLsNonpegawaiPotonganVerComponent } from './spp-ls-nonpegawai/verifikasi-ls-nonpeg/spp-ls-nonpegawai-potongan-ver/spp-ls-nonpegawai-potongan-ver.component';
import { SppLsNonpegawaiPotonganTolakComponent } from './spp-ls-nonpegawai/tolak-ls-nonpeg/spp-ls-nonpegawai-potongan-tolak/spp-ls-nonpegawai-potongan-tolak.component';

@NgModule({
  declarations: [
    SppUpComponent,
    FormSppUpComponent,
    SppGuComponent,
    FormSppGuComponent,
    SppLsPegawaiComponent,
    FormSppLsPegawaiComponent,
    SppPembiayaanComponent,
    FormSppPembiayaanComponent,
    SppLsNonpegawaiComponent,
    FormSppLsNonpegawaiComponent,
    PembuatanUpComponent,
    PengesahanUpComponent,
    TolakUpComponent,
    PembuatanGuComponent,
    VerifikasiGuComponent,
    TolakGuComponent,
    PembuatanLsPegComponent,
    VerifikasiLsPegComponent,
    TolakLsPegComponent,
    PembuatanLsNonpegComponent,
    VerifikasiLsNonpegComponent,
    TolakLsNonpegComponent,
    DetailLsPegawaiComponent,
    PembuatanSppPembiayaanComponent,
    TolakSppPembiayaanComponent,
    VerifikasiSppPembiayaanComponent,
    DetailLsNonpegawaiComponent,
    FormSppDetailLsPegawaiComponent,
    FormSppDetailLsNonpegawaiComponent,
    SppLsUangmukaComponent,
    DetailSppLsUangmukaComponent,
    FormSppDetailLsUangmukaComponent,
    FormSppLsUangmukaComponent,
    PembuatanSppLsUangmukaComponent,
    TolakSppLsUangmukaComponent,
    VerifikasiSppLsUangmukaComponent,
    DetailLsPegawaiPembebananComponent,
    DetailLsNonpegawaiPembebananComponent,
    DetailSppLsUangmukaPembebananComponent,
    DetailSppPembiayaanComponent,
    DetailSppPembiyaanPembebananComponent,
    FormSppDetailPembiayaanComponent,
    SppTuComponent,
    FormSppTuComponent,
    PembuatanSppTuComponent,
    TolakSppTuComponent,
    VerifikasiSppTuComponent,
    DetailSppTuComponent,
    FormDetailSppTuComponent,
    DetailSppTuPembebananComponent,
    FormSppTuNilaiComponent,
    DetailSppGuComponent,
    DetailSppGuSpjComponent,
    DetailSppGuRincianComponent,
    FormSppGuSpjComponent,
    SppPengajuanTuComponent,
    DetailSppPengajuanTuComponent,
    FormDetailSppPengajuanTuComponent,
    FormSppPengajuanTuComponent,
    FormSppPengajuanTuNilaiComponent,
    PembuatanSppPengajuanTuComponent,
    TolakSppPengajuanTuComponent,
    VerifikasiSppPengajuanTuComponent,
    DetailSppPengajuanTuPembebananComponent,
    SppLsNonpegawaiPajakComponent,
    SppLsNonpegawaiPajakFormComponent,
    SppLsUangmukaPajakComponent,
    SppLsUangmukaPajakFormComponent,
    SppLsPegawaiPajakFormComponent,
    SppLsPegawaiPajakComponent,
    PengesahanUpFormComponent,
    DetailSppGuverComponent,
    DetailSppGuRincianverComponent,
    DetailSppGuSpjverComponent,
    VerifikasiGuFormComponent,
    VerifikasiLsNonpegFormComponent,
    DetailLsNonpegawaiverComponent,
    DetailLsNonpegawaiPembebananverComponent,
    SppLsNonpegawaiPajakverComponent,
    VerifikasiSppLsUangmukaFormComponent,
    DetailSppLsUangmukaverComponent,
    DetailSppLsUangmukaPembebananverComponent,
    SppLsUangmukaPajakverComponent,
    VerifikasiLsPegFormComponent,
    DetailLsPegawaiverComponent,
    DetailLsPegawaiPembebananverComponent,
    SppLsPegawaiPajakverComponent,
    VerifikasiSppPembiayaanFormComponent,
    DetailSppPembiayaanverComponent,
    DetailSppPembiayaanPembebananverComponent,
    VerifikasiSppTuFormComponent,
    DetailSppTuverComponent,
    DetailSppTuPembebananverComponent,
    TolakGuFromComponent,
    DetailSppGuTolakComponent,
    DetailSppGuRincianTolakComponent,
    DetailSppGuSpjTolakComponent,
    TolakUpFormComponent,
    DetailSppLsUangmukatolakComponent,
    DetailSppLsUangmukaPembebanantolakComponent,
    TolakSppLsUangmukaFormComponent,
    SppLsUangmukaPajaktolakComponent,
    TolakLsPegFormComponent,
    DetailLsPegawaitolakComponent,
    DetailLsPegawaiPembebanantolakComponent,
    SppLsPegawaiPajaktolakComponent,
    DetailLsNonpegawaitolakComponent,
    SppLsNonpegawaiPajaktolakComponent,
    DetailLsNonpegawaiPembebanantolakComponent,
    TolakLsNonpegFormComponent,
    TolakSppPembiayaanFormComponent,
    DetailSppPembiyaantolakComponent,
    DetailSppPembiayaanPembebanantolakComponent,
    TolakSppTuFormComponent,
    DetailSppTutolakComponent,
    DetalSppTuPembebanantolakComponent,
    PengesahanUpCheckComponent,
    VerifikasiGuCheckComponent,
    TolakGuCheckComponent,
    TolakUpCheckComponent,
    VerifikasiLsPegCheckComponent,
    TolakLsPegCheckComponent,
    VerifikasiSppLsUangmukaCheckComponent,
    TolakSppLsUangmukaCheckComponent,
    VerifikasiLsNonpegCheckComponent,
    TolakLsNonpegCheckComponent,
    TolakSppPembiayaanCheckComponent,
    VerifikasiSppPembiayaanCheckComponent,
    VerifikasiSppTuCheckComponent,
    TolakSppTuCheckComponent,
    DetailSppPengajuanTuverComponent,
    DetailSppPengajuanTuPembebananverComponent,
    VerifikasiSppPengajuanFormComponent,
    VerifikasiSppPengajuanCheckComponent,
    DetailSppPengajuanTutolakComponent,
    TolakSppPengajuanTuCheckComponent,
    DetailSppPengajuanTuPembebanantolakComponent,
    TolakSppPengajuanTuFormComponent,
    SppLsPegawaiPotonganComponent,
    SppLsPegawaiPotonganFormComponent,
    SppLsPegawaiPotonganVerComponent,
    SppLsPegawaiPotonganTolakComponent,
    DetailLsNonpegawaiTagihanComponent,
    FormSppDetailLsNonPegawaiTagihanComponent,
    DetailLsNonpegawaiTagihanDetComponent,
    DetailLsNonpegawaiTagihanverComponent,
    DetailLsNonpegawaiTagihandetverComponent,
    DetailLsNonpegawaiTagihantolakComponent,
    DetailLsNonpegawaiTagihandettolakComponent,
    SppLsNonpegawaiPotonganComponent,
    SppLsNonpegawaiPotonganFormComponent,
    SppLsNonpegawaiPotonganVerComponent,
    SppLsNonpegawaiPotonganTolakComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    SppRoutingModule
  ]
})
export class SppModule { }
