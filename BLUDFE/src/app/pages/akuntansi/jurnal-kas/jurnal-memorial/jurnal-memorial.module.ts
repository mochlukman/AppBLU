import { NgModule } from '@angular/core';
import { JurnalMemorialRoutingModule } from './jurnal-memorial-routing.module';
import { JurnalMemorialComponent } from './jurnal-memorial.component';
import { JurnalMemorialFormComponent } from './jurnal-memorial-form/jurnal-memorial-form.component';
import { JurnalMemorialDetailComponent } from './jurnal-memorial-detail/jurnal-memorial-detail.component';
import { JurnalMemorialRincianComponent } from './jurnal-memorial-detail/jurnal-memorial-rincian/jurnal-memorial-rincian.component';
import { JurnalMemorialRincianFormComponent } from './jurnal-memorial-detail/jurnal-memorial-rincian-form/jurnal-memorial-rincian-form.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    JurnalMemorialComponent, 
    JurnalMemorialFormComponent, 
    JurnalMemorialDetailComponent, 
    JurnalMemorialRincianComponent, 
    JurnalMemorialRincianFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    JurnalMemorialRoutingModule
  ]
})
export class JurnalMemorialModule { }
