import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { PergeseranComponent } from './pergeseran/pergeseran.component';


const routes: Routes = [
  {
    path: 'pergeseran',
    component: PergeseranComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pergeseran Uang'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PergeseranRoutingModule { }
