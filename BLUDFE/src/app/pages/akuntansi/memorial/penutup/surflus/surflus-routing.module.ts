import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { SurflusComponent } from './surflus.component';


const routes: Routes = [
  {
    path:'',
    component: SurflusComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Jurnal Penutup Surflus Defisit LRA'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurflusRoutingModule { }
