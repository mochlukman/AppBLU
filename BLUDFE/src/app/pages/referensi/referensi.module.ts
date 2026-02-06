import { NgModule } from '@angular/core';
import { ReferensiRoutingModule } from './referensi-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    SharedModule,
    ReferensiRoutingModule
  ]
})
export class ReferensiModule { }
