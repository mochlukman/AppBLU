import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { BelanjaComponent } from './belanja/belanja.component';
import { PembiayaanComponent } from './pembiayaan/pembiayaan.component';
import { PendapatanComponent } from './pendapatan/pendapatan.component';
import { SkDpaComponent } from './sk-dpa/sk-dpa.component';


const routes: Routes = [
  {
    path:'sk-dba-perubahan',
    component: SkDpaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SK - DBA Perubahan'}
  },
  {
    path:'pendapatan',
    component: PendapatanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'DBA Perubahan - Pendapatan'}
  },
  {
    path:'belanja',
    component: BelanjaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'DBA Perubahan - Belanja'}
  },
  {
    path:'pembiayaan',
    component: PembiayaanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'DBA Perubahan - Pembiayaan'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DpaPerubahanRoutingModule { }
