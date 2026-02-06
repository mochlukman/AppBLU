import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CanActiveGuardService} from 'src/app/core/_commonServices/can-active-guard.service';
import {PendapatanComponent} from 'src/app/pages/akuntansi/salk/lo-lalu/pendapatan/pendapatan.component';
import {BebanComponent} from 'src/app/pages/akuntansi/salk/lo-lalu/beban/beban.component';


const routes: Routes = [
  {
    path:'pendapatan',
    component: PendapatanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Saldo Awal Pendapatan LO'}
  },
  {
    path:'beban',
    component: BebanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Saldo Awal Beban LO'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoLaluRoutingModule { }
