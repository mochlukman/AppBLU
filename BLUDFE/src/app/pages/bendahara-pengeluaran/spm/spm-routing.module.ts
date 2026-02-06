import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { SpmGuComponent } from './spm-gu/spm-gu.component';
import { SpmLsNonpegawaiComponent } from './spm-ls-nonpegawai/spm-ls-nonpegawai.component';
import { SpmLsPegawaiComponent } from './spm-ls-pegawai/spm-ls-pegawai.component';
import { SpmLsUangmukaComponent } from './spm-ls-uangmuka/spm-ls-uangmuka.component';
import { SpmPembiayaanComponent } from './spm-pembiayaan/spm-pembiayaan.component';
import { SpmTuComponent } from './spm-tu/spm-tu.component';
import { SpmUpComponent } from './spm-up/spm-up.component';


const routes: Routes = [
  {
    path: 's-opd-up',
    component: SpmUpComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-OPD - UP'}
  },
  {
    path: 's-opd-gu',
    component: SpmGuComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-OPD - GU'}
  },
  {
    path: 's-opd-tu',
    component: SpmTuComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-OPD - TU'}
  },
  {
    path: 's-opd-ls-uang-muka',
    component: SpmLsUangmukaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-OPD - LS Uang Muka'}
  },
  {
    path: 's-opd-ls-pegawai',
    component: SpmLsPegawaiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-OPD - LS Gaji dan Tunjangan'}
  },
  {
    path: 's-opd-ls-non-pegawai',
    component: SpmLsNonpegawaiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-OPD - LS Barang dan Jasa'}
  },
  {
    path: 's-opd-pembiayaan',
    component: SpmPembiayaanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-OPD - Pembiayaan'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpmRoutingModule { }
