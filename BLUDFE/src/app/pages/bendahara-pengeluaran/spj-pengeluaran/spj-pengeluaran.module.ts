import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpjPengeluaranRoutingModule } from './spj-pengeluaran-routing.module';
import { SpjMainPageComponent } from './spj-main-page/spj-main-page.component';
import { SpjPengajuanComponent } from './spj-pengajuan/spj-pengajuan.component';
import { SpjPengajuanFormComponent } from './spj-pengajuan/spj-pengajuan-form/spj-pengajuan-form.component';
import { SpjPengajuanDetailComponent } from './spj-pengajuan/spj-pengajuan-detail/spj-pengajuan-detail.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpjPengajuanDetailBelanjaComponent } from './spj-pengajuan/spj-pengajuan-detail/spj-pengajuan-detail-belanja/spj-pengajuan-detail-belanja.component';
import { SpjPengajuanDetailBelanjaFormComponent } from './spj-pengajuan/spj-pengajuan-detail/spj-pengajuan-detail-belanja-form/spj-pengajuan-detail-belanja-form.component';
import { SpjPengajuanDetailBelanjaRincianComponent } from './spj-pengajuan/spj-pengajuan-detail/spj-pengajuan-detail-belanja-rincian/spj-pengajuan-detail-belanja-rincian.component';
import { SpjPengesahanComponent } from './spj-pengesahan/spj-pengesahan.component';
import { SpjPengesahanDetailComponent } from './spj-pengesahan/spj-pengesahan-detail/spj-pengesahan-detail.component';
import { SpjPengesahanDetailBelanjaComponent } from './spj-pengesahan/spj-pengesahan-detail/spj-pengesahan-detail-belanja/spj-pengesahan-detail-belanja.component';
import { SpjPengesahanDetailBelanjaRincianComponent } from './spj-pengesahan/spj-pengesahan-detail/spj-pengesahan-detail-belanja/spj-pengesahan-detail-belanja-rincian/spj-pengesahan-detail-belanja-rincian.component';
import { SpjPengesahanFormComponent } from './spj-pengesahan/spj-pengesahan-form/spj-pengesahan-form.component';


@NgModule({
  declarations: [
    SpjMainPageComponent,
    SpjPengajuanComponent,
    SpjPengajuanFormComponent,
    SpjPengajuanDetailComponent,
    SpjPengajuanDetailBelanjaComponent,
    SpjPengajuanDetailBelanjaFormComponent,
    SpjPengajuanDetailBelanjaRincianComponent,
    SpjPengesahanComponent,
    SpjPengesahanDetailComponent,
    SpjPengesahanDetailBelanjaComponent,
    SpjPengesahanDetailBelanjaRincianComponent,
    SpjPengesahanFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    SpjPengeluaranRoutingModule
  ]
})
export class SpjPengeluaranModule { }
