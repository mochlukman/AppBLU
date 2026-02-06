import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { AsbComponent } from './asb/asb.component';
import { HspkComponent } from './hspk/hspk.component';
import { SbuComponent } from './sbu/sbu.component';
import { SshComponent } from './ssh/ssh.component';


const routes: Routes = [
  {
    path: 'ssh',
    component: SshComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Standar Satuan Harga'}
  },
  {
    path: 'hspk',
    component: HspkComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Harga Satuan Pokok Kegiatan'}
  },
  {
    path: 'asb',
    component: AsbComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Analisis Standar Belanja'}
  },
  {
    path: 'sbu',
    component: SbuComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Standar Biaya Umum'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandarSatuanHargaRoutingModule { }
