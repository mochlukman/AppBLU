import { NgModule } from '@angular/core';

import { BkuBudRoutingModule } from './bku-bud-routing.module';
import { BkuBudComponent } from './bku-bud/bku-bud.component';
import { BkuBudPenerimaanComponent } from './bku-bud/bku-bud-penerimaan/bku-bud-penerimaan.component';
import { BkuBudPenerimaanFormComponent } from './bku-bud/bku-bud-penerimaan-form/bku-bud-penerimaan-form.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BkuBudPengeluaranComponent } from './bku-bud/bku-bud-pengeluaran/bku-bud-pengeluaran.component';
import { BkuBudPengeluaranFormComponent } from './bku-bud/bku-bud-pengeluaran-form/bku-bud-pengeluaran-form.component';
import { TransferAntarRekeningComponent } from './transfer-antar-rekening/transfer-antar-rekening.component';
import { TransferAntarRekeningFormComponent } from './transfer-antar-rekening/transfer-antar-rekening-form/transfer-antar-rekening-form.component';
import { RekeningTujuanComponent } from './transfer-antar-rekening/rekening-tujuan/rekening-tujuan.component';
import { RekeningTujuanFormComponent } from './transfer-antar-rekening/rekening-tujuan-form/rekening-tujuan-form.component';


@NgModule({
  declarations: [
    BkuBudComponent, 
    BkuBudPenerimaanComponent,
    BkuBudPenerimaanFormComponent,
    BkuBudPengeluaranComponent,
    BkuBudPengeluaranFormComponent,
    TransferAntarRekeningComponent,
    TransferAntarRekeningFormComponent,
    RekeningTujuanComponent,
    RekeningTujuanFormComponent
    ],
  imports: [
    CoreModule,
    SharedModule,
    BkuBudRoutingModule
  ]
})
export class BkuBudModule { }
