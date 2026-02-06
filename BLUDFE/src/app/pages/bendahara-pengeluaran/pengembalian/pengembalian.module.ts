import { NgModule } from '@angular/core';;
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PengembalianRoutingModule } from './pengembalian-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    SharedModule,
    PengembalianRoutingModule
  ]
})
export class PengembalianModule { }
