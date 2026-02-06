import { NgModule } from '@angular/core';
import { JurnalKonsolidatorRoutingModule } from './jurnal-konsolidator-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    SharedModule,
    JurnalKonsolidatorRoutingModule
  ]
})
export class JurnalKonsolidatorModule { }
