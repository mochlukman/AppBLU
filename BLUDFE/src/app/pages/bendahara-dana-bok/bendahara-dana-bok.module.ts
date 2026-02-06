import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BendaharaDanaBokRoutingModule } from './bendahara-dana-bok-routing.module';
import { MainSp2tComponent } from './main-sp2t/main-sp2t.component';
import { Sp2tComponent } from './main-sp2t/sp2t/sp2t.component';
import { Sp2tFormComponent } from './main-sp2t/sp2t/sp2t-form/sp2t-form.component';
import { Sp2tMainRincianComponent } from './main-sp2t/sp2t/sp2t-main-rincian/sp2t-main-rincian.component';
import { Sp2tRincianComponent } from './main-sp2t/sp2t/sp2t-main-rincian/sp2t-rincian/sp2t-rincian.component';
import { Sp2tRincianFormComponent } from './main-sp2t/sp2t/sp2t-main-rincian/sp2t-rincian-form/sp2t-rincian-form.component';
import { PergeseranComponent } from './pergeseran/pergeseran/pergeseran.component';
import { PergeseranUangComponent } from './pergeseran/pergeseran/pergeseran-uang/pergeseran-uang.component';
import { PergeseranUangFormComponent } from './pergeseran/pergeseran/pergeseran-uang/pergeseran-uang-form/pergeseran-uang-form.component';
import { PergeseranUangDetailComponent } from './pergeseran/pergeseran/pergeseran-uang/pergeseran-uang-detail/pergeseran-uang-detail.component';
import { PergeseranUangDetailRincianComponent } from './pergeseran/pergeseran/pergeseran-uang/pergeseran-uang-detail/pergeseran-uang-detail-rincian/pergeseran-uang-detail-rincian.component';
import { PergeseranUangDetailRincianFormComponent } from './pergeseran/pergeseran/pergeseran-uang/pergeseran-uang-detail/pergeseran-uang-detail-rincian-form/pergeseran-uang-detail-rincian-form.component';
import { BpkComponent } from './bpk/bpk/bpk.component';
import { PembuatanBpkComponent } from './bpk/bpk/pembuatan-bpk/pembuatan-bpk.component';
import { PembuatanBpkFormComponent } from './bpk/bpk/pembuatan-bpk/pembuatan-bpk-form/pembuatan-bpk-form.component';
import { PembuatanBpkRincianComponent } from './bpk/bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-rincian.component';
import { PembuatanBpkPungutanPajakComponent } from './bpk/bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-pungutan-pajak/pembuatan-bpk-pungutan-pajak.component';
import { PembuatanBpkPungutanPajakDetComponent } from './bpk/bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-pungutan-pajak/pembuatan-bpk-pungutan-pajak-det/pembuatan-bpk-pungutan-pajak-det.component';
import { PembuatanBpkPungutanPajakFormComponent } from './bpk/bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-pungutan-pajak/pembuatan-bpk-pungutan-pajak-form/pembuatan-bpk-pungutan-pajak-form.component';
import { PembuatanBpkRincianBelanjaComponent } from './bpk/bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-rincian-belanja/pembuatan-bpk-rincian-belanja.component';
import { PembuatanBpkRincianBelanjaFormComponent } from './bpk/bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-rincian-belanja/pembuatan-bpk-rincian-belanja-form/pembuatan-bpk-rincian-belanja-form.component';
import { PengesahanBpkComponent } from './bpk/bpk/pengesahan-bpk/pengesahan-bpk.component';
import { PengesahanBpkFormComponent } from './bpk/bpk/pengesahan-bpk/pengesahan-bpk-form/pengesahan-bpk-form.component';
import { PengesahanBpkRincianComponent } from './bpk/bpk/pengesahan-bpk/pengesahan-bpk-rincian/pengesahan-bpk-rincian.component';
import { PengesahanBpkPungutanPajakComponent } from './bpk/bpk/pengesahan-bpk/pengesahan-bpk-rincian/pengesahan-bpk-pungutan-pajak/pengesahan-bpk-pungutan-pajak.component';
import { PengesahanBpkPungutanPajakDetComponent } from './bpk/bpk/pengesahan-bpk/pengesahan-bpk-rincian/pengesahan-bpk-pungutan-pajak/pengesahan-bpk-pungutan-pajak-det/pengesahan-bpk-pungutan-pajak-det.component';
import { PengesahanBpkRincianBelanjaComponent } from './bpk/bpk/pengesahan-bpk/pengesahan-bpk-rincian/pengesahan-bpk-rincian-belanja/pengesahan-bpk-rincian-belanja.component';
import { SetoranPajakComponent } from './bpk/setoran-pajak/setoran-pajak.component';
import { PenyetoranPajakComponent } from './bpk/setoran-pajak/penyetoran-pajak/penyetoran-pajak.component';
import { PenyetoranPajakFormComponent } from './bpk/setoran-pajak/penyetoran-pajak/penyetoran-pajak-form/penyetoran-pajak-form.component';
import { PenyetoranPajakRincianComponent } from './bpk/setoran-pajak/penyetoran-pajak/penyetoran-pajak-rincian/penyetoran-pajak-rincian.component';
import { PenyetoranPajakRincianDetailComponent } from './bpk/setoran-pajak/penyetoran-pajak/penyetoran-pajak-rincian/penyetoran-pajak-rincian-detail/penyetoran-pajak-rincian-detail.component';
import { PenyetoranPajakRincianDetailFormComponent } from './bpk/setoran-pajak/penyetoran-pajak/penyetoran-pajak-rincian/penyetoran-pajak-rincian-detail/penyetoran-pajak-rincian-detail-form/penyetoran-pajak-rincian-detail-form.component';
import { BpkKoreksiComponent } from './bpk/bpk-koreksi/bpk-koreksi.component';
import { PembuatanBpkKoreksiComponent } from './bpk/bpk-koreksi/pembuatan-bpk-koreksi/pembuatan-bpk-koreksi.component';
import { PembuatanBpkKoreksiFormComponent } from './bpk/bpk-koreksi/pembuatan-bpk-koreksi/pembuatan-bpk-koreksi-form/pembuatan-bpk-koreksi-form.component';
import { PembuatanBpkKoreksiRincianComponent } from './bpk/bpk-koreksi/pembuatan-bpk-koreksi/pembuatan-bpk-koreksi-rincian/pembuatan-bpk-koreksi-rincian.component';
import { PembuatanBpkKoreksiRincianBelanjaComponent } from './bpk/bpk-koreksi/pembuatan-bpk-koreksi/pembuatan-bpk-koreksi-rincian/pembuatan-bpk-koreksi-rincian-belanja/pembuatan-bpk-koreksi-rincian-belanja.component';
import { PengesahanBpkKoreksiComponent } from './bpk/bpk-koreksi/pengesahan-bpk-koreksi/pengesahan-bpk-koreksi.component';
import { PengesahanBpkKoreksiFormComponent } from './bpk/bpk-koreksi/pengesahan-bpk-koreksi/pengesahan-bpk-koreksi-form/pengesahan-bpk-koreksi-form.component';
import { PengesahanBpkKoreksiRincianComponent } from './bpk/bpk-koreksi/pengesahan-bpk-koreksi/pengesahan-bpk-koreksi-rincian/pengesahan-bpk-koreksi-rincian.component';
import { PengesahanBpkKoreksiRincianBelanjaComponent } from './bpk/bpk-koreksi/pengesahan-bpk-koreksi/pengesahan-bpk-koreksi-rincian/pengesahan-bpk-koreksi-rincian-belanja/pengesahan-bpk-koreksi-rincian-belanja.component';
import { PengesahanPergeseranUangComponent } from './pergeseran/pergeseran/pengesahan-pergeseran-uang/pengesahan-pergeseran-uang.component';
import { PengesahanPergeseranUangFormComponent } from './pergeseran/pergeseran/pengesahan-pergeseran-uang/pengesahan-pergeseran-uang-form/pengesahan-pergeseran-uang-form.component';
import { PengesahanPergeseranUangDetailComponent } from './pergeseran/pergeseran/pengesahan-pergeseran-uang/pengesahan-pergeseran-uang-detail/pengesahan-pergeseran-uang-detail.component';
import { PengesahanPergeseranUangDetailRincianComponent } from './pergeseran/pergeseran/pengesahan-pergeseran-uang/pengesahan-pergeseran-uang-detail/pengesahan-pergeseran-uang-detail-rincian/pengesahan-pergeseran-uang-detail-rincian.component';
import { Sp2tPengesahanComponent } from './main-sp2t/sp2t-pengesahan/sp2t-pengesahan.component';
import { Sp2tFormPengesahanComponent } from './main-sp2t/sp2t-pengesahan/sp2t-form-pengesahan/sp2t-form-pengesahan.component';
import { Sp2tMainRincianPengesahanComponent } from './main-sp2t/sp2t-pengesahan/sp2t-main-rincian-pengesahan/sp2t-main-rincian-pengesahan.component';
import { Sp2tRincianPengesahanComponent } from './main-sp2t/sp2t-pengesahan/sp2t-main-rincian-pengesahan/sp2t-rincian-pengesahan/sp2t-rincian-pengesahan.component';
import { PenyetoranPajakSahComponent } from './bpk/setoran-pajak/penyetoran-pajak-sah/penyetoran-pajak-sah.component';
import { PenyetoranPajakFormSahComponent } from './bpk/setoran-pajak/penyetoran-pajak-sah/penyetoran-pajak-form-sah/penyetoran-pajak-form-sah.component';
import { PenyetoranPajakRincianSahComponent } from './bpk/setoran-pajak/penyetoran-pajak-sah/penyetoran-pajak-rincian-sah/penyetoran-pajak-rincian-sah.component';
import { PenyetoranPajakRincianDetailSahComponent } from './bpk/setoran-pajak/penyetoran-pajak-sah/penyetoran-pajak-rincian-sah/penyetoran-pajak-rincian-detail-sah/penyetoran-pajak-rincian-detail-sah.component';
import {
  PembuatanBpkPungutanPajakDetFormComponent
} from 'src/app/pages/bendahara-dana-bok/bpk/bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-pungutan-pajak/pembuatan-bpk-pungutan-pajak-det-form/pembuatan-bpk-pungutan-pajak-det-form.component';
import {
  PembuatanBpkKoreksiRincianBelanjaFormComponent
} from 'src/app/pages/bendahara-dana-bok/bpk/bpk-koreksi/pembuatan-bpk-koreksi/pembuatan-bpk-koreksi-rincian/pembuatan-bpk-koreksi-rincian-belanja/pembuatan-bpk-koreksi-rincian-belanja-form/pembuatan-bpk-koreksi-rincian-belanja-form.component';


@NgModule({
  declarations: [
    MainSp2tComponent,
    Sp2tComponent,
    Sp2tFormComponent,
    Sp2tMainRincianComponent,
    Sp2tRincianComponent,
    Sp2tRincianFormComponent,
    PergeseranComponent,
    PergeseranUangComponent,
    PergeseranUangFormComponent,
    PergeseranUangDetailComponent,
    PergeseranUangDetailRincianComponent,
    PergeseranUangDetailRincianFormComponent,
    BpkComponent,
    PembuatanBpkComponent,
    PembuatanBpkFormComponent,
    PembuatanBpkRincianComponent,
    PembuatanBpkPungutanPajakComponent,
    PembuatanBpkPungutanPajakDetComponent,
    PembuatanBpkPungutanPajakFormComponent,
    PembuatanBpkRincianBelanjaComponent,
    PembuatanBpkRincianBelanjaFormComponent,
    PengesahanBpkComponent,
    PengesahanBpkFormComponent,
    PengesahanBpkRincianComponent,
    PengesahanBpkPungutanPajakComponent,
    PengesahanBpkPungutanPajakDetComponent,
    PengesahanBpkRincianBelanjaComponent,
    SetoranPajakComponent,
    PenyetoranPajakComponent,
    PenyetoranPajakFormComponent,
    PenyetoranPajakRincianComponent,
    PenyetoranPajakRincianDetailComponent,
    PenyetoranPajakRincianDetailFormComponent,
    BpkKoreksiComponent,
    PembuatanBpkKoreksiComponent,
    PembuatanBpkKoreksiFormComponent,
    PembuatanBpkKoreksiRincianComponent,
    PembuatanBpkKoreksiRincianBelanjaComponent,
    PengesahanBpkKoreksiComponent,
    PengesahanBpkKoreksiFormComponent,
    PengesahanBpkKoreksiRincianComponent,
    PengesahanBpkKoreksiRincianBelanjaComponent,
    PengesahanPergeseranUangComponent,
    PengesahanPergeseranUangFormComponent,
    PengesahanPergeseranUangDetailComponent,
    PengesahanPergeseranUangDetailRincianComponent,
    Sp2tPengesahanComponent,
    Sp2tFormPengesahanComponent,
    Sp2tMainRincianPengesahanComponent,
    Sp2tRincianPengesahanComponent,
    PenyetoranPajakSahComponent,
    PenyetoranPajakFormSahComponent,
    PenyetoranPajakRincianSahComponent,
    PenyetoranPajakRincianDetailSahComponent,
    PembuatanBpkPungutanPajakDetFormComponent,
    PembuatanBpkKoreksiRincianBelanjaFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    BendaharaDanaBokRoutingModule
  ]
})
export class BendaharaDanaBokModule { }
