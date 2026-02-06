import { NgModule } from '@angular/core';
import { AnggaranRoutingModule } from './anggaran-routing.module';
import { AnggaranComponent } from './anggaran.component';
import { AnggaranFormComponent } from './anggaran-form/anggaran-form.component';
import { AnggaranDetailComponent } from './anggaran-detail/anggaran-detail.component';
import { AnggaranRincianComponent } from './anggaran-detail/anggaran-rincian/anggaran-rincian.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AnggaranComponent,
    AnggaranFormComponent, 
    AnggaranDetailComponent, 
    AnggaranRincianComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    AnggaranRoutingModule
  ]
})
export class AnggaranModule { }
