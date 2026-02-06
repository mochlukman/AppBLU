import { NgModule } from '@angular/core';
import { BuktiMemorialRoutingModule } from './bukti-memorial-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { BuktiMemorialComponent } from './bukti-memorial.component';
import { BuktiMemorialFormComponent } from './bukti-memorial-form/bukti-memorial-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuktiMemorialDetailComponent } from './bukti-memorial-detail/bukti-memorial-detail.component';
import { BuktiMemorialRincianComponent } from './bukti-memorial-detail/bukti-memorial-rincian/bukti-memorial-rincian.component';
import { BuktiMemorialRincianFormComponent } from './bukti-memorial-detail/bukti-memorial-rincian-form/bukti-memorial-rincian-form.component';


@NgModule({
  declarations: [
    BuktiMemorialComponent, 
    BuktiMemorialFormComponent, 
    BuktiMemorialDetailComponent, 
    BuktiMemorialRincianComponent, 
    BuktiMemorialRincianFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    BuktiMemorialRoutingModule
  ]
})
export class BuktiMemorialModule { }
