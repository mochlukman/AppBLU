import { NgModule } from '@angular/core';
import { BpkRoutingModule } from './bpk-routing.module';
import { BpkComponent } from './bpk/bpk.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PembuatanBpkComponent } from './bpk/pembuatan-bpk/pembuatan-bpk.component';
import { PengesahanBpkComponent } from './bpk/pengesahan-bpk/pengesahan-bpk.component';
import { PembuatanBpkFormComponent } from './bpk/pembuatan-bpk/pembuatan-bpk-form/pembuatan-bpk-form.component';
import { PembuatanBpkRincianComponent } from './bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-rincian.component';
import { PembuatanBpkRincianBelanjaComponent } from './bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-rincian-belanja/pembuatan-bpk-rincian-belanja.component';
import { PembuatanBpkPungutanPajakComponent } from './bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-pungutan-pajak/pembuatan-bpk-pungutan-pajak.component';
import { PembuatanBpkRincianBelanjaFormComponent } from './bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-rincian-belanja/pembuatan-bpk-rincian-belanja-form/pembuatan-bpk-rincian-belanja-form.component';
import { PembuatanBpkPungutanPajakFormComponent } from './bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-pungutan-pajak/pembuatan-bpk-pungutan-pajak-form/pembuatan-bpk-pungutan-pajak-form.component';
import { PembuatanBpkPungutanPajakDetComponent } from './bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-pungutan-pajak/pembuatan-bpk-pungutan-pajak-det/pembuatan-bpk-pungutan-pajak-det.component';
import { PengesahanBpkFormComponent } from './bpk/pengesahan-bpk/pengesahan-bpk-form/pengesahan-bpk-form.component';
import { PengesahanBpkRincianComponent } from './bpk/pengesahan-bpk/pengesahan-bpk-rincian/pengesahan-bpk-rincian.component';
import { PengesahanBpkPungutanPajakComponent } from './bpk/pengesahan-bpk/pengesahan-bpk-rincian/pengesahan-bpk-pungutan-pajak/pengesahan-bpk-pungutan-pajak.component';
import { PengesahanBpkPungutanPajakDetComponent } from './bpk/pengesahan-bpk/pengesahan-bpk-rincian/pengesahan-bpk-pungutan-pajak/pengesahan-bpk-pungutan-pajak-det/pengesahan-bpk-pungutan-pajak-det.component';
import { PengesahanBpkRincianBelanjaComponent } from './bpk/pengesahan-bpk/pengesahan-bpk-rincian/pengesahan-bpk-rincian-belanja/pengesahan-bpk-rincian-belanja.component';
import { SetoranPajakComponent } from './setoran-pajak/setoran-pajak.component';
import { PenyetoranPajakComponent } from './setoran-pajak/penyetoran-pajak/penyetoran-pajak.component';
import { PenyetoranPajakFormComponent } from './setoran-pajak/penyetoran-pajak/penyetoran-pajak-form/penyetoran-pajak-form.component';
import { PenyetoranPajakRincianComponent } from './setoran-pajak/penyetoran-pajak/penyetoran-pajak-rincian/penyetoran-pajak-rincian.component';
import { PenyetoranPajakRincianDetailComponent } from './setoran-pajak/penyetoran-pajak/penyetoran-pajak-rincian/penyetoran-pajak-rincian-detail/penyetoran-pajak-rincian-detail.component';
import { PenyetoranPajakRincianDetailFormComponent } from './setoran-pajak/penyetoran-pajak/penyetoran-pajak-rincian/penyetoran-pajak-rincian-detail/penyetoran-pajak-rincian-detail-form/penyetoran-pajak-rincian-detail-form.component';
import { BpkKoreksiComponent } from './bpk-koreksi/bpk-koreksi.component';
import { PembuatanBpkKoreksiComponent } from './bpk-koreksi/pembuatan-bpk-koreksi/pembuatan-bpk-koreksi.component';
import { PembuatanBpkKoreksiFormComponent } from './bpk-koreksi/pembuatan-bpk-koreksi/pembuatan-bpk-koreksi-form/pembuatan-bpk-koreksi-form.component';
import { PembuatanBpkKoreksiRincianComponent } from './bpk-koreksi/pembuatan-bpk-koreksi/pembuatan-bpk-koreksi-rincian/pembuatan-bpk-koreksi-rincian.component';
import { PembuatanBpkKoreksiRincianBelanjaComponent } from './bpk-koreksi/pembuatan-bpk-koreksi/pembuatan-bpk-koreksi-rincian/pembuatan-bpk-koreksi-rincian-belanja/pembuatan-bpk-koreksi-rincian-belanja.component';
import { PengesahanBpkKoreksiComponent } from './bpk-koreksi/pengesahan-bpk-koreksi/pengesahan-bpk-koreksi.component';
import { PengesahanBpkKoreksiFormComponent } from './bpk-koreksi/pengesahan-bpk-koreksi/pengesahan-bpk-koreksi-form/pengesahan-bpk-koreksi-form.component';
import { PengesahanBpkKoreksiRincianComponent } from './bpk-koreksi/pengesahan-bpk-koreksi/pengesahan-bpk-koreksi-rincian/pengesahan-bpk-koreksi-rincian.component';
import { PengesahanBpkKoreksiRincianBelanjaComponent } from './bpk-koreksi/pengesahan-bpk-koreksi/pengesahan-bpk-koreksi-rincian/pengesahan-bpk-koreksi-rincian-belanja/pengesahan-bpk-koreksi-rincian-belanja.component';
import { PengesahanSetoranPajakComponent } from './setoran-pajak/pengesahan-setoran-pajak/pengesahan-setoran-pajak.component';
import { PengesahanSetoranPajakFormComponent } from './setoran-pajak/pengesahan-setoran-pajak/pengesahan-setoran-pajak-form/pengesahan-setoran-pajak-form.component';
import { PengesahanSetoranPajakRincianComponent } from './setoran-pajak/pengesahan-setoran-pajak/pengesahan-setoran-pajak-rincian/pengesahan-setoran-pajak-rincian.component';
import { PengesahanSetoranPajakRincianDetailComponent } from './setoran-pajak/pengesahan-setoran-pajak/pengesahan-setoran-pajak-rincian/pengesahan-setoran-pajak-rincian-detail/pengesahan-setoran-pajak-rincian-detail.component';
import { PembuatanBpkPungutanPajakDetFormComponent } from './bpk/pembuatan-bpk/pembuatan-bpk-rincian/pembuatan-bpk-pungutan-pajak/pembuatan-bpk-pungutan-pajak-det-form/pembuatan-bpk-pungutan-pajak-det-form.component';
import { PembuatanBpkKoreksiRincianBelanjaFormComponent } from './bpk-koreksi/pembuatan-bpk-koreksi/pembuatan-bpk-koreksi-rincian/pembuatan-bpk-koreksi-rincian-belanja/pembuatan-bpk-koreksi-rincian-belanja-form/pembuatan-bpk-koreksi-rincian-belanja-form.component';


@NgModule({
  declarations: [
    BpkComponent,
    PembuatanBpkComponent,
    PengesahanBpkComponent,
    PembuatanBpkFormComponent,
    PembuatanBpkRincianComponent,
    PembuatanBpkRincianBelanjaComponent,
    PembuatanBpkPungutanPajakComponent,
    PembuatanBpkRincianBelanjaFormComponent,
    PembuatanBpkPungutanPajakFormComponent,
    PembuatanBpkPungutanPajakDetComponent,
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
    PengesahanSetoranPajakComponent,
    PengesahanSetoranPajakFormComponent,
    PengesahanSetoranPajakRincianComponent,
    PengesahanSetoranPajakRincianDetailComponent,
    PembuatanBpkPungutanPajakDetFormComponent,
    PembuatanBpkKoreksiRincianBelanjaFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    BpkRoutingModule
  ]
})
export class BpkModule { }
