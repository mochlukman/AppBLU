import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { PersetujuanTuComponent } from './persetujuan-tu/persetujuan-tu.component';


const routes: Routes = [
  {
    path:'persetujuan-tu',
    component: PersetujuanTuComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Persetujuan TU'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersetujuanRoutingModule { }
