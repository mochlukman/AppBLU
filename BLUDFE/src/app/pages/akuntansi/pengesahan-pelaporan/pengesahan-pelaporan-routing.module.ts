import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CanActiveGuardService} from 'src/app/core/_commonServices/can-active-guard.service';
import {Sp3bMainComponent} from 'src/app/pages/akuntansi/pengesahan-pelaporan/sp3b-main/sp3b-main.component';
import {Sp2bMainComponent} from 'src/app/pages/akuntansi/pengesahan-pelaporan/sp2b-main/sp2b-main.component';


const routes: Routes = [
  {
    path:'sp3b',
    component: Sp3bMainComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SP3B'}
  },
  {
    path:'sp2b',
    component: Sp2bMainComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SP2B'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PengesahanPelaporanRoutingModule { }
