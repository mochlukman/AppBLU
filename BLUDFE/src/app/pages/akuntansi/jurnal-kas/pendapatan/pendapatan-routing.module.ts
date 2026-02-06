import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { JurnalKasMainComponent } from './jurnal-kas-main/jurnal-kas-main.component';


const routes: Routes = [
  {
    path:'',
    component: JurnalKasMainComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Jurnal Pendapatan'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendapatanRoutingModule { }
