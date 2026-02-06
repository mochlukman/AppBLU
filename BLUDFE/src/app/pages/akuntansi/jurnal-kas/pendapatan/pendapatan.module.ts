import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendapatanRoutingModule } from './pendapatan-routing.module';
import { JurnalPendapatanComponent } from './jurnal-pendapatan/jurnal-pendapatan.component';
import { JurnalPenerimaanComponent } from './jurnal-penerimaan/jurnal-penerimaan.component';
import { JurnalPenyetoranComponent } from './jurnal-penyetoran/jurnal-penyetoran.component';
import { JurnalKasMainComponent } from './jurnal-kas-main/jurnal-kas-main.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JurnalPenetapanComponent } from './jurnal-penetapan/jurnal-penetapan.component';


@NgModule({
  declarations: [
    JurnalPendapatanComponent, 
    JurnalPenerimaanComponent, 
    JurnalPenyetoranComponent, 
    JurnalKasMainComponent, JurnalPenetapanComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PendapatanRoutingModule
  ]
})
export class PendapatanModule { }
