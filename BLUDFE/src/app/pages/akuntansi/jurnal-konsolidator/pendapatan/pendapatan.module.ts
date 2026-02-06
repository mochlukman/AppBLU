import { NgModule } from '@angular/core';
import { PendapatanRoutingModule } from './pendapatan-routing.module';
import { PendapatanComponent } from './pendapatan.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PendapatanComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PendapatanRoutingModule
  ]
})
export class PendapatanModule { }
