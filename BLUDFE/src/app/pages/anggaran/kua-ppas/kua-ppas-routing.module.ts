import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { KinerjaComponent } from './kinerja/kinerja.component';
import { ProgUnitComponent } from './program-kegiatan-unit/prog-unit/prog-unit.component';


const routes: Routes = [
  {
    path:'program-dan-kegiatan',
    component: ProgUnitComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'KUA - PPAS'}
  },
  {
    path:'kinerja-kegiatan',
    component: KinerjaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'KUA PPAS - Kinerja Kegiatan'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KuaPpasRoutingModule { }
