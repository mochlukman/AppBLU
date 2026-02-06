import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { EliminasiComponent } from './eliminasi.component';


const routes: Routes = [
  {
    path:'',
    component: EliminasiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Eliminasi'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EliminasiRoutingModule { }
