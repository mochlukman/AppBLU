import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { SppGuComponent } from './spp-gu/spp-gu.component';
import { SppLsNonpegawaiComponent } from './spp-ls-nonpegawai/spp-ls-nonpegawai.component';
import { SppLsPegawaiComponent } from './spp-ls-pegawai/spp-ls-pegawai.component';
import { SppLsUangmukaComponent } from './spp-ls-uangmuka/spp-ls-uangmuka.component';
import { SppPembiayaanComponent } from './spp-pembiayaan/spp-pembiayaan.component';
import { SppPengajuanTuComponent } from './spp-pengajuan-tu/spp-pengajuan-tu.component';
import { SppTuComponent } from './spp-tu/spp-tu.component';
import { SppUpComponent } from './spp-up/spp-up.component';


const routes: Routes = [
  {
    path: 's-ppd-up',
    component: SppUpComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Bendahara Pengeluaran  >  S-PPD  >  S-PPD - UP'}
  },
  {
    path: 's-ppd-gu',
    component: SppGuComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-PPD - GU'}
  },
  {
    path: 's-ppd-ls-uang-muka',
    component: SppLsUangmukaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-PPD - LS Uang Muka'}
  },
  {
    path: 's-ppd-ls-pegawai',
    component: SppLsPegawaiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-PPD - LS Gaji dan Tunjangan'}
  },
  {
    path: 's-ppd-ls-non-pegawai',
    component: SppLsNonpegawaiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-PPD - LS Barang dan Jasa'}
  },
  {
    path: 's-ppd-pembiayaan',
    component: SppPembiayaanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-PPD - Pembiayaan'}
  },
  {
    path: 'pengajuan-tu',
    component: SppPengajuanTuComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-PPD - Pengajuan TU'}
  },
  {
    path: 's-ppd-tu',
    component: SppTuComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'S-PPD - TU'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SppRoutingModule { }
