import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { PengeluaranComponent } from './pengeluaran.component';


const routes: Routes = [
  {
    path:'',
    component: PengeluaranComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Jurnal Konsolidator Pengeluaran'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PengeluaranRoutingModule { }
