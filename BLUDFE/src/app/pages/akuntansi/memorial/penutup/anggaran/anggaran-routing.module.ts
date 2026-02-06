import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { AnggaranComponent } from './anggaran.component';


const routes: Routes = [
  {
    path:'',
    component: AnggaranComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Jurnal Penutup Anggaran'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnggaranRoutingModule { }
