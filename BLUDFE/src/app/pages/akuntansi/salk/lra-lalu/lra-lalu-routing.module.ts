import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CanActiveGuardService} from 'src/app/core/_commonServices/can-active-guard.service';
import {PendapatanComponent} from 'src/app/pages/akuntansi/salk/lra-lalu/pendapatan/pendapatan.component';
import {BelanjaComponent} from 'src/app/pages/akuntansi/salk/lra-lalu/belanja/belanja.component';
import {PembiayaanComponent} from 'src/app/pages/akuntansi/salk/lra-lalu/pembiayaan/pembiayaan.component';


const routes: Routes = [
  {
    path:'pendapatan',
    component: PendapatanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Saldo Awal Pendapatan'}
  },
  {
    path:'belanja',
    component: BelanjaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Saldo Awal Belanja'}
  },
  {
    path:'pembiayaan',
    component: PembiayaanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Saldo Awal Pembiayaan'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LraLaluRoutingModule { }
