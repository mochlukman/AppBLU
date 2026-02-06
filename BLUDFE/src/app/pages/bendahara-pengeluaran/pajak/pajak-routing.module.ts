import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { MainTransferComponent } from './main-transfer/main-transfer.component';
import { MainTunaiComponent } from './main-tunai/main-tunai.component';


const routes: Routes = [
  {
    path: 'pajak-belanja-tunai',
    component: MainTunaiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pajak Belanja Tunai'}
  },
  {
    path: 'pajak-belanja-transfer',
    component: MainTransferComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pajak Belanja Transfer'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PajakRoutingModule { }
