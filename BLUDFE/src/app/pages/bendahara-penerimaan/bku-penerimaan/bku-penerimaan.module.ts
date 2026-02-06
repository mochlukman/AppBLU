import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BkuPenerimaanRoutingModule } from './bku-penerimaan-routing.module';
import { BkuMainPageComponent } from './bku-main-page/bku-main-page.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BkuPenerimaanComponent } from './bku-penerimaan/bku-penerimaan.component';
import { BkuPenerimaanFormComponent } from './bku-penerimaan/bku-penerimaan-form/bku-penerimaan-form.component';
import { BkuPenyetoranComponent } from './bku-penyetoran/bku-penyetoran.component';
import { BkuPenyetoranFormComponent } from './bku-penyetoran/bku-penyetoran-form/bku-penyetoran-form.component';
import { BkuSkpdComponent } from './bku-skpd/bku-skpd.component';
import { BkuPengembalianPendapatanComponent } from './bku-pengembalian-pendapatan/bku-pengembalian-pendapatan.component';
import { BkuPengembalianPendapatanFormComponent } from './bku-pengembalian-pendapatan/bku-pengembalian-pendapatan-form/bku-pengembalian-pendapatan-form.component';


@NgModule({
  declarations: [
    BkuMainPageComponent,
    BkuPenerimaanComponent,
    BkuPenerimaanFormComponent,
    BkuPenyetoranComponent,
    BkuPenyetoranFormComponent,
    BkuSkpdComponent,
    BkuPengembalianPendapatanComponent,
    BkuPengembalianPendapatanFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    BkuPenerimaanRoutingModule
  ]
})
export class BkuPenerimaanModule { }
