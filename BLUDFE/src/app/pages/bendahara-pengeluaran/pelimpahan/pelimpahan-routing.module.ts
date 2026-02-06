import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { PelimpahanBankComponent } from './pelimpahan-bank/pelimpahan-bank.component';
import { PelimpahanTunaiComponent } from './pelimpahan-tunai/pelimpahan-tunai.component';


const routes: Routes = [
  {
    path: 'pelimpahan-tunai',
    component: PelimpahanTunaiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pelimpahan Tunai'}
  },
  {
    path: 'pelimpahan-bank',
    component: PelimpahanBankComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pelimpahan Bank'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PelimpahanRoutingModule { }
