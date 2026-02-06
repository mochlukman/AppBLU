import { NgModule } from '@angular/core';
import { JurnalKasRoutingModule } from './jurnal-kas-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CoreModule,
    SharedModule,
    JurnalKasRoutingModule
  ]
})
export class JurnalKasModule { }
