import { NgModule } from '@angular/core';
import { SpmRoutingModule } from './spm-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpmLsPegawaiComponent } from './spm-ls-pegawai/spm-ls-pegawai.component';
import { SpmLsPegawaiPembuatanComponent } from './spm-ls-pegawai/spm-ls-pegawai-pembuatan/spm-ls-pegawai-pembuatan.component';
import { SpmLsPegawaiTolakComponent } from './spm-ls-pegawai/spm-ls-pegawai-tolak/spm-ls-pegawai-tolak.component';
import { SpmLsPegawaiVerifikasiComponent } from './spm-ls-pegawai/spm-ls-pegawai-verifikasi/spm-ls-pegawai-verifikasi.component';
import { SpmLsPegawaiFormComponent } from './spm-ls-pegawai/spm-ls-pegawai-form/spm-ls-pegawai-form.component';
import { SpmLsPegawaiDetailComponent } from './spm-ls-pegawai/spm-ls-pegawai-detail/spm-ls-pegawai-detail.component';
import { SpmLsPegawaiDetailPembebananComponent } from './spm-ls-pegawai/spm-ls-pegawai-detail/spm-ls-pegawai-detail-pembebanan/spm-ls-pegawai-detail-pembebanan.component';
import { SpmUpComponent } from './spm-up/spm-up.component';
import { SpmUpFormComponent } from './spm-up/spm-up-form/spm-up-form.component';
import { SpmUpPembuatanComponent } from './spm-up/spm-up-pembuatan/spm-up-pembuatan.component';
import { SpmUpTolakComponent } from './spm-up/spm-up-tolak/spm-up-tolak.component';
import { SpmUpVerifikasiComponent } from './spm-up/spm-up-verifikasi/spm-up-verifikasi.component';
import { SpmLsNonpegawaiComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai.component';
import { SpmLsNonpegawaiDetailComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-detail/spm-ls-nonpegawai-detail.component';
import { SpmLsNonpegawaiDetailPembebananComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-detail/spm-ls-nonpegawai-detail-pembebanan/spm-ls-nonpegawai-detail-pembebanan.component';
import { SpmLsNonpegawaiFormComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-form/spm-ls-nonpegawai-form.component';
import { SpmLsNonpegawaiPembuatanComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-pembuatan/spm-ls-nonpegawai-pembuatan.component';
import { SpmLsNonpegawaiTolakComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-tolak/spm-ls-nonpegawai-tolak.component';
import { SpmLsNonpegawaiVerifikasiComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-verifikasi/spm-ls-nonpegawai-verifikasi.component';
import { SpmLsUangmukaComponent } from './spm-ls-uangmuka/spm-ls-uangmuka.component';
import { SpmLsUangmukaDetailComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-detail/spm-ls-uangmuka-detail.component';
import { SpmLsUangmukaFormComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-form/spm-ls-uangmuka-form.component';
import { SpmLsUangmukaPembuatanComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-pembuatan/spm-ls-uangmuka-pembuatan.component';
import { SpmLsUangmukaTolakComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-tolak/spm-ls-uangmuka-tolak.component';
import { SpmLsUangmukaVerifikasiComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-verifikasi/spm-ls-uangmuka-verifikasi.component';
import { SpmLsUangmukaDetailPembebananComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-detail/spm-ls-uangmuka-detail-pembebanan/spm-ls-uangmuka-detail-pembebanan.component';
import { SpmPembiayaanComponent } from './spm-pembiayaan/spm-pembiayaan.component';
import { SpmPembiayaanFormComponent } from './spm-pembiayaan/spm-pembiayaan-form/spm-pembiayaan-form.component';
import { SpmPembiayaanDetailComponent } from './spm-pembiayaan/spm-pembiayaan-detail/spm-pembiayaan-detail.component';
import { SpmPembiayaanPembuatanComponent } from './spm-pembiayaan/spm-pembiayaan-pembuatan/spm-pembiayaan-pembuatan.component';
import { SpmPembiayaanTolakComponent } from './spm-pembiayaan/spm-pembiayaan-tolak/spm-pembiayaan-tolak.component';
import { SpmPembiayaanVerifikasiComponent } from './spm-pembiayaan/spm-pembiayaan-verifikasi/spm-pembiayaan-verifikasi.component';
import { SpmPembiayaanDetailPembebananComponent } from './spm-pembiayaan/spm-pembiayaan-detail/spm-pembiayaan-detail-pembebanan/spm-pembiayaan-detail-pembebanan.component';
import { SpmTuComponent } from './spm-tu/spm-tu.component';
import { SpmTuFormComponent } from './spm-tu/spm-tu-form/spm-tu-form.component';
import { SpmTuPembuatanComponent } from './spm-tu/spm-tu-pembuatan/spm-tu-pembuatan.component';
import { SpmTuTolakComponent } from './spm-tu/spm-tu-tolak/spm-tu-tolak.component';
import { SpmTuVerifikasiComponent } from './spm-tu/spm-tu-verifikasi/spm-tu-verifikasi.component';
import { SpmTuDetailComponent } from './spm-tu/spm-tu-detail/spm-tu-detail.component';
import { SpmTuDetailPembebananComponent } from './spm-tu/spm-tu-detail/spm-tu-detail-pembebanan/spm-tu-detail-pembebanan.component';
import { SpmLsNonpegawaiPajakComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-pajak/spm-ls-nonpegawai-pajak.component';
import { SpmLsPegawaiPajakComponent } from './spm-ls-pegawai/spm-ls-pegawai-pajak/spm-ls-pegawai-pajak.component';
import { SpmLsUangmukaPajakComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-pajak/spm-ls-uangmuka-pajak.component';
import { SpmUpVerifikasiFormComponent } from './spm-up/spm-up-verifikasi/spm-up-verifikasi-form/spm-up-verifikasi-form.component';
import { SpmTuVerifikasiFormComponent } from './spm-tu/spm-tu-verifikasi/spm-tu-verifikasi-form/spm-tu-verifikasi-form.component';
import { SpmTuDetailverComponent } from './spm-tu/spm-tu-verifikasi/spm-tu-detailver/spm-tu-detailver.component';
import { SpmTuDetailPembebananverComponent } from './spm-tu/spm-tu-verifikasi/spm-tu-detailver/spm-tu-detail-pembebananver/spm-tu-detail-pembebananver.component';
import { SpmUpTolakFormComponent } from './spm-up/spm-up-tolak/spm-up-tolak-form/spm-up-tolak-form.component';
import { SpmTuDetailtolakComponent } from './spm-tu/spm-tu-tolak/spm-tu-detailtolak/spm-tu-detailtolak.component';
import { SpmTuDetailPembebanantolakComponent } from './spm-tu/spm-tu-tolak/spm-tu-detailtolak/spm-tu-detail-pembebanantolak/spm-tu-detail-pembebanantolak.component';
import { SpmTuTolakFormComponent } from './spm-tu/spm-tu-tolak/spm-tu-tolak-form/spm-tu-tolak-form.component';
import { SpmLsUangmukaVerikfikasiFormComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-verifikasi/spm-ls-uangmuka-verikfikasi-form/spm-ls-uangmuka-verikfikasi-form.component';
import { SpmLsUangmukaPajakverComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-verifikasi/spm-ls-uangmuka-pajakver/spm-ls-uangmuka-pajakver.component';
import { SpmLsUangmukaDetailverComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-verifikasi/spm-ls-uangmuka-detailver/spm-ls-uangmuka-detailver.component';
import { SpmLsUangmukaDetailPembebananverComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-verifikasi/spm-ls-uangmuka-detailver/spm-ls-uangmuka-detail-pembebananver/spm-ls-uangmuka-detail-pembebananver.component';
import { SpmLsUangmukaTolakFormComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-tolak/spm-ls-uangmuka-tolak-form/spm-ls-uangmuka-tolak-form.component';
import { SpmLsUangmukaPajaktolakComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-tolak/spm-ls-uangmuka-pajaktolak/spm-ls-uangmuka-pajaktolak.component';
import { SpmLsUangmukaDetailtolakComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-tolak/spm-ls-uangmuka-detailtolak/spm-ls-uangmuka-detailtolak.component';
import { SpmLsUangmukaDetailPembebanantolakComponent } from './spm-ls-uangmuka/spm-ls-uangmuka-tolak/spm-ls-uangmuka-detailtolak/spm-ls-uangmuka-detail-pembebanantolak/spm-ls-uangmuka-detail-pembebanantolak.component';
import { SpmLsPegawaiTolakFormComponent } from './spm-ls-pegawai/spm-ls-pegawai-tolak/spm-ls-pegawai-tolak-form/spm-ls-pegawai-tolak-form.component';
import { SpmLsPegawaiDetailtolakComponent } from './spm-ls-pegawai/spm-ls-pegawai-tolak/spm-ls-pegawai-detailtolak/spm-ls-pegawai-detailtolak.component';
import { SpmLsPegawaiDetailPembebanantolakComponent } from './spm-ls-pegawai/spm-ls-pegawai-tolak/spm-ls-pegawai-detailtolak/spm-ls-pegawai-detail-pembebanantolak/spm-ls-pegawai-detail-pembebanantolak.component';
import { SpmLsPegawaiPajaktolakComponent } from './spm-ls-pegawai/spm-ls-pegawai-tolak/spm-ls-pegawai-pajaktolak/spm-ls-pegawai-pajaktolak.component';
import { SpmLsPegawaiVerifikasiFormComponent } from './spm-ls-pegawai/spm-ls-pegawai-verifikasi/spm-ls-pegawai-verifikasi-form/spm-ls-pegawai-verifikasi-form.component';
import { SpmLsPegawaiPajakverComponent } from './spm-ls-pegawai/spm-ls-pegawai-verifikasi/spm-ls-pegawai-pajakver/spm-ls-pegawai-pajakver.component';
import { SpmLsPegawaiDetailverComponent } from './spm-ls-pegawai/spm-ls-pegawai-verifikasi/spm-ls-pegawai-detailver/spm-ls-pegawai-detailver.component';
import { SpmLsPegawaiDetailPembebananverComponent } from './spm-ls-pegawai/spm-ls-pegawai-verifikasi/spm-ls-pegawai-detailver/spm-ls-pegawai-detail-pembebananver/spm-ls-pegawai-detail-pembebananver.component';
import { SpmLsNonpegawaiTolakFormComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-tolak/spm-ls-nonpegawai-tolak-form/spm-ls-nonpegawai-tolak-form.component';
import { SpmLsNonpegawaiDetailtolakComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-tolak/spm-ls-nonpegawai-detailtolak/spm-ls-nonpegawai-detailtolak.component';
import { SpmLsNonpegawaiDetailPembebanantolakComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-tolak/spm-ls-nonpegawai-detailtolak/spm-ls-nonpegawai-detail-pembebanantolak/spm-ls-nonpegawai-detail-pembebanantolak.component';
import { SpmLsNonpegawaiPajaktolakComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-tolak/spm-ls-nonpegawai-pajaktolak/spm-ls-nonpegawai-pajaktolak.component';
import { SpmLsNonpegawaiVerifikasiFormComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-verifikasi/spm-ls-nonpegawai-verifikasi-form/spm-ls-nonpegawai-verifikasi-form.component';
import { SpmLsNonpegawaiDetailverComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-verifikasi/spm-ls-nonpegawai-detailver/spm-ls-nonpegawai-detailver.component';
import { SpmLsNonpegawaiDetailPembebananverComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-verifikasi/spm-ls-nonpegawai-detailver/spm-ls-nonpegawai-detail-pembebananver/spm-ls-nonpegawai-detail-pembebananver.component';
import { SpmLsNonpegawaiPajakverComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai-verifikasi/spm-ls-nonpegawai-pajakver/spm-ls-nonpegawai-pajakver.component';
import { SpmPembiayaanTolakFormComponent } from './spm-pembiayaan/spm-pembiayaan-tolak/spm-pembiayaan-tolak-form/spm-pembiayaan-tolak-form.component';
import { SpmPembiayaanDetailtolakComponent } from './spm-pembiayaan/spm-pembiayaan-tolak/spm-pembiayaan-detailtolak/spm-pembiayaan-detailtolak.component';
import { SpmPembiayaanDetailPembebanantolakComponent } from './spm-pembiayaan/spm-pembiayaan-tolak/spm-pembiayaan-detailtolak/spm-pembiayaan-detail-pembebanantolak/spm-pembiayaan-detail-pembebanantolak.component';
import { SpmPembiayaanVerifikasiFormComponent } from './spm-pembiayaan/spm-pembiayaan-verifikasi/spm-pembiayaan-verifikasi-form/spm-pembiayaan-verifikasi-form.component';
import { SpmPembiayaanDetailverComponent } from './spm-pembiayaan/spm-pembiayaan-verifikasi/spm-pembiayaan-detailver/spm-pembiayaan-detailver.component';
import { SpmPembiayaanDetailPembebananverComponent } from './spm-pembiayaan/spm-pembiayaan-verifikasi/spm-pembiayaan-detailver/spm-pembiayaan-detail-pembebananver/spm-pembiayaan-detail-pembebananver.component';
import { SpmGuComponent } from './spm-gu/spm-gu.component';
import { SpmGuPembuatanComponent } from './spm-gu/spm-gu-pembuatan/spm-gu-pembuatan.component';
import { SpmGuDetailPembuatanComponent } from './spm-gu/spm-gu-pembuatan/spm-gu-detail-pembuatan/spm-gu-detail-pembuatan.component';
import { SpmGuDetailRincianPembuatanComponent } from './spm-gu/spm-gu-pembuatan/spm-gu-detail-pembuatan/spm-gu-detail-rincian-pembuatan/spm-gu-detail-rincian-pembuatan.component';
import { SpmGuDetailSpjPembuatanComponent } from './spm-gu/spm-gu-pembuatan/spm-gu-detail-pembuatan/spm-gu-detail-spj-pembuatan/spm-gu-detail-spj-pembuatan.component';
import { SpmGuFormPembuatanComponent } from './spm-gu/spm-gu-pembuatan/spm-gu-form-pembuatan/spm-gu-form-pembuatan.component';
import { SpmGuVerifikasiComponent } from './spm-gu/spm-gu-verifikasi/spm-gu-verifikasi.component';
import { SpmGuFormVerifikasiComponent } from './spm-gu/spm-gu-verifikasi/spm-gu-form-verifikasi/spm-gu-form-verifikasi.component';
import { SpmGuDetailVerifikasiComponent } from './spm-gu/spm-gu-verifikasi/spm-gu-detail-verifikasi/spm-gu-detail-verifikasi.component';
import { SpmGuDetailSpjVerifikasiComponent } from './spm-gu/spm-gu-verifikasi/spm-gu-detail-verifikasi/spm-gu-detail-spj-verifikasi/spm-gu-detail-spj-verifikasi.component';
import { SpmGuDetailRincianVerifikasiComponent } from './spm-gu/spm-gu-verifikasi/spm-gu-detail-verifikasi/spm-gu-detail-rincian-verifikasi/spm-gu-detail-rincian-verifikasi.component';
import { SpmGuTolakComponent } from './spm-gu/spm-gu-tolak/spm-gu-tolak.component';
import { SpmGuFormTolakComponent } from './spm-gu/spm-gu-tolak/spm-gu-form-tolak/spm-gu-form-tolak.component';
import { SpmGuDetailTolakComponent } from './spm-gu/spm-gu-tolak/spm-gu-detail-tolak/spm-gu-detail-tolak.component';
import { SpmGuDetailRincianTolakComponent } from './spm-gu/spm-gu-tolak/spm-gu-detail-tolak/spm-gu-detail-rincian-tolak/spm-gu-detail-rincian-tolak.component';
import { SpmGuDetailSpjTolakComponent } from './spm-gu/spm-gu-tolak/spm-gu-detail-tolak/spm-gu-detail-spj-tolak/spm-gu-detail-spj-tolak.component';
import { SpmLsPegawaiPotonganComponent } from './spm-ls-pegawai/spm-ls-pegawai-potongan/spm-ls-pegawai-potongan.component';
import { SpmLsPegawaiPotonganFormComponent } from './spm-ls-pegawai/spm-ls-pegawai-potongan-form/spm-ls-pegawai-potongan-form.component';
import { SpmLsPegawaiPotonganVerComponent } from './spm-ls-pegawai/spm-ls-pegawai-verifikasi/spm-ls-pegawai-potongan-ver/spm-ls-pegawai-potongan-ver.component';
import { SpmLsPegawaiPotonganTolakComponent } from './spm-ls-pegawai/spm-ls-pegawai-tolak/spm-ls-pegawai-potongan-tolak/spm-ls-pegawai-potongan-tolak.component';


@NgModule({
  declarations: [
  SpmLsPegawaiComponent,
  SpmLsPegawaiPembuatanComponent,
  SpmLsPegawaiTolakComponent,
  SpmLsPegawaiVerifikasiComponent,
  SpmLsPegawaiFormComponent,
  SpmLsPegawaiDetailComponent,
  SpmLsPegawaiDetailPembebananComponent,
  SpmUpComponent,
  SpmUpFormComponent,
  SpmUpPembuatanComponent,
  SpmUpTolakComponent,
  SpmUpVerifikasiComponent,
  SpmLsNonpegawaiComponent,
  SpmLsNonpegawaiDetailComponent,
  SpmLsNonpegawaiDetailPembebananComponent,
  SpmLsNonpegawaiFormComponent,
  SpmLsNonpegawaiPembuatanComponent,
  SpmLsNonpegawaiTolakComponent,
  SpmLsNonpegawaiVerifikasiComponent,
  SpmLsUangmukaComponent,
  SpmLsUangmukaDetailComponent,
  SpmLsUangmukaFormComponent,
  SpmLsUangmukaPembuatanComponent,
  SpmLsUangmukaTolakComponent,
  SpmLsUangmukaVerifikasiComponent,
  SpmLsUangmukaDetailPembebananComponent,
  SpmPembiayaanComponent,
  SpmPembiayaanFormComponent,
  SpmPembiayaanDetailComponent,
  SpmPembiayaanPembuatanComponent,
  SpmPembiayaanTolakComponent,
  SpmPembiayaanVerifikasiComponent,
  SpmPembiayaanDetailPembebananComponent,
  SpmTuComponent,
  SpmTuFormComponent,
  SpmTuPembuatanComponent,
  SpmTuTolakComponent,
  SpmTuVerifikasiComponent,
  SpmTuDetailComponent,
  SpmTuDetailPembebananComponent,
  SpmLsNonpegawaiPajakComponent,
  SpmLsPegawaiPajakComponent,
  SpmLsUangmukaPajakComponent,
  SpmUpVerifikasiFormComponent,
  SpmTuVerifikasiFormComponent,
  SpmTuDetailverComponent,
  SpmTuDetailPembebananverComponent,
  SpmUpTolakFormComponent,
  SpmTuDetailtolakComponent,
  SpmTuDetailPembebanantolakComponent,
  SpmTuTolakFormComponent,
  SpmLsUangmukaVerikfikasiFormComponent,
  SpmLsUangmukaPajakverComponent,
  SpmLsUangmukaDetailverComponent,
  SpmLsUangmukaDetailPembebananverComponent,
  SpmLsUangmukaTolakFormComponent,
  SpmLsUangmukaPajaktolakComponent,
  SpmLsUangmukaDetailtolakComponent,
  SpmLsUangmukaDetailPembebanantolakComponent,
  SpmLsPegawaiTolakFormComponent,
  SpmLsPegawaiDetailtolakComponent,
  SpmLsPegawaiDetailPembebanantolakComponent,
  SpmLsPegawaiPajaktolakComponent,
  SpmLsPegawaiVerifikasiFormComponent,
  SpmLsPegawaiPajakverComponent,
  SpmLsPegawaiDetailverComponent,
  SpmLsPegawaiDetailPembebananverComponent,
  SpmLsNonpegawaiTolakFormComponent,
  SpmLsNonpegawaiDetailtolakComponent,
  SpmLsNonpegawaiDetailPembebanantolakComponent,
  SpmLsNonpegawaiPajaktolakComponent,
  SpmLsNonpegawaiVerifikasiFormComponent,
  SpmLsNonpegawaiDetailverComponent,
  SpmLsNonpegawaiDetailPembebananverComponent,
  SpmLsNonpegawaiPajakverComponent,
  SpmPembiayaanTolakFormComponent,
  SpmPembiayaanDetailtolakComponent,
  SpmPembiayaanDetailPembebanantolakComponent,
  SpmPembiayaanVerifikasiFormComponent,
  SpmPembiayaanDetailverComponent,
  SpmPembiayaanDetailPembebananverComponent,
  SpmGuComponent,
  SpmGuPembuatanComponent,
  SpmGuDetailPembuatanComponent,
  SpmGuDetailRincianPembuatanComponent,
  SpmGuDetailSpjPembuatanComponent,
  SpmGuFormPembuatanComponent,
  SpmGuVerifikasiComponent,
  SpmGuFormVerifikasiComponent,
  SpmGuDetailVerifikasiComponent,
  SpmGuDetailSpjVerifikasiComponent,
  SpmGuDetailRincianVerifikasiComponent,
  SpmGuTolakComponent,
  SpmGuFormTolakComponent,
  SpmGuDetailTolakComponent,
  SpmGuDetailRincianTolakComponent,
  SpmGuDetailSpjTolakComponent,
  SpmLsPegawaiPotonganComponent,
  SpmLsPegawaiPotonganFormComponent,
  SpmLsPegawaiPotonganVerComponent,
  SpmLsPegawaiPotonganTolakComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    SpmRoutingModule
  ]
})
export class SpmModule { }
