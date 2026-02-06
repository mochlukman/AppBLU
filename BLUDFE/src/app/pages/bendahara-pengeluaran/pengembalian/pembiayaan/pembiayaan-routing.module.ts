import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { PembiayaanComponent } from './pembiayaan.component';


const routes: Routes = [
  {
    path: '',
    component: PembiayaanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pengembalian Pembiayaan'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PembiayaanRoutingModule { }
