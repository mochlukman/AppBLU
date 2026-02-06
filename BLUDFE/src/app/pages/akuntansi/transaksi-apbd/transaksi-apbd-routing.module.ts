import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CanActiveGuardService} from 'src/app/core/_commonServices/can-active-guard.service';
import {RealisasiApbdComponent} from 'src/app/pages/akuntansi/transaksi-apbd/realisasi-apbd/realisasi-apbd.component';


const routes: Routes = [
  {
    path:'realisasi-apbd',
    component: RealisasiApbdComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Realisais APBD'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaksiApbdRoutingModule { }
