import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { MainPembiayaanComponent } from './main-pembiayaan/main-pembiayaan.component';
import { MainPendapatanComponent } from './main-pendapatan/main-pendapatan.component';
import { MainStsComponent } from './main-sts/main-sts.component';
import {MainStsPenetapanComponent} from 'src/app/pages/bendahara-penerimaan/penyetoran/main-sts-penetapan/main-sts-penetapan.component';


const routes: Routes = [
  {
    path: 'pendapatan',
    component: MainPendapatanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'STS Pendapatan'}
  },
  {
    path: 'pembiayaan',
    component: MainPembiayaanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'STS Pembiyaan'}
  },
  {
    path: 'sts-penetapan',
    component: MainStsPenetapanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'STS Penetapan'}
  },
  {
    path: 'tanpa-penetapan',
    component: MainStsComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'STS Tanpa Penetapan'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PenyetoranRoutingModule { }
