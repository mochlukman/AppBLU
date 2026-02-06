import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { Sp2dGuComponent } from './sp2d-gu/sp2d-gu.component';
import { Sp2dLsNonpegawaiComponent } from './sp2d-ls-nonpegawai/sp2d-ls-nonpegawai.component';
import { Sp2dLsPegawaiComponent } from './sp2d-ls-pegawai/sp2d-ls-pegawai.component';
import { Sp2dLsUangmukaComponent } from './sp2d-ls-uangmuka/sp2d-ls-uangmuka.component';
import { Sp2dPembiayaanComponent } from './sp2d-pembiayaan/sp2d-pembiayaan.component';
import { Sp2dTuComponent } from './sp2d-tu/sp2d-tu.component';
import { Sp2dUpComponent } from './sp2d-up/sp2d-up.component';


const routes: Routes = [
  {
    path:'spd-up',
    component: Sp2dUpComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SPD - UP'}
  },
  {
    path:'spd-tu',
    component: Sp2dTuComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SPD - TU'}
  },
  {
    path:'spd-gu',
    component: Sp2dGuComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SPD - GU'}
  },
  {
    path:'spd-ls-uang-muka',
    component: Sp2dLsUangmukaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SPD - LS Uang Muka'}
  },
  {
    path:'spd-ls-pegawai',
    component: Sp2dLsPegawaiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SPD - Belanja LS Gaji dan Tunjangan'}
  },
  {
    path:'spd-ls-non-pegawai',
    component: Sp2dLsNonpegawaiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SPD - Belanja LS Barang dan Jasa'}
  },
  {
    path:'spd-ls-pembiayaan',
    component: Sp2dPembiayaanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SPD - LS Pembiayaan'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Sp2dRoutingModule { }
