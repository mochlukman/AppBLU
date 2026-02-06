import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { AdendumComponent } from './adendum/adendum.component';
import { KontrakComponent } from './kontrak/kontrak.component';
import { RekananComponent } from './rekanan/rekanan.component';
import { TagihanComponent } from './tagihan/tagihan.component';


const routes: Routes = [
  {
    path: 'rekanan',
    component: RekananComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Manajemen Proyek - Rekanan'}
  },
  {
    path: 'kontrak',
    component: KontrakComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Manajemen Proyek - Kontrak'}
  },
  {
    path: 'adendum',
    component: AdendumComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Manajemen Proyek - Adendum'}
  },
  {
    path: 'tagihan',
    component: TagihanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Manajemen Proyek - Tagihan'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManajemenProyekRoutingModule { }
