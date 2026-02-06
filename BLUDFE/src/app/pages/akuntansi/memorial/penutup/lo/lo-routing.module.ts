import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { LoComponent } from './lo.component';


const routes: Routes = [
  {
    path:'',
    component: LoComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Jurnal Penutup LO'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoRoutingModule { }
