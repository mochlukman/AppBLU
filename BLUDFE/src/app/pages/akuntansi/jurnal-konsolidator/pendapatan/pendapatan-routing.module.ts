import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { PendapatanComponent } from './pendapatan.component';


const routes: Routes = [
  {
    path:'',
    component: PendapatanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Jurnal Konsolidator Pendapatan'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendapatanRoutingModule { }
