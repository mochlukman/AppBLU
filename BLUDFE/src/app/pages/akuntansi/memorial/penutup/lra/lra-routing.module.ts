import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { LraComponent } from './lra.component';


const routes: Routes = [
  {
    path:'',
    component: LraComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Jurnal Penutup LRA'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LraRoutingModule { }
