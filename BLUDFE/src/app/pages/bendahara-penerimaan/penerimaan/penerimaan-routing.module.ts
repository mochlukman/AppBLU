import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { MainPenetapanComponent } from './main-penetapan/main-penetapan.component';
import { MainTanpaPenetapanComponent } from './main-tanpa-penetapan/main-tanpa-penetapan.component';
import {MainTbpTahunLaluComponent} from 'src/app/pages/bendahara-penerimaan/penerimaan/main-tbp-tahun-lalu/main-tbp-tahun-lalu.component';


const routes: Routes = [
  {
    path: 'tanpa-penetapan',
    component: MainTanpaPenetapanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'TBP Tanpa Penetapan'}
  },
  {
    path: 'penetapan',
    component: MainPenetapanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'TBP Penetapan'}
  },
  {
    path: 'tahun-lalu',
    component: MainTbpTahunLaluComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'TBP Tahun Lalu'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PenerimaanRoutingModule { }
