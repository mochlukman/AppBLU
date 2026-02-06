import { NgModule } from '@angular/core';
import { PelimpahanRoutingModule } from './pelimpahan-routing.module';
import { PelimpahanTunaiComponent } from './pelimpahan-tunai/pelimpahan-tunai.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PeltuBpToBpComponent } from './pelimpahan-tunai/peltu-bp-to-bp/peltu-bp-to-bp.component';
import { PeltuBpToBpFormComponent } from './pelimpahan-tunai/peltu-bp-to-bp/peltu-bp-to-bp-form/peltu-bp-to-bp-form.component';
import { PeltuBpToBpDetailComponent } from './pelimpahan-tunai/peltu-bp-to-bp/peltu-bp-to-bp-detail/peltu-bp-to-bp-detail.component';
import { PeltuBpToBpDetailPenerimaComponent } from './pelimpahan-tunai/peltu-bp-to-bp/peltu-bp-to-bp-detail/peltu-bp-to-bp-detail-penerima/peltu-bp-to-bp-detail-penerima.component';
import { PeltuBpToBpDetailPenerimaFormComponent } from './pelimpahan-tunai/peltu-bp-to-bp/peltu-bp-to-bp-detail/peltu-bp-to-bp-detail-penerima-form/peltu-bp-to-bp-detail-penerima-form.component';
import { PelimpahanBankComponent } from './pelimpahan-bank/pelimpahan-bank.component';
import { PelbankBpToBpComponent } from './pelimpahan-bank/pelbank-bp-to-bp/pelbank-bp-to-bp.component';
import { PelbankBpToBpFormComponent } from './pelimpahan-bank/pelbank-bp-to-bp/pelbank-bp-to-bp-form/pelbank-bp-to-bp-form.component';
import { PelbankBpToBpDetailComponent } from './pelimpahan-bank/pelbank-bp-to-bp/pelbank-bp-to-bp-detail/pelbank-bp-to-bp-detail.component';
import { PelbankBpToBpDetailPerimaComponent } from './pelimpahan-bank/pelbank-bp-to-bp/pelbank-bp-to-bp-detail/pelbank-bp-to-bp-detail-perima/pelbank-bp-to-bp-detail-perima.component';
import { PelbankBpToBpDetailPerimaFormComponent } from './pelimpahan-bank/pelbank-bp-to-bp/pelbank-bp-to-bp-detail/pelbank-bp-to-bp-detail-perima-form/pelbank-bp-to-bp-detail-perima-form.component';
import { PeltuBpToBpKegiatanComponent } from './pelimpahan-tunai/peltu-bp-to-bp/peltu-bp-to-bp-kegiatan/peltu-bp-to-bp-kegiatan.component';
import { PeltuBpToBpKegiatanFormComponent } from './pelimpahan-tunai/peltu-bp-to-bp/peltu-bp-to-bp-kegiatan-form/peltu-bp-to-bp-kegiatan-form.component';
import { PelbankBpToBpKegiatanFormComponent } from './pelimpahan-bank/pelbank-bp-to-bp/pelbank-bp-to-bp-kegiatan-form/pelbank-bp-to-bp-kegiatan-form.component';
import { PelbankBpToBpKegiatanComponent } from './pelimpahan-bank/pelbank-bp-to-bp/pelbank-bp-to-bp-kegiatan/pelbank-bp-to-bp-kegiatan.component';
import { PeltuBpToBpSahComponent } from './pelimpahan-tunai/peltu-bp-to-bp-sah/peltu-bp-to-bp-sah.component';
import { PeltuBpToBpDetailSahComponent } from './pelimpahan-tunai/peltu-bp-to-bp-sah/peltu-bp-to-bp-detail-sah/peltu-bp-to-bp-detail-sah.component';
import { PeltuBpToBpDetailPenerimaSahComponent } from './pelimpahan-tunai/peltu-bp-to-bp-sah/peltu-bp-to-bp-detail-sah/peltu-bp-to-bp-detail-penerima-sah/peltu-bp-to-bp-detail-penerima-sah.component';
import { PeltuBpToBpFormSahComponent } from './pelimpahan-tunai/peltu-bp-to-bp-sah/peltu-bp-to-bp-form-sah/peltu-bp-to-bp-form-sah.component';
import { PelbankBpToBpSahComponent } from './pelimpahan-bank/pelbank-bp-to-bp-sah/pelbank-bp-to-bp-sah.component';
import { PelbankBpToBpDetailSahComponent } from './pelimpahan-bank/pelbank-bp-to-bp-sah/pelbank-bp-to-bp-detail-sah/pelbank-bp-to-bp-detail-sah.component';
import { PelbankBpToBpDetailPenerimaSahComponent } from './pelimpahan-bank/pelbank-bp-to-bp-sah/pelbank-bp-to-bp-detail-sah/pelbank-bp-to-bp-detail-penerima-sah/pelbank-bp-to-bp-detail-penerima-sah.component';
import { PelbankBpToBpFormSahComponent } from './pelimpahan-bank/pelbank-bp-to-bp-sah/pelbank-bp-to-bp-form-sah/pelbank-bp-to-bp-form-sah.component';


@NgModule({
  declarations: [
  PelimpahanTunaiComponent,
  PeltuBpToBpComponent,
  PeltuBpToBpFormComponent,
  PeltuBpToBpDetailComponent,
  PeltuBpToBpDetailPenerimaComponent,
  PeltuBpToBpDetailPenerimaFormComponent,
  PelimpahanBankComponent,
  PelbankBpToBpComponent,
  PelbankBpToBpFormComponent,
  PelbankBpToBpDetailComponent,
  PelbankBpToBpDetailPerimaComponent,
  PelbankBpToBpDetailPerimaFormComponent,
  PeltuBpToBpKegiatanComponent,
  PeltuBpToBpKegiatanFormComponent,
  PelbankBpToBpKegiatanFormComponent,
  PelbankBpToBpKegiatanComponent,
  PeltuBpToBpSahComponent,
  PeltuBpToBpDetailSahComponent,
  PeltuBpToBpDetailPenerimaSahComponent,
  PeltuBpToBpFormSahComponent,
  PelbankBpToBpSahComponent,
  PelbankBpToBpDetailSahComponent,
  PelbankBpToBpDetailPenerimaSahComponent,
  PelbankBpToBpFormSahComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PelimpahanRoutingModule
  ]
})
export class PelimpahanModule { }
