import { NgModule } from '@angular/core';

import { PergeseranRoutingModule } from './pergeseran-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PergeseranComponent } from './pergeseran/pergeseran.component';
import { PergeseranUangComponent } from './pergeseran/pergeseran-uang/pergeseran-uang.component';
import { PergeseranUangFormComponent } from './pergeseran/pergeseran-uang/pergeseran-uang-form/pergeseran-uang-form.component';
import { PergeseranUangDetailComponent } from './pergeseran/pergeseran-uang/pergeseran-uang-detail/pergeseran-uang-detail.component';
import { PergeseranUangDetailRincianComponent } from './pergeseran/pergeseran-uang/pergeseran-uang-detail/pergeseran-uang-detail-rincian/pergeseran-uang-detail-rincian.component';
import { PergeseranUangDetailRincianFormComponent } from './pergeseran/pergeseran-uang/pergeseran-uang-detail/pergeseran-uang-detail-rincian-form/pergeseran-uang-detail-rincian-form.component';
import { PengesahanPergeseranUangComponent } from './pergeseran/pengesahan-pergeseran-uang/pengesahan-pergeseran-uang.component';
import { PengesahanPergeseranUangFormComponent } from './pergeseran/pengesahan-pergeseran-uang/pengesahan-pergeseran-uang-form/pengesahan-pergeseran-uang-form.component';
import { PengesahanPergeseranUangDetailComponent } from './pergeseran/pengesahan-pergeseran-uang/pengesahan-pergeseran-uang-detail/pengesahan-pergeseran-uang-detail.component';
import { PengesahanPergeseranUangDetailRincianComponent } from './pergeseran/pengesahan-pergeseran-uang/pengesahan-pergeseran-uang-detail/pengesahan-pergeseran-uang-detail-rincian/pengesahan-pergeseran-uang-detail-rincian.component';


@NgModule({
  declarations: [
    PergeseranComponent,
    PergeseranUangComponent,
    PergeseranUangFormComponent,
    PergeseranUangDetailComponent,
    PergeseranUangDetailRincianComponent,
    PergeseranUangDetailRincianFormComponent,
    PengesahanPergeseranUangComponent,
    PengesahanPergeseranUangFormComponent,
    PengesahanPergeseranUangDetailComponent,
    PengesahanPergeseranUangDetailRincianComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PergeseranRoutingModule
  ]
})
export class PergeseranModule { }
