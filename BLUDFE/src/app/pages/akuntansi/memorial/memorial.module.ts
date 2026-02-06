import { NgModule } from '@angular/core';
import { MemorialRoutingModule } from './memorial-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    SharedModule,
    MemorialRoutingModule
  ]
})
export class MemorialModule { }
