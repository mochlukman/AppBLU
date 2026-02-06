import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { SpdBelanjaComponent } from './spd/spd-belanja/spd-belanja.component';
import { SpdPembiayaanComponent } from './spd/spd-pembiayaan/spd-pembiayaan.component';


const routes: Routes = [
  {
    path: 'dba',
    loadChildren: () => import('./dpa-murni/dpa-murni.module').then(m => m.DpaMurniModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dba-perubahan',
    loadChildren: () => import('./dpa-perubahan/dpa-perubahan.module').then(m => m.DpaPerubahanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'spd',
    children: [
      {
        path:'belanja',
        component: SpdBelanjaComponent,
        canActivate: [CanActiveGuardService],
        data: {setTitle: 'SPD - Belanja'}
      },
      {
        path:'pembiayaan',
        component: SpdPembiayaanComponent,
        canActivate: [CanActiveGuardService],
        data: {setTitle: 'SPD - Pembiayaan'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PelaksanaanAnggaranRoutingModule { }
