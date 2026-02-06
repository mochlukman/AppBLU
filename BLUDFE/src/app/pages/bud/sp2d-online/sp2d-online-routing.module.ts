import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { DaftarPengujiComponent } from './daftar-penguji/daftar-penguji.component';
import { PengirimanDaftarPengujiComponent } from './pengiriman-daftar-penguji/pengiriman-daftar-penguji.component';
import { Sp2dNtpnComponent } from './sp2d-ntpn/sp2d-ntpn.component';


const routes: Routes = [
  {
    path:'daftar-penguji',
    component: DaftarPengujiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Daftar Penguji'}
  },
  {
    path:'pengiriman-daftar-penguji',
    component: PengirimanDaftarPengujiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pengiriman Daftar Penguji'}
  },
  {
    path:'sp2d-ntpn',
    component: Sp2dNtpnComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SP2D NTPN'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Sp2dOnlineRoutingModule { }
