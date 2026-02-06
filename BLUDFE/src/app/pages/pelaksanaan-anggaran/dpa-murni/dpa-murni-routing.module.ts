import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { BelanjaComponent } from './belanja/belanja.component';
import { PembiayaanComponent } from './pembiayaan/pembiayaan.component';
import { PendapatanComponent } from './pendapatan/pendapatan.component';
import { SkDpaComponent } from './sk-dpa/sk-dpa.component';


const routes: Routes = [
  {
    path:'sk-dba',
    component: SkDpaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SK - DBA'}
  },
  {
    path:'pendapatan',
    component: PendapatanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'DBA - Pendapatan'}
  },
  {
    path:'belanja',
    component: BelanjaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'DBA - Belanja'}
  },
  {
    path:'pembiayaan',
    component: PembiayaanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'DBA - Pembiayaan'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DpaMurniRoutingModule { }
