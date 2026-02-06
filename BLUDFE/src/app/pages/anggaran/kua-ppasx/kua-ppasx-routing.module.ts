import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { KinerjaxComponent } from './kinerjax/kinerjax.component';
import { ProgUnitxComponent } from './program-kegiatan-unitx/prog-unitx/prog-unitx.component';


const routes: Routes = [
  {
    path:'program-dan-kegiatan',
    component: ProgUnitxComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'KUA - PPAS Perubahan'}
  },
  {
    path:'kinerja-kegiatan',
    component: KinerjaxComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'KUA PPAS - Kinerja Kegiatan Perubahan'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KuaPpasxRoutingModule { }
