import { NgModule } from '@angular/core';

import { LpjPengeluaranRoutingModule } from './lpj-pengeluaran-routing.module';
import { LpjMainPageComponent } from './lpj-main-page/lpj-main-page.component';
import { LpjPengajuanComponent } from './lpj-pengajuan/lpj-pengajuan.component';
import { LpjPengajuanFormComponent } from './lpj-pengajuan/lpj-pengajuan-form/lpj-pengajuan-form.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LpjPengajuanMainRincianComponent } from './lpj-pengajuan/lpj-pengajuan-main-rincian/lpj-pengajuan-main-rincian.component';
import { LpjPengajuanRincianComponent } from './lpj-pengajuan/lpj-pengajuan-main-rincian/lpj-pengajuan-rincian/lpj-pengajuan-rincian.component';
import { LpjPengajuanRincianFormComponent } from './lpj-pengajuan/lpj-pengajuan-main-rincian/lpj-pengajuan-rincian-form/lpj-pengajuan-rincian-form.component';
import { LpjPengajuanRincianSpjComponent } from './lpj-pengajuan/lpj-pengajuan-main-rincian/lpj-pengajuan-rincian-spj/lpj-pengajuan-rincian-spj.component';
import { LpjPengesahanComponent } from './lpj-pengesahan/lpj-pengesahan.component';
import { LpjPengesahanRincianComponent } from './lpj-pengesahan/lpj-pengesahan-main-rincian/lpj-pengesahan-rincian/lpj-pengesahan-rincian.component';
import { LpjPengesahanRincianLpjComponent } from './lpj-pengesahan/lpj-pengesahan-main-rincian/lpj-pengesahan-rincian-lpj/lpj-pengesahan-rincian-lpj.component';
import { LpjPengesahanFormComponent } from './lpj-pengesahan/lpj-pengesahan-form/lpj-pengesahan-form.component';
import { LpjPengesahanMainRincianComponent } from './lpj-pengesahan/lpj-pengesahan-main-rincian/lpj-pengesahan-main-rincian.component';


@NgModule({
  declarations: [
    LpjMainPageComponent, 
    LpjPengajuanComponent, 
    LpjPengajuanFormComponent,
    LpjPengajuanMainRincianComponent,
    LpjPengajuanRincianComponent,
    LpjPengajuanRincianFormComponent,
    LpjPengajuanRincianSpjComponent,
    LpjPengesahanComponent,
    LpjPengesahanFormComponent,
    LpjPengesahanMainRincianComponent,
    LpjPengesahanRincianComponent,
    LpjPengesahanRincianLpjComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    LpjPengeluaranRoutingModule
  ]
})
export class LpjPengeluaranModule { }
