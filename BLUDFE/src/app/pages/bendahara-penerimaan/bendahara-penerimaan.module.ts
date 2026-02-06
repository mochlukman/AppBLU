import { NgModule } from '@angular/core';
import { BendaharaPenerimaanRoutingModule } from './bendahara-penerimaan-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    SharedModule,
    BendaharaPenerimaanRoutingModule
  ]
})
export class BendaharaPenerimaanModule { }
