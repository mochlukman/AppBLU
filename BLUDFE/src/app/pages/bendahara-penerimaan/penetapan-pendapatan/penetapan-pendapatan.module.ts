import { NgModule } from '@angular/core';

import { PenetapanPendapatanRoutingModule } from './penetapan-pendapatan-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainSkpComponent } from './main-skp/main-skp.component';
import { SkpComponent } from './main-skp/skp/skp.component';
import { SkpFormComponent } from './main-skp/skp/skp-form/skp-form.component';
import { SkpMainRincianComponent } from './main-skp/skp/skp-main-rincian/skp-main-rincian.component';
import { SkpRincianComponent } from './main-skp/skp/skp-main-rincian/skp-rincian/skp-rincian.component';
import { SkpRincianFormComponent } from './main-skp/skp/skp-main-rincian/skp-rincian-form/skp-rincian-form.component';
import { MainSkrComponent } from './main-skr/main-skr.component';
import { SkrComponent } from './main-skr/skr/skr.component';
import { SkrFormComponent } from './main-skr/skr/skr-form/skr-form.component';
import { SkrMainRincianComponent } from './main-skr/skr/skr-main-rincian/skr-main-rincian.component';
import { SkrRincianComponent } from './main-skr/skr/skr-main-rincian/skr-rincian/skr-rincian.component';
import { SkrRincianFormComponent } from './main-skr/skr/skr-main-rincian/skr-rincian-form/skr-rincian-form.component';
import { SkpPengesahanComponent } from './main-skp/skp-pengesahan/skp-pengesahan.component';
import { SkpFormPengesahanComponent } from './main-skp/skp-pengesahan/skp-form-pengesahan/skp-form-pengesahan.component';
import { SkpMainRincianPengesahanComponent } from './main-skp/skp-pengesahan/skp-main-rincian-pengesahan/skp-main-rincian-pengesahan.component';
import { SkpRincianPengesahanComponent } from './main-skp/skp-pengesahan/skp-main-rincian-pengesahan/skp-rincian-pengesahan/skp-rincian-pengesahan.component';


@NgModule({
  declarations: [
    MainSkpComponent,
    SkpComponent,
    SkpFormComponent,
    SkpMainRincianComponent,
    SkpRincianComponent,
    SkpRincianFormComponent,
    MainSkrComponent,
    SkrComponent,
    SkrFormComponent,
    SkrMainRincianComponent,
    SkrRincianComponent,
    SkrRincianFormComponent,
    SkpPengesahanComponent,
    SkpFormPengesahanComponent,
    SkpMainRincianPengesahanComponent,
    SkpRincianPengesahanComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PenetapanPendapatanRoutingModule
  ]
})
export class PenetapanPendapatanModule { }
