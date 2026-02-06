import { NgModule } from '@angular/core';

import { Sp2dRoutingModule } from './sp2d-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Sp2dUpComponent } from './sp2d-up/sp2d-up.component';
import { Sp2dUpFormComponent } from './sp2d-up/sp2d-up-form/sp2d-up-form.component';
import { Sp2dUpPembuatanComponent } from './sp2d-up/sp2d-up-pembuatan/sp2d-up-pembuatan.component';
import { Sp2dUpverifikasiComponent } from './sp2d-up/sp2d-upverifikasi/sp2d-upverifikasi.component';
import { Sp2dLsPegawaiComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai.component';
import { Sp2dLsPegawaiDetailComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-detail/sp2d-ls-pegawai-detail.component';
import { Sp2dLsPegawaiFormComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-form/sp2d-ls-pegawai-form.component';
import { Sp2dLsPegawaiPajakComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-pajak/sp2d-ls-pegawai-pajak.component';
import { Sp2dLsPegawaiPembuatanComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-pembuatan/sp2d-ls-pegawai-pembuatan.component';
import { Sp2dLsPegawaiVerifikasiComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-verifikasi/sp2d-ls-pegawai-verifikasi.component';
import { Sp2dLsNonpegawaiComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai.component';
import { Sp2dLsNonpegawaiDetailComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai-detail/sp2d-ls-nonpegawai-detail.component';
import { Sp2dLsNonpegawaiFormComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai-form/sp2d-ls-nonpegawai-form.component';
import { Sp2dLsNonpegawaiPajakComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai-pajak/sp2d-ls-nonpegawai-pajak.component';
import { Sp2dLsNonpegawaiPembuatanComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai-pembuatan/sp2d-ls-nonpegawai-pembuatan.component';
import { Sp2dLsNonpegawaiVerifikasiComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai-verifikasi/sp2d-ls-nonpegawai-verifikasi.component';
import { Sp2dLsUangmukaComponent } from './sp2d-ls-uangmuka/sp2d-ls-uangmuka.component';
import { Sp2dLsUangmukaDetailComponent } from './sp2d-ls-uangmuka/sp2d-ls-uangmuka-detail/sp2d-ls-uangmuka-detail.component';
import { Sp2dLsUangmukaFormComponent } from './sp2d-ls-uangmuka/sp2d-ls-uangmuka-form/sp2d-ls-uangmuka-form.component';
import { Sp2dLsUangmukaPajakComponent } from './sp2d-ls-uangmuka/sp2d-ls-uangmuka-pajak/sp2d-ls-uangmuka-pajak.component';
import { Sp2dLsUangmukaPembuatanComponent } from './sp2d-ls-uangmuka/sp2d-ls-uangmuka-pembuatan/sp2d-ls-uangmuka-pembuatan.component';
import { Sp2dLsUangmukaVerifikasiComponent } from './sp2d-ls-uangmuka/sp2d-ls-uangmuka-verifikasi/sp2d-ls-uangmuka-verifikasi.component';
import { Sp2dPembiayaanComponent } from './sp2d-pembiayaan/sp2d-pembiayaan.component';
import { Sp2dPembiayaanFormComponent } from './sp2d-pembiayaan/sp2d-pembiayaan-form/sp2d-pembiayaan-form.component';
import { Sp2dPembiayaanPembuatanComponent } from './sp2d-pembiayaan/sp2d-pembiayaan-pembuatan/sp2d-pembiayaan-pembuatan.component';
import { Sp2dPembiayaanDetailComponent } from './sp2d-pembiayaan/sp2d-pembiayaan-detail/sp2d-pembiayaan-detail.component';
import { Sp2dPembiayaanVerifikasiComponent } from './sp2d-pembiayaan/sp2d-pembiayaan-verifikasi/sp2d-pembiayaan-verifikasi.component';
import { Sp2dTuComponent } from './sp2d-tu/sp2d-tu.component';
import { Sp2dTuDetailComponent } from './sp2d-tu/sp2d-tu-detail/sp2d-tu-detail.component';
import { Sp2dTuFormComponent } from './sp2d-tu/sp2d-tu-form/sp2d-tu-form.component';
import { Sp2dTuPembuatanComponent } from './sp2d-tu/sp2d-tu-pembuatan/sp2d-tu-pembuatan.component';
import { Sp2dTuVerifikasiComponent } from './sp2d-tu/sp2d-tu-verifikasi/sp2d-tu-verifikasi.component';
import { Sp2dGuComponent } from './sp2d-gu/sp2d-gu.component';
import { Sp2dGuFormComponent } from './sp2d-gu/sp2d-gu-form/sp2d-gu-form.component';
import { Sp2dGuPembuatanComponent } from './sp2d-gu/sp2d-gu-pembuatan/sp2d-gu-pembuatan.component';
import { Sp2dGuVerifikasiComponent } from './sp2d-gu/sp2d-gu-verifikasi/sp2d-gu-verifikasi.component';
import { Sp2dTuDetailPembebananComponent } from './sp2d-tu/sp2d-tu-detail/sp2d-tu-detail-pembebanan/sp2d-tu-detail-pembebanan.component';
import { Sp2dLsNonpegewaiDetailPembebananComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai-detail/sp2d-ls-nonpegewai-detail-pembebanan/sp2d-ls-nonpegewai-detail-pembebanan.component';
import { Sp2dLsPegawaiDetailPembebananComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-detail/sp2d-ls-pegawai-detail-pembebanan/sp2d-ls-pegawai-detail-pembebanan.component';
import { Sp2dLsUangmukaDetailPembebananComponent } from './sp2d-ls-uangmuka/sp2d-ls-uangmuka-detail/sp2d-ls-uangmuka-detail-pembebanan/sp2d-ls-uangmuka-detail-pembebanan.component';
import { Sp2dPembiayaanDetailPembebananComponent } from './sp2d-pembiayaan/sp2d-pembiayaan-detail/sp2d-pembiayaan-detail-pembebanan/sp2d-pembiayaan-detail-pembebanan.component';
import { Sp2dUpverifikasiFormComponent } from './sp2d-up/sp2d-upverifikasi/sp2d-upverifikasi-form/sp2d-upverifikasi-form.component';
import { Sp2dUpverifikasiCheckComponent } from './sp2d-up/sp2d-upverifikasi/sp2d-upverifikasi-check/sp2d-upverifikasi-check.component';
import { Sp2dGuVerifikasiFormComponent } from './sp2d-gu/sp2d-gu-verifikasi/sp2d-gu-verifikasi-form/sp2d-gu-verifikasi-form.component';
import { Sp2dGuVerifikasiCheckComponent } from './sp2d-gu/sp2d-gu-verifikasi/sp2d-gu-verifikasi-check/sp2d-gu-verifikasi-check.component';
import { Sp2dTuVerifikasiFormComponent } from './sp2d-tu/sp2d-tu-verifikasi/sp2d-tu-verifikasi-form/sp2d-tu-verifikasi-form.component';
import { Sp2dTuVerifikasiCheckComponent } from './sp2d-tu/sp2d-tu-verifikasi/sp2d-tu-verifikasi-check/sp2d-tu-verifikasi-check.component';
import { Sp2dTuVerifikasiDetailComponent } from './sp2d-tu/sp2d-tu-verifikasi/sp2d-tu-verifikasi-detail/sp2d-tu-verifikasi-detail.component';
import { Sp2dTuVerifikasiDetailPembebananComponent } from './sp2d-tu/sp2d-tu-verifikasi/sp2d-tu-verifikasi-detail/sp2d-tu-verifikasi-detail-pembebanan/sp2d-tu-verifikasi-detail-pembebanan.component';
import { Sp2dLsUangmukaVerifikasiFormComponent } from './sp2d-ls-uangmuka/sp2d-ls-uangmuka-verifikasi/sp2d-ls-uangmuka-verifikasi-form/sp2d-ls-uangmuka-verifikasi-form.component';
import { Sp2dLsUangmukaVerifikasiPajakComponent } from './sp2d-ls-uangmuka/sp2d-ls-uangmuka-verifikasi/sp2d-ls-uangmuka-verifikasi-pajak/sp2d-ls-uangmuka-verifikasi-pajak.component';
import { Sp2dLsUangmukaVerifikasiDetailComponent } from './sp2d-ls-uangmuka/sp2d-ls-uangmuka-verifikasi/sp2d-ls-uangmuka-verifikasi-detail/sp2d-ls-uangmuka-verifikasi-detail.component';
import { Sp2dLsUangmukaVerifikasiDetailPembebananComponent } from './sp2d-ls-uangmuka/sp2d-ls-uangmuka-verifikasi/sp2d-ls-uangmuka-verifikasi-detail/sp2d-ls-uangmuka-verifikasi-detail-pembebanan/sp2d-ls-uangmuka-verifikasi-detail-pembebanan.component';
import { Sp2dLsUangmukaVerifikasiCheckComponent } from './sp2d-ls-uangmuka/sp2d-ls-uangmuka-verifikasi/sp2d-ls-uangmuka-verifikasi-check/sp2d-ls-uangmuka-verifikasi-check.component';
import { Sp2dPembiayaanVerifikasiFormComponent } from './sp2d-pembiayaan/sp2d-pembiayaan-verifikasi/sp2d-pembiayaan-verifikasi-form/sp2d-pembiayaan-verifikasi-form.component';
import { Sp2dPembiayaanVerifikasiCheckComponent } from './sp2d-pembiayaan/sp2d-pembiayaan-verifikasi/sp2d-pembiayaan-verifikasi-check/sp2d-pembiayaan-verifikasi-check.component';
import { Sp2dPembiayaanVerifikasiDetailComponent } from './sp2d-pembiayaan/sp2d-pembiayaan-verifikasi/sp2d-pembiayaan-verifikasi-detail/sp2d-pembiayaan-verifikasi-detail.component';
import { Sp2dPembiayaanVerifikasiDetailPembebananComponent } from './sp2d-pembiayaan/sp2d-pembiayaan-verifikasi/sp2d-pembiayaan-verifikasi-detail/sp2d-pembiayaan-verifikasi-detail-pembebanan/sp2d-pembiayaan-verifikasi-detail-pembebanan.component';
import { Sp2dLsPegawaiVerifikasiFormComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-verifikasi/sp2d-ls-pegawai-verifikasi-form/sp2d-ls-pegawai-verifikasi-form.component';
import { Sp2dLsPegawaiVerifikasiCheckComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-verifikasi/sp2d-ls-pegawai-verifikasi-check/sp2d-ls-pegawai-verifikasi-check.component';
import { Sp2dLsPegawaiVerifikasiPajakComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-verifikasi/sp2d-ls-pegawai-verifikasi-pajak/sp2d-ls-pegawai-verifikasi-pajak.component';
import { Sp2dLsPegawaiVerifikasiDetailComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-verifikasi/sp2d-ls-pegawai-verifikasi-detail/sp2d-ls-pegawai-verifikasi-detail.component';
import { Sp2dLsPegawaiVerifikasiDetailPembebananComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-verifikasi/sp2d-ls-pegawai-verifikasi-detail/sp2d-ls-pegawai-verifikasi-detail-pembebanan/sp2d-ls-pegawai-verifikasi-detail-pembebanan.component';
import { Sp2dLsNonpegawaiVerifikasiFormComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai-verifikasi/sp2d-ls-nonpegawai-verifikasi-form/sp2d-ls-nonpegawai-verifikasi-form.component';
import { Sp2dLsNonpegawaiVerifikasiCheckComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai-verifikasi/sp2d-ls-nonpegawai-verifikasi-check/sp2d-ls-nonpegawai-verifikasi-check.component';
import { Sp2dLsNonpegawaiVerifikasiPajakComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai-verifikasi/sp2d-ls-nonpegawai-verifikasi-pajak/sp2d-ls-nonpegawai-verifikasi-pajak.component';
import { Sp2dLsNonpegawaiVerifikasiDetailComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai-verifikasi/sp2d-ls-nonpegawai-verifikasi-detail/sp2d-ls-nonpegawai-verifikasi-detail.component';
import { Sp2dLsNonpegawaiVerifikasiDetailPembebananComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai-verifikasi/sp2d-ls-nonpegawai-verifikasi-detail/sp2d-ls-nonpegawai-verifikasi-detail-pembebanan/sp2d-ls-nonpegawai-verifikasi-detail-pembebanan.component';
import { Sp2dGuPembuatanDetailComponent } from './sp2d-gu/sp2d-gu-pembuatan/sp2d-gu-pembuatan-detail/sp2d-gu-pembuatan-detail.component';
import { Sp2dGuPembuatanDetailRincianComponent } from './sp2d-gu/sp2d-gu-pembuatan/sp2d-gu-pembuatan-detail/sp2d-gu-pembuatan-detail-rincian/sp2d-gu-pembuatan-detail-rincian.component';
import { Sp2dGuVerifikasiDetailComponent } from './sp2d-gu/sp2d-gu-verifikasi/sp2d-gu-verifikasi-detail/sp2d-gu-verifikasi-detail.component';
import { Sp2dGuVerifikasiDetailRincianComponent } from './sp2d-gu/sp2d-gu-verifikasi/sp2d-gu-verifikasi-detail/sp2d-gu-verifikasi-detail-rincian/sp2d-gu-verifikasi-detail-rincian.component';
import { Sp2dLsPegawaiPotonganComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-potongan/sp2d-ls-pegawai-potongan.component';
import { Sp2dLsPegawaiPotonganFormComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-potongan-form/sp2d-ls-pegawai-potongan-form.component';
import { Sp2dLsPegawaiVerifikasiPotonganComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai-verifikasi/sp2d-ls-pegawai-verifikasi-potongan/sp2d-ls-pegawai-verifikasi-potongan.component';
import { Sp2dLsNonpegawaiPajakFormComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai-pajak-form/sp2d-ls-nonpegawai-pajak-form.component';


@NgModule({
  declarations: [
    Sp2dUpComponent,
    Sp2dUpFormComponent,
    Sp2dUpPembuatanComponent,
    Sp2dUpverifikasiComponent,
    Sp2dLsPegawaiComponent,
    Sp2dLsPegawaiDetailComponent,
    Sp2dLsPegawaiFormComponent,
    Sp2dLsPegawaiPajakComponent,
    Sp2dLsPegawaiPembuatanComponent,
    Sp2dLsPegawaiVerifikasiComponent,
    Sp2dLsNonpegawaiComponent,
    Sp2dLsNonpegawaiDetailComponent,
    Sp2dLsNonpegawaiFormComponent,
    Sp2dLsNonpegawaiPajakComponent,
    Sp2dLsNonpegawaiPembuatanComponent,
    Sp2dLsNonpegawaiVerifikasiComponent,
    Sp2dLsUangmukaComponent,
    Sp2dLsUangmukaDetailComponent,
    Sp2dLsUangmukaFormComponent,
    Sp2dLsUangmukaPajakComponent,
    Sp2dLsUangmukaPembuatanComponent,
    Sp2dLsUangmukaVerifikasiComponent,
    Sp2dPembiayaanComponent,
    Sp2dPembiayaanFormComponent,
    Sp2dPembiayaanPembuatanComponent,
    Sp2dPembiayaanDetailComponent,
    Sp2dPembiayaanVerifikasiComponent,
    Sp2dTuComponent,
    Sp2dTuDetailComponent,
    Sp2dTuFormComponent,
    Sp2dTuPembuatanComponent,
    Sp2dTuVerifikasiComponent,
    Sp2dGuComponent,
    Sp2dGuFormComponent,
    Sp2dGuPembuatanComponent,
    Sp2dGuVerifikasiComponent,
    Sp2dTuDetailPembebananComponent,
    Sp2dLsNonpegewaiDetailPembebananComponent,
    Sp2dLsPegawaiDetailPembebananComponent,
    Sp2dLsUangmukaDetailPembebananComponent,
    Sp2dPembiayaanDetailPembebananComponent,
    Sp2dUpverifikasiFormComponent,
    Sp2dUpverifikasiCheckComponent,
    Sp2dGuVerifikasiFormComponent,
    Sp2dGuVerifikasiCheckComponent,
    Sp2dTuVerifikasiFormComponent,
    Sp2dTuVerifikasiCheckComponent,
    Sp2dTuVerifikasiDetailComponent,
    Sp2dTuVerifikasiDetailPembebananComponent,
    Sp2dLsUangmukaVerifikasiFormComponent,
    Sp2dLsUangmukaVerifikasiPajakComponent,
    Sp2dLsUangmukaVerifikasiDetailComponent,
    Sp2dLsUangmukaVerifikasiDetailPembebananComponent,
    Sp2dLsUangmukaVerifikasiCheckComponent,
    Sp2dPembiayaanVerifikasiFormComponent,
    Sp2dPembiayaanVerifikasiCheckComponent,
    Sp2dPembiayaanVerifikasiDetailComponent,
    Sp2dPembiayaanVerifikasiDetailPembebananComponent,
    Sp2dLsPegawaiVerifikasiFormComponent,
    Sp2dLsPegawaiVerifikasiCheckComponent,
    Sp2dLsPegawaiVerifikasiPajakComponent,
    Sp2dLsPegawaiVerifikasiDetailComponent,
    Sp2dLsPegawaiVerifikasiDetailPembebananComponent,
    Sp2dLsNonpegawaiVerifikasiFormComponent,
    Sp2dLsNonpegawaiVerifikasiCheckComponent,
    Sp2dLsNonpegawaiVerifikasiPajakComponent,
    Sp2dLsNonpegawaiVerifikasiDetailComponent,
    Sp2dLsNonpegawaiVerifikasiDetailPembebananComponent,
    Sp2dGuPembuatanDetailComponent,
    Sp2dGuPembuatanDetailRincianComponent,
    Sp2dGuVerifikasiDetailComponent,
    Sp2dGuVerifikasiDetailRincianComponent,
    Sp2dLsPegawaiPotonganComponent,
    Sp2dLsPegawaiPotonganFormComponent,
    Sp2dLsPegawaiVerifikasiPotonganComponent,
    Sp2dLsNonpegawaiPajakFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    Sp2dRoutingModule
  ]
})
export class Sp2dModule { }
