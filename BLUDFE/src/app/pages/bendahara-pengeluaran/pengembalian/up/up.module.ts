import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpRoutingModule } from './up-routing.module';
import { UpComponent } from './up.component';
import { PengajuanComponent } from './pengajuan/pengajuan.component';
import { PengajuanFormComponent } from './pengajuan/pengajuan-form/pengajuan-form.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PengesahanComponent } from './pengesahan/pengesahan.component';
import { PengesahanFormComponent } from './pengesahan/pengesahan-form/pengesahan-form.component';


@NgModule({
  declarations: [
    UpComponent, 
    PengajuanComponent, 
    PengajuanFormComponent, PengesahanComponent, PengesahanFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    UpRoutingModule
  ]
})
export class UpModule { }
