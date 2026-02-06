import { NgModule } from '@angular/core';
import { TransaksiApbdRoutingModule } from './transaksi-apbd-routing.module';
import {CoreModule} from 'src/app/core/core.module';
import {SharedModule} from 'src/app/shared/shared.module';
import { RealisasiApbdComponent } from './realisasi-apbd/realisasi-apbd.component';
import { PembuatanSpjApbdComponent } from './realisasi-apbd/pembuatan-spj-apbd/pembuatan-spj-apbd.component';
import { PembuatanSpjApbdFormComponent } from './realisasi-apbd/pembuatan-spj-apbd/pembuatan-spj-apbd-form/pembuatan-spj-apbd-form.component';
import { PembuatanSpjApbdRincianComponent } from './realisasi-apbd/pembuatan-spj-apbd/pembuatan-spj-apbd-rincian/pembuatan-spj-apbd-rincian.component';
import { PembuatanSpjApbdRincianFormComponent } from './realisasi-apbd/pembuatan-spj-apbd/pembuatan-spj-apbd-rincian/pembuatan-spj-apbd-rincian-form/pembuatan-spj-apbd-rincian-form.component';
import { PengesahanSpjApbdComponent } from './realisasi-apbd/pengesahan-spj-apbd/pengesahan-spj-apbd.component';
import { PengesahanSpjApbdFormComponent } from './realisasi-apbd/pengesahan-spj-apbd/pengesahan-spj-apbd-form/pengesahan-spj-apbd-form.component';
import { PengesahanSpjApbdRincianComponent } from './realisasi-apbd/pengesahan-spj-apbd/pengesahan-spj-apbd-rincian/pengesahan-spj-apbd-rincian.component';


@NgModule({
  declarations: [
  RealisasiApbdComponent,
  PembuatanSpjApbdComponent,
  PembuatanSpjApbdFormComponent,
  PembuatanSpjApbdRincianComponent,
  PembuatanSpjApbdRincianFormComponent,
  PengesahanSpjApbdComponent,
  PengesahanSpjApbdFormComponent,
  PengesahanSpjApbdRincianComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    TransaksiApbdRoutingModule
  ]
})
export class TransaksiApbdModule { }
