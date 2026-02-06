import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CanActiveGuardService} from 'src/app/core/_commonServices/can-active-guard.service';
import {SaldoAwalNeracaComponent} from 'src/app/pages/akuntansi/salk/saldo-awal-neraca/saldo-awal-neraca.component';
import {AuthGuard} from 'src/app/core/guards/auth.guard';
import {SaldoAwalArusKasComponent} from 'src/app/pages/akuntansi/salk/saldo-awal-arus-kas/saldo-awal-arus-kas.component';


const routes: Routes = [
  {
    path:'saneraca',
    component: SaldoAwalNeracaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Saldo Awal Neraca'}
  },
  {
    path: 'lra-lalu',
    loadChildren: () => import('./lra-lalu/lra-lalu.module').then(m => m.LraLaluModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'lo-lalu',
    loadChildren: () => import('./lo-lalu/lo-lalu.module').then(m => m.LoLaluModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'saaruskas',
    component: SaldoAwalArusKasComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Saldo Awal Arus Kas'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SALKRoutingModule { }
