import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { BkuBudComponent } from './bku-bud/bku-bud.component';
import { TransferAntarRekeningComponent } from './transfer-antar-rekening/transfer-antar-rekening.component';


const routes: Routes = [
  {
    path:'transfer-antar-rekening-bud',
    component: TransferAntarRekeningComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Transfer Antar Rekening BUD'}
  },
  {
    path:'bku-bud',
    component: BkuBudComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'BKU BUD'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BkuBudRoutingModule { }
