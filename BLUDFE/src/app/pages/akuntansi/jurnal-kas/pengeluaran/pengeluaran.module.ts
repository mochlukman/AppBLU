import { NgModule } from '@angular/core';
import { PengeluaranRoutingModule } from './pengeluaran-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JurnalKasMainComponent } from './jurnal-kas-main/jurnal-kas-main.component';
import { JurnalPengeluaranComponent } from './jurnal-pengeluaran/jurnal-pengeluaran.component';


@NgModule({
  declarations: [
    JurnalKasMainComponent,
    JurnalPengeluaranComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PengeluaranRoutingModule
  ]
})
export class PengeluaranModule { }
