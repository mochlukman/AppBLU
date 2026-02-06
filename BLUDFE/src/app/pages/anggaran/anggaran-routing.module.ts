import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { BelanjaComponent } from './apbd/belanja/belanja.component';
import { PembiayaanComponent } from './apbd/pembiayaan/pembiayaan.component';
import { PendapatanComponent } from './apbd/pendapatan/pendapatan.component';
import { BelanjaxComponent } from './apbdx/belanjax/belanjax.component';
import { PembiayaanxComponent } from './apbdx/pembiayaanx/pembiayaanx.component';
import { PendapatanxComponent } from './apbdx/pendapatanx/pendapatanx.component';
import { TransferApbdComponent } from './transfer-apbd/transfer-apbd.component';
import {TransferApbdxPergeseranComponent} from 'src/app/pages/anggaran/apbdx/transfer-apbdx-pergeseran/transfer-apbdx-pergeseran.component';


const routes: Routes = [
  {
    path: 'kua-ppas',
    loadChildren: () => import('./kua-ppas/kua-ppas.module').then(m => m.KuaPpasModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'kua-ppas-perubahan',
    loadChildren: () => import('./kua-ppasx/kua-ppasx.module').then(m => m.KuaPpasxModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'apbd',
    children: [
      {
        path:'pendapatan',
        component: PendapatanComponent,
        canActivate: [CanActiveGuardService],
        data: {setTitle: 'APBD Pendapatan'}
      },
      {
        path:'belanja',
        component: BelanjaComponent,
        canActivate: [CanActiveGuardService],
        data: {setTitle: 'APBD Belanja'}
      },
      {
        path:'pembiayaan',
        component: PembiayaanComponent,
        canActivate: [CanActiveGuardService],
        data: {setTitle: 'APBD Pembiayaan'}
      },
      {
        path:'verifikasi-data-apbd',
        loadChildren: () => import('./apbd/verifikasi-apbd/verifikasi-apbd.module').then(m => m.VerifikasiApbdModule),
        canActivate: [AuthGuard]
      },
      {
        path:'transfer-data-ke-perubahan',
        component: TransferApbdComponent,
        canActivate: [CanActiveGuardService],
        data: {setTitle: 'Trasnfer Data APBD Murni Ke Perubahan'}
      },
    ]
  },
  {
    path: 'apbd-perubahan',
    children: [
      {
        path:'pendapatan',
        component: PendapatanxComponent,
        canActivate: [CanActiveGuardService],
        data: {setTitle: 'APBD Pendapatan Perubahan'}
      },
      {
        path:'belanja',
        component: BelanjaxComponent,
        canActivate: [CanActiveGuardService],
        data: {setTitle: 'APBD Belanja Perubahan'}
      },
      {
        path:'pembiayaan',
        component: PembiayaanxComponent,
        canActivate: [CanActiveGuardService],
        data: {setTitle: 'APBD Pembiayaan Perubahan'}
      },
      {
        path:'verifikasi-data-apbd-perubahan',
        loadChildren: () => import('./apbdx/verifikasi-apbdx/verifikasi-apbdx.module').then(m => m.VerifikasiApbdxModule),
        canActivate: [AuthGuard]
      },
      {
        path:'transfer-data-pergeseran',
        component: TransferApbdxPergeseranComponent,
        canActivate: [CanActiveGuardService],
        data: {setTitle: 'Transfer Data RBA Murni Ke Pergeseran'}
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnggaranRoutingModule { }
