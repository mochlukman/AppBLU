import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { JabttdComponent } from './jabttd/jabttd.component';
import { JadwalTukdComponent } from './jadwal-tukd/jadwal-tukd.component';
import { KebijakanSpdComponent } from './kebijakan-spd/kebijakan-spd.component';
import { KelolaPenggunaComponent } from './kelola-pengguna/kelola-pengguna.component';
import { PenggunaComponent } from './pengguna/pengguna.component';
import { RekbendComponent } from './rekbend/rekbend.component';
import { RekkasdaComponent } from './rekkasda/rekkasda.component';
import { SkupComponent } from './skup/skup.component';


const routes: Routes = [
  {
    path: 'pengguna',
    component: PenggunaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pengaturan - Daftar Pengguna'}
  },
  {
    path: 'kebijakanspd',
    component: KebijakanSpdComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Kebijakan SPD'}
  },
  {
    path: 'kelolapengguna',
    component: KelolaPenggunaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pengaturan - Pengelolaan Pengguna'}
  },
  {
    path: 'jadwaltukd',
    component: JadwalTukdComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pengaturan - Jadwal Penatausahaan'}
  },
  {
    path: 'skup',
    component: SkupComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pengaturan - SK UP'}
  },
  {
    path: 'rekkasda',
    component: RekkasdaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pengaturan - Rekening Kas BLUD'}
  },
  {
    path: 'rekbend',
    component: RekbendComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pengaturan - Rekening Bendahara'}
  },
  {
    path: 'jabttd',
    component: JabttdComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pengaturan - Penadatangan Dokumen'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PengaturanRoutingModule { }
