import { NgModule } from '@angular/core';
import { PengeluaranRoutingModule } from './pengeluaran-routing.module';
import { PengeluaranComponent } from './pengeluaran.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PengeluaranComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PengeluaranRoutingModule
  ]
})
export class PengeluaranModule { }
