import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'penetapan-pendapatan',
    loadChildren: () => import('./penetapan-pendapatan/penetapan-pendapatan.module').then(m => m.PenetapanPendapatanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'penerimaan',
    loadChildren: () => import('./penerimaan/penerimaan.module').then(m => m.PenerimaanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'penyetoran',
    loadChildren: () => import('./penyetoran/penyetoran.module').then(m => m.PenyetoranModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bku-skpd',
    loadChildren: () => import('./bku-penerimaan/bku-penerimaan.module').then(m => m.BkuPenerimaanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'spj-penerimaan',
    loadChildren: () => import('./spj-penerimaan/spj-penerimaan.module').then(m => m.SPjPenerimaanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pengembalian',
    loadChildren: () => import('./pengembalian/pengembalian.module').then(m => m.PengembalianModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BendaharaPenerimaanRoutingModule { }
